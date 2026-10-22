/**
 * ============================================================================
 * PUBLIDEAS - SCRIPT DE GOOGLE SHEETS PARA GESTIÓN DE PEDIDOS Y CLICS WHATSAPP
 * ============================================================================
 * Este script se coloca en Google Sheets:
 * Extensiones -> Apps Script -> Pegar este código en Código.gs -> Implementar como Aplicación Web.
 * 
 * Funcionalidades:
 * 1. Registra cada clic de WhatsApp como lead/pedido en la hoja "Pedidos".
 * 2. Mantiene una pestaña automática "Reporte_WhatsApp" con el conteo de clics
 *    por cada botón, fecha del último clic y porcentaje del total.
 * 3. Soporta GET (para alimentar el Dashboard Admin de Next.js) y POST (para crear,
 *    actualizar estados y registrar clics en tiempo real sin errores de rango).
 */

const SHEET_PEDIDOS_NAME = "Pedidos";
const SHEET_REPORTE_NAME = "Reporte_WhatsApp";

const MAIN_HEADERS = [
  "Pedido",
  "Producto",
  "Medida",
  "Material",
  "Gramaje",
  "Impresion",
  "Cantidad",
  "Acabados",
  "Nombre",
  "Telefono",
  "Precio",
  "Fecha",
  "Estado"
];

/**
 * Función auxiliar para obtener o crear una hoja por nombre
 */
function getOrCreateSheet(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name, ss.getNumSheets());
    if (headers && headers.length > 0) {
      sheet.appendRow(headers);
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#0071e3");
      headerRange.setFontColor("#ffffff");
      sheet.setFrozenRows(1);
    }
  }
  return sheet;
}

/**
 * Obtiene la hoja principal de pedidos (asegurando que NO sea la de reportes)
 */
function getMainSheet(ss) {
  let sheet = ss.getSheetByName(SHEET_PEDIDOS_NAME);
  if (!sheet) {
    // Buscamos la hoja que no sea Reporte_WhatsApp
    const allSheets = ss.getSheets();
    for (let i = 0; i < allSheets.length; i++) {
      if (allSheets[i].getName() !== SHEET_REPORTE_NAME) {
        sheet = allSheets[i];
        break;
      }
    }
    // Si aún no hay, la creamos
    if (!sheet) {
      sheet = getOrCreateSheet(ss, SHEET_PEDIDOS_NAME, MAIN_HEADERS);
      return sheet;
    }
  }

  // Si la hoja principal está completamente vacía, agregamos sus encabezados
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(MAIN_HEADERS);
    const headerRange = sheet.getRange(1, 1, 1, MAIN_HEADERS.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#111113");
    headerRange.setFontColor("#ffffff");
    sheet.setFrozenRows(1);
  }

  return sheet;
}

/**
 * Manejador de peticiones GET:
 * Retorna todos los pedidos en formato JSON para el Dashboard de Next.js
 * Si se pasa ?action=stats o ?action=report, retorna las métricas de clics.
 */
function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const action = e && e.parameter ? e.parameter.action : "";

    // Si solicitan el reporte agregado de clics de WhatsApp
    if (action === "stats" || action === "report") {
      const reporteSheet = ss.getSheetByName(SHEET_REPORTE_NAME);
      if (!reporteSheet) {
        return createJsonResponse({ ok: true, stats: [], totalClicks: 0 });
      }
      const data = reporteSheet.getDataRange().getValues();
      if (data.length <= 1) {
        return createJsonResponse({ ok: true, stats: [], totalClicks: 0 });
      }
      const stats = [];
      let totalClicks = 0;
      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const clicks = Number(row[1]) || 0;
        totalClicks += clicks;
        stats.push({
          boton: row[0],
          clics: clicks,
          ultimoClic: row[2],
          telefono: row[3],
          porcentaje: row[4]
        });
      }
      return createJsonResponse({ ok: true, totalClicks, stats });
    }

    // Por defecto: Retorna todos los pedidos de la hoja principal
    const sheet = getMainSheet(ss);
    const data = sheet.getDataRange().getValues();
    if (data.length <= 1) {
      return createJsonResponse([]);
    }

    const headers = data[0];
    const rows = [];

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      // Ignoramos filas completamente vacías
      if (row.every(cell => cell === "" || cell === null)) continue;

      const obj = { _row: i + 1 };
      for (let j = 0; j < headers.length; j++) {
        const key = headers[j] ? headers[j].toString().trim() : ("Col_" + (j + 1));
        obj[key] = row[j];
      }
      rows.push(obj);
    }

    return createJsonResponse(rows);
  } catch (error) {
    return createJsonResponse({ ok: false, error: error.toString() });
  }
}

