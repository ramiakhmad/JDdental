import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getAppointments } from "@/lib/db-service"
import { format, parseISO, isToday, isThisWeek, isThisMonth, isFuture } from "date-fns"
import { CalendarIcon, Edit, Eye } from "lucide-react"

export default async function AppointmentsPage() {
  // Fetch appointments from database
  const appointments = await getAppointments()

  // Filter appointments for different tabs
  const todayAppointments = appointments.filter((a) => isToday(parseISO(a.date)))
  const upcomingAppointments = appointments.filter(
    (a) =>
      isFuture(parseISO(a.date)) &&
      (isThisWeek(parseISO(a.date)) || isThisMonth(parseISO(a.date))) &&
      a.status !== "cancelled",
  )
  const confirmedAppointments = appointments.filter((a) => a.status === "confirmed")
  const pendingAppointments = appointments.filter((a) => a.status === "pending")
  const cancelledAppointments = appointments.filter((a) => a.status === "cancelled")

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">Manage and track patient appointments</p>
        </div>
        <Button asChild>
          <Link href="/admin/appointments/new">Add New Appointment</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointment List</CardTitle>
          <CardDescription>View and manage all patient appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="today">Today ({todayAppointments.length})</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming ({upcomingAppointments.length})</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed ({confirmedAppointments.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({pendingAppointments.length})</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled ({cancelledAppointments.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.length > 0 ? (
                      appointments.map((appointment) => (
                        <TableRow key={appointment._id?.toString()}>
                          <TableCell className="font-medium">
                            <div>{appointment.patientName}</div>
                            <div className="text-sm text-muted-foreground">{appointment.email}</div>
                          </TableCell>
                          <TableCell>{appointment.service}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <div>{format(parseISO(appointment.date), "MMM d, yyyy")}</div>
                                <div className="text-sm text-muted-foreground">{appointment.time}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                appointment.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : appointment.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" asChild>
                                <Link href={`/admin/appointments/${appointment._id}`}>
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">View</span>
                                </Link>
                              </Button>
                              <Button variant="ghost" size="icon" asChild>
                                <Link href={`/admin/appointments/${appointment._id}/edit`}>
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Edit</span>
                                </Link>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                          No appointments found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="today" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {todayAppointments.length > 0 ? (
                      todayAppointments.map((appointment) => (
                        <TableRow key={appointment._id?.toString()}>
                          <TableCell className="font-medium">
                            <div>{appointment.patientName}</div>
                            <div className="text-sm text-muted-foreground">{appointment.email}</div>
                          </TableCell>
                          <TableCell>{appointment.service}</TableCell>
                          <TableCell>
                            <div className="text-sm">{appointment.time}</div>
                          </TableCell>
                          <TableCell>
                            <div
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                appointment.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : appointment.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" asChild>
                                <Link href={`/admin/appointments/${appointment._id}`}>
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">View</span>
                                </Link>
                              </Button>
                              <Button variant="ghost" size="icon" asChild>
                                <Link href={`/admin/appointments/${appointment._id}/edit`}>
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Edit</span>
                                </Link>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                          No appointments scheduled for today
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Similar structure for other tabs */}
          </Tabs>
        </CardContent>
      </Card>
    </>
  )
}

