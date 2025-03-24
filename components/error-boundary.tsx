"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <p className="mt-4 text-muted-foreground">We apologize for the inconvenience. Please try again later.</p>
      <Button onClick={reset} className="mt-6">
        Try again
      </Button>
    </div>
  )
}

