import { NextResponse } from 'next/server';

interface Recipient {
  phone: string;
  name?: string;
}

interface BroadcastPayload {
  apiUrl?: string;
  apiKey?: string;
  message?: string;
  recipients?: Recipient[];
}

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, '');
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as BroadcastPayload;
    const apiUrl = payload.apiUrl || process.env.WHATSAPP_API_URL || '';
    const apiKey = payload.apiKey || process.env.WHATSAPP_API_KEY || '';
    const message = (payload.message || '').trim();
    const recipients = Array.isArray(payload.recipients) ? payload.recipients : [];

    if (!apiUrl) {
      return NextResponse.json({ error: 'Falta WHATSAPP_API_URL o apiUrl' }, { status: 400 });
    }

    if (!message) {
      return NextResponse.json({ error: 'El mensaje es obligatorio' }, { status: 400 });
    }

    if (recipients.length === 0) {
      return NextResponse.json({ error: 'Debes agregar al menos un destinatario' }, { status: 400 });
    }

    const attempts = recipients.map(async (recipient) => {
      const phone = normalizePhone(recipient.phone || '');
      if (!phone) {
        return { ok: false, phone: recipient.phone, error: 'Número inválido' };
      }

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
          },
          body: JSON.stringify({
            to: phone,
            phone,
            recipient,
            message,
          }),
        });

        if (!response.ok) {
          const text = await response.text().catch(() => '');
          return { ok: false, phone, error: text || `HTTP ${response.status}` };
        }

        return { ok: true, phone };
      } catch (error: any) {
        return { ok: false, phone, error: error?.message || 'Error desconocido' };
      }
    });

    const results = await Promise.all(attempts);
    const sent = results.filter((item) => item.ok).length;
    const failed = results.length - sent;

    return NextResponse.json({
      success: failed === 0,
      sent,
      failed,
      results,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error procesando broadcast' }, { status: 500 });
  }
}
