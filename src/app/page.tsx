'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/dashboard')
    }
  }, [status, session, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Modem Password Manager
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Securely manage usernames and passwords for all your modems in one place. 
            Modern, secure, and easy to use.
          </p>
          
          <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
            <Link
              href="/auth/signin"
              className="block md:inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="block md:inline-block border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              Create Account
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-blue-600 text-3xl mb-4">🔐</div>
            <h3 className="text-xl font-semibold mb-2">Secure Storage</h3>
            <p className="text-gray-600">
              Your passwords are encrypted and stored securely with industry-standard security practices.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-blue-600 text-3xl mb-4">📡</div>
            <h3 className="text-xl font-semibold mb-2">Modem Management</h3>
            <p className="text-gray-600">
              Organize and manage credentials for multiple modems with ease. Add IP addresses, types, and more.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-blue-600 text-3xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2">Modern Interface</h3>
            <p className="text-gray-600">
              Clean, responsive design that works perfectly on desktop and mobile devices.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
