import type { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Users, Clock, BarChart, Settings } from "lucide-react"
import { AdminHeader } from "@/components/admin-header"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <AdminHeader />
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 py-8">
        <aside className="fixed top-20 z-30 -ml-2 hidden h-[calc(100vh-5rem)] w-full shrink-0 md:sticky md:block">
          <nav className="flex flex-col gap-2 p-2">
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/admin/dashboard">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/admin/appointments">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Appointments
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/admin/patients">
                <Users className="mr-2 h-4 w-4" />
                Patients
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/admin/staff">
                <Users className="mr-2 h-4 w-4" />
                Staff
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/admin/schedule">
                <Clock className="mr-2 h-4 w-4" />
                Schedule
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/admin/reports">
                <BarChart className="mr-2 h-4 w-4" />
                Reports
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/admin/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
          </nav>
        </aside>
        <main className="flex w-full flex-col gap-6">{children}</main>
      </div>
    </div>
  )
}