/**
 * Manejador de peticiones POST:
 * Soporta:
 * - TRACK_WHATSAPP: Registrar un clic en WhatsApp y actualizar el reporte.
 * - CREATE: Crear un nuevo pedido (y también registra si es clic).
 * - STATUS: Actualizar el estado de un pedido (por rowId).
 * - UPDATE: Actualizar una fila completa.
 */
function doPost(e) {
  try {
    let payload = {};
    if (e && e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (err) {
        payload = e.parameter || {};
      }
    } else if (e && e.parameter) {
      payload = e.parameter;
    }

    const action = (payload.action || "").toUpperCase();
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // 1. ACTUALIZAR ESTADO RÁPIDO
    if (action === "STATUS") {
      return handleStatusUpdate(ss, payload);
    }

    // 2. ACTUALIZAR PEDIDO COMPLETO
    if (action === "UPDATE") {
      return handleOrderUpdate(ss, payload);
    }

    // 3. REGISTRAR CLIC DE WHATSAPP O NUEVO PEDIDO
    if (action === "TRACK_WHATSAPP" || action === "CREATE" || !action) {
      return handleCreateOrTrack(ss, payload);
    }

    return createJsonResponse({ ok: false, error: "Acción no reconocida: " + action });
  } catch (error) {
    return createJsonResponse({ ok: false, error: error.toString() });
  }
}

/**
 * Registra un clic o pedido y actualiza el reporte de clics
 */
function handleCreateOrTrack(ss, payload) {
  const sheet = getMainSheet(ss);
  const now = new Date();
  const fechaStr = Utilities.formatDate(now, "America/Mexico_City", "yyyy-MM-dd HH:mm:ss");

  // Generamos un identificador único amigable
  const idSuffix = Utilities.formatDate(now, "America/Mexico_City", "dd-MM-yyyy-HH-mm-ss");
  const isWhatsAppClick = payload.action === "TRACK_WHATSAPP" || 
                          (payload.producto && payload.producto.toString().toLowerCase().includes("whatsapp")) ||
                          (payload.buttonName !== undefined);

  const prefix = isWhatsAppClick ? "WA" : "PED";
  const pedidoId = payload.pedido || payload.orderNumber || `${prefix}-${idSuffix}`;

  const buttonName = payload.buttonName || payload.boton || (isWhatsAppClick ? "Botón WhatsApp" : "Web");
  const productoDesc = payload.producto || (isWhatsAppClick ? `Clic WhatsApp: ${buttonName}` : "Pedido Web");
  const nombre = payload.name || payload.nombre || (isWhatsAppClick ? "Prospecto WhatsApp" : "Cliente Web");
  const telefono = payload.phone || payload.telefono || payload.targetNumber || "834 209 1016";
  const medida = payload.medida || payload.device || "Móvil";
  const material = payload.material || payload.page || "/";
  const gramaje = payload.gramaje || payload.browser || "-";
  const impresion = payload.impresion || payload.targetNumber || telefono;
  const cantidad = payload.cantidad !== undefined ? payload.cantidad : 1;
  const acabados = payload.acabados || payload.message || "-";
  const precio = payload.precio !== undefined ? payload.precio : (isWhatsAppClick ? 0 : "-");
  const estado = payload.status || payload.estado || (isWhatsAppClick ? "Cotización WhatsApp" : "Pendiente");

  // Añadimos la fila a la hoja principal de manera segura con appendRow (evita errores de columna)
  sheet.appendRow([
    pedidoId,
    productoDesc,
    medida,
    material,
    gramaje,
    impresion,
    cantidad,
    acabados,
    nombre,
    telefono,
    precio,
    fechaStr,
    estado
  ]);

  const newRow = sheet.getLastRow();

  // Si es un clic de WhatsApp, actualizamos la pestaña de reporte agregado
  if (isWhatsAppClick || payload.buttonName) {
    updateWhatsAppReport(ss, buttonName, telefono, fechaStr);
  }

  return createJsonResponse({
    ok: true,
    msg: "Registrado con éxito",
    row: newRow,
    pedido: pedidoId,
    boton: buttonName
  });
}

/**
 * Actualiza la hoja "Reporte_WhatsApp" con el contador por cada botón
 */
