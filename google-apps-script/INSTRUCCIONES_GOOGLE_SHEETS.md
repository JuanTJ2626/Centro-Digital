# 📊 Instrucciones para Configurar Google Apps Script en Google Sheets

Este script permite guardar automáticamente cada clic que los clientes hacen en cualquier botón de WhatsApp de la página web dentro de tu Google Sheets (Excel en la nube), generando un reporte en vivo de:
- Cuántos clics dan en total.
- A qué botón específico dieron clic (Hero, Botón Flotante, Catálogo, Contacto, Footer, etc.).
- Desde qué dispositivo (Móvil vs Escritorio).
- A qué número de WhatsApp se dirigieron (834 209 1016 o 55 6808 1606).

---

## 🚀 Pasos para actualizar tu Google Sheets:

### 1. Abre tu hoja de Google Sheets
Abre tu hoja de cálculo habitual donde recibes los pedidos de Publideas.

### 2. Abre el Editor de Apps Script
- En el menú superior de Google Sheets, ve a: **Extensiones** ➜ **Apps Script**.

### 3. Reemplaza el código
- En el archivo `Código.gs` (o el archivo `.gs` que tengas abierto), borra todo el contenido anterior.
- Copia y pega todo el contenido del archivo [`Codigo.js`](./Codigo.js) ubicado en esta carpeta.
- Presiona **Guardar** (icono de disquete o `Ctrl + S`).

### 4. Implementar como Aplicación Web (Web App)
- Arriba a la derecha, haz clic en el botón azul **Implementar** (Deploy) ➜ **Administrar implementaciones** (o **Nueva implementación**).
- Si seleccionas **Nueva implementación**:
  - Tipo: **Aplicación web**.
  - Descripción: `Publideas v2 - Tracking WhatsApp y Pedidos`.
  - Ejecutar como: **Yo** (`tu correo de Google`).
  - Quién tiene acceso: **Cualquiera** (*Anyone*). *(¡Muy importante para que la web pueda enviar datos sin pedir login!)*.
  - Haz clic en **Implementar**.
- Autoriza los permisos si Google te lo solicita (clic en *Avanzado* ➜ *Ir a Publideas (no seguro)* ➜ *Permitir*).

### 5. Copiar la URL
- Google te dará una URL que termina en `/exec`.
- Si la URL cambió respecto a la anterior, colócala en tu archivo `.env.local` en Next.js:
  ```env
  NEXT_PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/TU_NUEVO_ID/exec
  APPS_SCRIPT_URL=https://script.google.com/macros/s/TU_NUEVO_ID/exec
  ```
  *(Por defecto el sistema ya usa la URL configurada en `src/app/api/orders/route.ts`)*.

---

## 📈 ¿Qué verás en tu Google Sheet automáticamente?

1. **En la hoja principal ("Pedidos"):**
   - Cada clic se registra como una fila con ID `WA-DD-MM-YYYY-...`
   - Producto: `Clic WhatsApp: [Nombre del Botón]`
   - Medida: `Móvil` o `Desktop`
   - Estado: `Cotización WhatsApp`
   - Fecha y hora exacta en zona horaria de México.

2. **En la nueva pestaña automática ("Reporte_WhatsApp"):**
   - El script creará automáticamente una pestaña con un cuadro resumen:
     | Botón de WhatsApp | Total Clics | Último Clic (Fecha y Hora) | Número Destino | % del Total |
     | :--- | :--- | :--- | :--- | :--- |
     | Hero: Cotizar Rápido | 42 | 2026-10-21 18:30:15 | 834 209 1016 | 45.0% |
     | Botón Flotante | 28 | 2026-10-21 18:28:40 | 834 209 1016 | 30.0% |
     | Contacto: WhatsApp Local | 14 | 2026-10-21 17:15:22 | 55 6808 1606 | 15.0% |
     | Catálogo: Consultar Asesor | 9 | 2026-10-21 16:40:10 | 834 209 1016 | 10.0% |

¡Todo en tiempo real y sin necesidad de fórmulas manuales!
