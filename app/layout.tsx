import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Menu, Phone, User } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Analytics } from "@vercel/analytics/react"
import { seedAdminUser } from "@/lib/seed-admin"

// Seed admin user on application startup
seedAdminUser().catch(console.error)

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JD Dental Clinic",
  description: "Professional dental care for your entire family",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-16 items-center">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                  JD Dental Clinic
                </Link>
                <nav className="hidden md:flex gap-6 ml-10">
                  <Link href="/" className="text-sm font-medium hover:text-primary">
                    Home
                  </Link>
                  <Link href="/services" className="text-sm font-medium hover:text-primary">
                    Services
                  </Link>
                  <Link href="/about" className="text-sm font-medium hover:text-primary">
                    About Us
                  </Link>
                  <Link href="/gallery" className="text-sm font-medium hover:text-primary">
                    Gallery
                  </Link>
                  <Link href="/contact" className="text-sm font-medium hover:text-primary">
                    Contact
                  </Link>
                </nav>
                <div className="flex items-center ml-auto gap-4">
                  <div className="hidden md:flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-sm">(123) 456-7890</span>
                  </div>
                  <Button asChild className="hidden md:flex">
                    <Link href="/book-appointment">Book Appointment</Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild className="hidden md:flex">
                    <Link href="/admin">
                      <User className="h-5 w-5" />
                      <span className="sr-only">Admin Login</span>
                    </Link>
                  </Button>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                      <nav className="flex flex-col gap-4 mt-8">
                        <Link href="/" className="text-sm font-medium hover:text-primary">
                          Home
                        </Link>
                        <Link href="/services" className="text-sm font-medium hover:text-primary">
                          Services
                        </Link>
                        <Link href="/about" className="text-sm font-medium hover:text-primary">
                          About Us
                        </Link>
                        <Link href="/gallery" className="text-sm font-medium hover:text-primary">
                          Gallery
                        </Link>
                        <Link href="/contact" className="text-sm font-medium hover:text-primary">
                          Contact
                        </Link>
                        <Link href="/book-appointment" className="text-sm font-medium hover:text-primary">
                          Book Appointment
                        </Link>
                        <Link href="/admin" className="text-sm font-medium hover:text-primary">
                          Admin Login
                        </Link>
                      </nav>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t bg-muted/40">
              <div className="container py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">JD Dental Clinic</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Professional dental care for your entire family. We provide comprehensive dental services with a
                      gentle touch.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <nav className="flex flex-col gap-2">
                      <Link href="/" className="text-sm text-gray-500 hover:text-primary">
                        Home
                      </Link>
                      <Link href="/services" className="text-sm text-gray-500 hover:text-primary">
                        Services
                      </Link>
                      <Link href="/about" className="text-sm text-gray-500 hover:text-primary">
                        About Us
                      </Link>
                      <Link href="/gallery" className="text-sm text-gray-500 hover:text-primary">
                        Gallery
                      </Link>
                      <Link href="/contact" className="text-sm text-gray-500 hover:text-primary">
                        Contact
                      </Link>
                      <Link href="/book-appointment" className="text-sm text-gray-500 hover:text-primary">
                        Book Appointment
                      </Link>
                    </nav>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                    <div className="space-y-2 text-sm text-gray-500">
                      <p>123 Dental Street, City, State 12345</p>
                      <p>(123) 456-7890</p>
                      <p>info@jddentalclinic.com</p>
                      <p>Mon-Fri: 9am-5pm, Sat: 9am-2pm</p>
                    </div>
                  </div>
                </div>
                <div className="border-t mt-8 pt-8 text-center text-sm text-gray-500">
                  <p>© {new Date().getFullYear()} JD Dental Clinic. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}



import './globals.css'