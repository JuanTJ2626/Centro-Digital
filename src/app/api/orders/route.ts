import { NextResponse } from 'next/server';

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyaoKezbC1bxMz6K5kAhygzBS7aKk9JNYA2QGn2bsS9Bqt2tfoYZAY0diS4EDJAuwlZ/exec';

export async function GET() {
  try {
    const response = await fetch(APPS_SCRIPT_URL, { cache: 'no-store' });
    const data = await response.json();

    if (!Array.isArray(data)) {
        return NextResponse.json({ error: 'Formato de datos inválido desde Apps Script' }, { status: 500 });
    }

    // Mapeamos los datos del Apps Script al formato de nuestro Dashboard
    const orders = data.map((item: any) => ({
      id: item._row,
      orderNumber: item.Pedido || `ID-${item._row}`,
      timestamp: item.Fecha ? new Date(item.Fecha).toLocaleString('es-MX') : (item.Pedido || 'Sin fecha'),
      name: item.Nombre || 'Cliente Anónimo',
      phone: item.Telefono || 'N/A',
      details: `${item.Producto || 'Sin producto'} | ${item.Cantidad || 0} pzs | ${item.Material || '-'}`,
      status: item.Estado || 'Pendiente',
      producto: item.Producto || 'N/A',
      medida: item.Medida || 'N/A',
      material: item.Material || 'N/A',
      gramaje: item.Gramaje || 'N/A',
      impresion: item.Impresion || 'N/A',
      cantidad: item.Cantidad || '0',
      acabados: item.Acabados || 'N/A',
      raw: item // Guardamos todo por si acaso
    }));

    return NextResponse.json(orders);
  } catch (error: any) {
    console.error('Error fetching orders from Apps Script:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    // Si viene 'action', enviamos todo el payload al Apps Script
    // Si no viene 'action' pero sí 'status', mantenemos compatibilidad con el cambio de estado rápido
    const finalPayload = payload.action ? payload : {
        row: payload.rowId,
        estado: payload.status,
        action: 'STATUS'
    };

    const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalPayload),
    });

    if (!response.ok) {
      throw new Error('Fallo al procesar en Google Sheets');
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
