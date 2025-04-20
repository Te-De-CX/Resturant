// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Page not found</p>
        <Link 
          href="/" 
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}