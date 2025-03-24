import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format, parseISO, isPast, isFuture } from "date-fns"
import { CalendarClock, Eye, X } from "lucide-react"

export default function PatientAppointmentsPage() {
  // In a real application, this would come from the database based on the logged-in user
  const appointments = [
    {
      id: "1",
      service: "General Check-up",
      date: "2025-03-25",
      time: "10:00",
      status: "confirmed",
      dentist: "Dr. James Davis",
      notes: "Regular 6-month check-up",
    },
    {
      id: "2",
      service: "Teeth Cleaning",
      date: "2025-04-15",
      time: "14:00",
      status: "pending",
      dentist: "Dr. Sarah Johnson",
      notes: "Professional cleaning",
    },
    {
      id: "3",
      service: "Cavity Filling",
      date: "2024-12-10",
      time: "11:00",
      status: "completed",
      dentist: "Dr. James Davis",
      notes: "Filling for lower right molar",
    },
    {
      id: "4",
      service: "X-Ray",
      date: "2024-11-05",
      time: "09:30",
      status: "completed",
      dentist: "Dr. Michael Chen",
      notes: "Full mouth X-rays",
    },
    {
      id: "5",
      service: "Teeth Whitening",
      date: "2024-10-20",
      time: "15:00",
      status: "cancelled",
      dentist: "Dr. Sarah Johnson",
      notes: "Cancelled due to illness",
    },
  ]

  // Filter appointments
  const upcomingAppointments = appointments.filter((a) => isFuture(parseISO(a.date)) && a.status !== "cancelled")

  const pastAppointments = appointments.filter((a) => isPast(parseISO(a.date)) || a.status === "completed")

  const cancelledAppointments = appointments.filter((a) => a.status === "cancelled")

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Appointments</h1>
          <p className="text-muted-foreground">View and manage your dental appointments</p>
        </div>
        <Button asChild>
          <Link href="/book-appointment">Book New Appointment</Link>
        </Button>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Appointment History</CardTitle>
          <CardDescription>View all your past and upcoming appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Upcoming ({upcomingAppointments.length})</TabsTrigger>
              <TabsTrigger value="past">Past ({pastAppointments.length})</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled ({cancelledAppointments.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Dentist</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingAppointments.length > 0 ? (
                      upcomingAppointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell className="font-medium">
                            {appointment.service}
                            <div className="text-sm text-muted-foreground">{appointment.notes}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <CalendarClock className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <div>{format(parseISO(appointment.date), "MMM d, yyyy")}</div>
                                <div className="text-sm text-muted-foreground">{appointment.time}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{appointment.dentist}</TableCell>
                          <TableCell>
                            <div
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                appointment.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" asChild>
                                <Link href={`/portal/appointments/${appointment.id}`}>
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">View</span>
                                </Link>
                              </Button>
                              <Button variant="ghost" size="icon">
                                <X className="h-4 w-4" />
                                <span className="sr-only">Cancel</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                          No upcoming appointments
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Dentist</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pastAppointments.length > 0 ? (
                      pastAppointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell className="font-medium">
                            {appointment.service}
                            <div className="text-sm text-muted-foreground">{appointment.notes}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <CalendarClock className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <div>{format(parseISO(appointment.date), "MMM d, yyyy")}</div>
                                <div className="text-sm text-muted-foreground">{appointment.time}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{appointment.dentist}</TableCell>
                          <TableCell>
                            <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800">
                              Completed
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/portal/appointments/${appointment.id}`}>
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                          No past appointments
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="cancelled" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Dentist</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cancelledAppointments.length > 0 ? (
                      cancelledAppointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell className="font-medium">
                            {appointment.service}
                            <div className="text-sm text-muted-foreground">{appointment.notes}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <CalendarClock className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <div>{format(parseISO(appointment.date), "MMM d, yyyy")}</div>
                                <div className="text-sm text-muted-foreground">{appointment.time}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{appointment.dentist}</TableCell>
                          <TableCell>
                            <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-red-100 text-red-800">
                              Cancelled
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/portal/appointments/${appointment.id}`}>
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                          No cancelled appointments
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  )
}

