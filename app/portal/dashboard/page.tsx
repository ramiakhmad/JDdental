import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarClock, FileText, Clock, ArrowRight } from "lucide-react"
import { format, parseISO } from "date-fns"

export default function PatientDashboardPage() {
  // In a real application, this would come from the database based on the logged-in user
  const patient = {
    name: "John Smith",
    email: "john@example.com",
    phone: "(555) 123-4567",
    appointments: [
      {
        id: "1",
        service: "General Check-up",
        date: "2025-03-25",
        time: "10:00",
        status: "confirmed",
        dentist: "Dr. James Davis",
      },
      {
        id: "2",
        service: "Teeth Cleaning",
        date: "2025-04-15",
        time: "14:00",
        status: "pending",
        dentist: "Dr. Sarah Johnson",
      },
    ],
    records: [
      {
        id: "1",
        type: "Examination",
        date: "2024-12-10",
        notes: "Regular check-up, no issues found.",
      },
      {
        id: "2",
        type: "X-Ray",
        date: "2024-12-10",
        notes: "Full mouth X-rays taken.",
      },
    ],
  }

  // Sort appointments by date
  const sortedAppointments = [...patient.appointments].sort((a, b) => {
    return new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)
  })

  // Get the next appointment
  const nextAppointment = sortedAppointments.find((a) => a.status !== "cancelled")

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {patient.name}</h1>
          <p className="text-muted-foreground">Your patient dashboard at JD Dental Clinic</p>
        </div>
        <Button asChild>
          <Link href="/book-appointment">Book New Appointment</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {nextAppointment ? (
              <div className="space-y-2">
                <p className="text-xl font-bold">{nextAppointment.service}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>
                    {format(parseISO(nextAppointment.date), "MMMM d, yyyy")} at {nextAppointment.time}
                  </span>
                </div>
                <p className="text-sm">With {nextAppointment.dentist}</p>
                <div
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    nextAppointment.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {nextAppointment.status.charAt(0).toUpperCase() + nextAppointment.status.slice(1)}
                </div>
              </div>
            ) : (
              <div className="py-2">
                <p className="text-muted-foreground">No upcoming appointments</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/portal/appointments">
                View All Appointments
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Records</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {patient.records.length > 0 ? (
              <div className="space-y-4">
                {patient.records.slice(0, 2).map((record) => (
                  <div key={record.id} className="border-b pb-2 last:border-0 last:pb-0">
                    <div className="flex justify-between">
                      <p className="font-medium">{record.type}</p>
                      <p className="text-sm text-muted-foreground">{format(parseISO(record.date), "MMM d, yyyy")}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{record.notes}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-2">
                <p className="text-muted-foreground">No dental records available</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/portal/records">
                View All Records
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                <Link href="/book-appointment">
                  <CalendarClock className="mr-2 h-4 w-4" />
                  Book New Appointment
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                <Link href="/portal/profile">
                  <FileText className="mr-2 h-4 w-4" />
                  Update Personal Information
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                <Link href="/contact">
                  <Clock className="mr-2 h-4 w-4" />
                  Contact Clinic
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Your scheduled dental visits</CardDescription>
          </CardHeader>
          <CardContent>
            {sortedAppointments.length > 0 ? (
              <div className="space-y-4">
                {sortedAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium">{appointment.service}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarClock className="h-3 w-3" />
                        <span>
                          {format(parseISO(appointment.date), "MMMM d, yyyy")} at {appointment.time}
                        </span>
                      </div>
                      <p className="text-sm">With {appointment.dentist}</p>
                    </div>
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
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">No appointments scheduled</div>
            )}
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/book-appointment">Book New Appointment</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dental Health Tips</CardTitle>
            <CardDescription>Tips for maintaining good oral health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-medium">Proper Brushing Technique</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Brush your teeth for two minutes, twice a day. Use a soft-bristled brush and fluoride toothpaste.
                </p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-medium">Don't Forget to Floss</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Floss at least once a day to remove plaque and food particles between teeth where your toothbrush
                  can't reach.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Regular Dental Check-ups</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Visit your dentist every six months for a professional cleaning and check-up to prevent dental
                  problems.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

