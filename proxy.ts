import { NextRequest, NextResponse } from 'next/server'
import {
  getUserFromSession,
  updateUserSessionExpiration,
} from './app/(auth)/core/session'

const privateRoutes = ['/me']
const adminRoutes = ['/admin']
const authRoutes = ['/signin', '/signup']

export const proxy = async (request: NextRequest) => {
  const response = (await proxyAuth(request)) ?? NextResponse.next()

  await updateUserSessionExpiration({
    get: (key) => request.cookies.get(key),
    set: (key, value, options) =>
      response.cookies.set({ name: key, value, ...options }),
  })

  return response
}

const proxyAuth = async (request: NextRequest) => {
  if (privateRoutes.includes(request.nextUrl.pathname)) {
    const user = await getUserFromSession(request.cookies)
    if (user == null) {
      return NextResponse.redirect(new URL('/signin', request.url))
    }
  }

  if (adminRoutes.includes(request.nextUrl.pathname)) {
    const user = await getUserFromSession(request.cookies)
    if (user == null) {
      return NextResponse.redirect(new URL('/signin', request.url))
    }

    if (user.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  if (authRoutes.includes(request.nextUrl.pathname)) {
    const user = await getUserFromSession(request.cookies)
    if (user != null) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
}
