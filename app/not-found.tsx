import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col items-center justify-center py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center">
          <div className="space-y-2 mb-8">
            <h1 className="text-6xl font-bold tracking-tighter text-primary">404</h1>
            <h2 className="text-3xl font-bold tracking-tighter">Page Not Found</h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          <div className="flex flex-col gap-4 min-[400px]:flex-row">
            <Button asChild size="lg">
              <Link href="/">Return Home</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
          <div className="mt-12">
            <img
              src="/placeholder.svg?height=300&width=500&text=404"
              alt="404 Illustration"
              width={500}
              height={300}
              className="rounded-lg object-cover mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

