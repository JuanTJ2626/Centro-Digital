/**
 * Utilidad para registrar clics en los botones de WhatsApp hacia Google Sheets
 * sin bloquear ni demorar la apertura de WhatsApp en el dispositivo del usuario.
 */

export interface TrackWhatsAppOptions {
  buttonName: string;
  targetNumber?: string;
  message?: string;
}

export function trackWhatsAppClick({
  buttonName,
  targetNumber = '834 209 1016',
  message = ''
}: TrackWhatsAppOptions) {
  if (typeof window === 'undefined') return;

  const isMobile = window.innerWidth < 768;
  const payload = {
    buttonName,
    targetNumber,
    message,
    device: isMobile ? 'Móvil' : 'Desktop',
    page: window.location.pathname || '/',
    timestamp: new Date().toISOString()
  };

  // 1. Prioridad: navigator.sendBeacon (Diseñado por los navegadores para telemetría y clics sin delay)
  try {
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      const sent = navigator.sendBeacon('/api/track-whatsapp', blob);
      if (sent) return;
    }
  } catch {
    // En caso de que sendBeacon falle o no esté soportado, pasa al fetch
  }

  // 2. Fallback: fetch con keepalive para asegurar que la petición se envíe incluso si la pestaña cambia
  try {
    fetch('/api/track-whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    }).catch(() => {});
  } catch {
    // Silencioso para asegurar que la redirección a WhatsApp nunca se interrumpa
  }
}
