import { NextResponse } from 'next/server';

const DEFAULT_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxSl07lvaHH1hxxB3NwiHTT5KNbMumGyUh0xgz8yjSXfEvkkjfb73gZiLafseMu2w4A/exec';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const appsScriptUrl = process.env.APPS_SCRIPT_URL || process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || DEFAULT_APPS_SCRIPT_URL;

    const buttonName = body.buttonName || 'Botón WhatsApp';
    const targetNumber = body.targetNumber || '834 209 1016';
    const device = body.device || 'Móvil';
    const page = body.page || '/';
    const message = body.message || '';

    // Estructura compatible tanto con el nuevo script como con el script anterior
    const payload = {
      action: 'TRACK_WHATSAPP',
      buttonName: buttonName,
      producto: `Clic WhatsApp: ${buttonName}`,
      name: 'Prospecto WhatsApp',
      phone: targetNumber,
      telefono: targetNumber,
      medida: device,
      device: device,
      material: page,
      page: page,
      gramaje: 'Web Lead',
      impresion: targetNumber,
      cantidad: 1,
      acabados: message || 'Cotización iniciada',
      message: message,
      precio: 0,
      status: 'Cotización WhatsApp',
      estado: 'Cotización WhatsApp'
    };

    // Enviamos a Google Apps Script con timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    const response = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      cache: 'no-store'
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn('Apps Script respondió con status no OK:', response.status);
    }

    return NextResponse.json({ success: true, buttonName });
  } catch (error: any) {
    console.error('Error registrando clic de WhatsApp en Apps Script:', error.message || error);
    // Respondemos con success para no romper jamás la experiencia del cliente
    return NextResponse.json({ success: false, error: error.message }, { status: 200 });
  }
}
