'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AuthDebug() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [...prev, `${timestamp}: ${message}`])
  }

  useEffect(() => {
    addLog(`Session status changed: ${status}`)
    if (session) {
      addLog(`Session data: ${JSON.stringify(session, null, 2)}`)
    }
  }, [session, status])

  const testDashboardAccess = async () => {
    try {
      const response = await fetch('/api/modems')
      addLog(`Dashboard API test: ${response.status} ${response.statusText}`)
      if (response.ok) {
        addLog('Dashboard API accessible - should be able to access dashboard')
      } else {
        addLog('Dashboard API not accessible - check authentication')
      }
    } catch (error) {
      addLog(`Dashboard API error: ${error}`)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Authentication Debug</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Session Status</h2>
          <p><strong>Status:</strong> {status}</p>
          <p><strong>Authenticated:</strong> {session ? 'Yes' : 'No'}</p>
          {session && (
            <div className="mt-2">
              <p><strong>User ID:</strong> {(session.user as { id?: string })?.id || "N/A"}</p>
              <p><strong>Email:</strong> {session.user?.email}</p>
              <p><strong>Name:</strong> {session.user?.name}</p>
              <p><strong>Image:</strong> {session.user?.image || "N/A"}</p>
            </div>
          )}
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Actions</h2>
          <div className="space-y-2">
            <button
              onClick={() => router.push('/dashboard')}
              className="block w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Go to Dashboard
            </button>
            <button
              onClick={testDashboardAccess}
              className="block w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Test Dashboard API
            </button>
            <button
              onClick={() => {
                setLogs([])
                addLog('Logs cleared')
              }}
              className="block w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Clear Logs
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
        <h2 className="text-lg font-semibold mb-2 text-white">Debug Logs</h2>
        <div className="max-h-64 overflow-y-auto">
          {logs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>
      </div>

      <div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Troubleshooting Guide</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>If status is &apos;loading&apos; for too long: Check environment variables</li>
          <li>If status is &apos;unauthenticated&apos; after Google login: Check callback URL in Google Console</li>
          <li>If authenticated but can&apos;t access dashboard: Check middleware configuration</li>
          <li>If API test fails: Check API route protection</li>
        </ul>
      </div>
    </div>
  )
}
