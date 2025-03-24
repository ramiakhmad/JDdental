import type { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, CalendarClock, FileText, Settings } from "lucide-react"
import { PortalHeader } from "@/components/portal-header"

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <PortalHeader />
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 py-8">
        <aside className="fixed top-20 z-30 -ml-2 hidden h-[calc(100vh-5rem)] w-full shrink-0 md:sticky md:block">
          <nav className="flex flex-col gap-2 p-2">
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/portal/dashboard">
                <User className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/portal/appointments">
                <CalendarClock className="mr-2 h-4 w-4" />
                My Appointments
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/portal/records">
                <FileText className="mr-2 h-4 w-4" />
                Dental Records
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/portal/profile">
                <Settings className="mr-2 h-4 w-4" />
                Profile Settings
              </Link>
            </Button>
          </nav>
        </aside>
        <main className="flex w-full flex-col gap-6">{children}</main>
      </div>
    </div>
  )
}

