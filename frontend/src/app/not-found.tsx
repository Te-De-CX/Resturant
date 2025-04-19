'use client'

import dynamic from 'next/dynamic'

const ErrorComponent = dynamic(
  () => import('./error/ErrorComponent'), // Adjust the path to your Error component
  { ssr: false }
)

export default function NotFound() {
  return <ErrorComponent />
}