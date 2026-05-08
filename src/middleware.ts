import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Solo protegemos las rutas que empiezan con /admin o /api/orders
  // Pero permitimos el acceso a /admin/login
  const isProtectedRoute = (path.startsWith('/admin') && path !== '/admin/login') || path.startsWith('/api/orders');

  if (isProtectedRoute) {
    const session = request.cookies.get('admin_session')?.value;

    if (!session || session !== 'true') {
      // Si no hay sesión, redirigimos al login si es una página
      if (path.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
      // Si es una API, devolvemos un error de no autorizado
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

// Configuramos en qué rutas se debe ejecutar el middleware
export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
