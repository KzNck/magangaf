import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createSupabaseProxyClient } from './lib/supabase-proxy'

export async function proxy(request: NextRequest) {
  const { supabase, supabaseResponse } = createSupabaseProxyClient(request)

  // Refresh session — ini PENTING untuk menjaga session tetap aktif
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Jika mengakses /admin/* (kecuali /admin/login) tanpa session → redirect ke login
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (!user) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('redirectTo', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Jika sudah login dan mengakses /admin/login → redirect ke dashboard
  if (pathname === '/admin/login' && user) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/admin/:path*'],
}
