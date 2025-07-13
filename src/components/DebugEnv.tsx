'use client'

export default function DebugEnv() {
  return (
    <div className="p-4 bg-yellow-100 border border-yellow-300 rounded">
      <h3 className="font-bold">Debug Environment Variables:</h3>
      <p>NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED: {process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED}</p>
      <p>Value type: {typeof process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED}</p>
      <p>Is 'true'?: {String(process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED === 'true')}</p>
    </div>
  )
}