function updateWhatsAppReport(ss, buttonName, targetPhone, fechaStr) {
  try {
    const headers = [
      "Botón de WhatsApp",
      "Total Clics",
      "Último Clic (Fecha y Hora)",
      "Número Destino",
      "% del Total"
    ];
    const reporteSheet = getOrCreateSheet(ss, SHEET_REPORTE_NAME, headers);
    const data = reporteSheet.getDataRange().getValues();

    let rowIndex = -1;
    // Buscamos si ya existe el botón en la lista
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] && data[i][0].toString().trim().toLowerCase() === buttonName.trim().toLowerCase()) {
        rowIndex = i + 1; // 1-indexed
        break;
      }
    }

    if (rowIndex > 0) {
      // Incrementar contador existente
      const currentClicks = Number(reporteSheet.getRange(rowIndex, 2).getValue()) || 0;
      reporteSheet.getRange(rowIndex, 2).setValue(currentClicks + 1);
      reporteSheet.getRange(rowIndex, 3).setValue(fechaStr);
      if (targetPhone) {
        reporteSheet.getRange(rowIndex, 4).setValue(targetPhone);
      }
    } else {
      // Agregar nuevo botón
      reporteSheet.appendRow([
        buttonName,
        1,
        fechaStr,
        targetPhone || "834 209 1016",
        "=B" + (reporteSheet.getLastRow() + 1) + "/SUM(B$2:B$100)"
      ]);
      const lastRow = reporteSheet.getLastRow();
      reporteSheet.getRange(lastRow, 5).setNumberFormat("0.0%");
    }

    // Actualizar formato de porcentajes en toda la columna 5
    const totalRows = reporteSheet.getLastRow();
    if (totalRows >= 2) {
      for (let r = 2; r <= totalRows; r++) {
        reporteSheet.getRange(r, 5).setFormula("=B" + r + "/SUM(B$2:B$" + totalRows + ")");
        reporteSheet.getRange(r, 5).setNumberFormat("0.0%");
      }
    }
  } catch (err) {
    Logger.log("Error actualizando reporte WhatsApp: " + err.toString());
  }
}

/**
 * Actualiza el estado de un pedido dado el rowId
 */
function handleStatusUpdate(ss, payload) {
  const sheet = getMainSheet(ss);
  const row = Number(payload.row || payload.rowId);
  const newStatus = payload.estado || payload.status || "Pendiente";

  if (!row || row <= 1 || row > sheet.getLastRow()) {
    return createJsonResponse({ ok: false, error: "Número de fila inválido: " + row });
  }

  // Buscamos cuál columna es "Estado" o "Pendiente"
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  let statusCol = 13; // Por defecto columna 13
  for (let c = 0; c < headers.length; c++) {
    const h = (headers[c] || "").toString().toLowerCase();
    if (h.includes("estado") || h.includes("pendiente") || h.includes("status")) {
      statusCol = c + 1;
      break;
    }
  }

  sheet.getRange(row, statusCol).setValue(newStatus);
  return createJsonResponse({ ok: true, msg: "Estado actualizado", row: row, status: newStatus });
}

/**
 * Actualiza una fila de pedido completa
 */
function handleOrderUpdate(ss, payload) {
  const sheet = getMainSheet(ss);
  const row = Number(payload.rowId || payload.row);

  if (!row || row <= 1 || row > sheet.getLastRow()) {
    return createJsonResponse({ ok: false, error: "Número de fila inválido para actualizar: " + row });
  }

  // Actualizamos los campos recibidos
  if (payload.name !== undefined) sheet.getRange(row, 9).setValue(payload.name);
  if (payload.phone !== undefined) sheet.getRange(row, 10).setValue(payload.phone);
  if (payload.producto !== undefined) sheet.getRange(row, 2).setValue(payload.producto);
  if (payload.medida !== undefined) sheet.getRange(row, 3).setValue(payload.medida);
  if (payload.material !== undefined) sheet.getRange(row, 4).setValue(payload.material);
  if (payload.gramaje !== undefined) sheet.getRange(row, 5).setValue(payload.gramaje);
  if (payload.impresion !== undefined) sheet.getRange(row, 6).setValue(payload.impresion);
  if (payload.cantidad !== undefined) sheet.getRange(row, 7).setValue(payload.cantidad);
  if (payload.acabados !== undefined) sheet.getRange(row, 8).setValue(payload.acabados);
  if (payload.precio !== undefined) sheet.getRange(row, 11).setValue(payload.precio);
  if (payload.status !== undefined) sheet.getRange(row, 13).setValue(payload.status);

  return createJsonResponse({ ok: true, msg: "Pedido actualizado exitosamente", row: row });
}

/**
 * Función auxiliar para retornar salidas JSON correctas en Google Apps Script
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
