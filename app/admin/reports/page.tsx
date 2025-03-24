import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAppointments, getPatients } from "@/lib/db-service"
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns"

export default async function ReportsPage() {
  // Fetch data from database
  const appointments = await getAppointments()
  const patients = await getPatients()

  // Calculate statistics
  const confirmedAppointments = appointments.filter((a) => a.status === "confirmed")
  const cancelledAppointments = appointments.filter((a) => a.status === "cancelled")
  const pendingAppointments = appointments.filter((a) => a.status === "pending")

  // Calculate monthly data
  const today = new Date()
  const monthStart = startOfMonth(today)
  const monthEnd = endOfMonth(today)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Create daily appointment counts for the current month
  const dailyAppointments = daysInMonth.map((day) => {
    const count = appointments.filter((a) => isSameDay(parseISO(a.date), day)).length
    return {
      date: format(day, "MMM d"),
      count,
    }
  })

  // Calculate service distribution
  const serviceDistribution = appointments.reduce((acc, appointment) => {
    acc[appointment.service] = (acc[appointment.service] || 0) + 1
    return acc
  }, {})

  const serviceData = Object.entries(serviceDistribution).map(([service, count]) => ({
    service,
    count,
  }))

  return (
    <>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">Analytics and statistics for your dental clinic</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{confirmedAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              {((confirmedAppointments.length / appointments.length) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cancelled Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cancelledAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              {((cancelledAppointments.length / appointments.length) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patients.length}</div>
            <p className="text-xs text-muted-foreground">Registered in the system</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="appointments" className="mt-6">
        <TabsList>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
        </TabsList>
        <TabsContent value="appointments" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Statistics</CardTitle>
              <CardDescription>Monthly appointment distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-end gap-2">
                {dailyAppointments.map((day) => (
                  <div key={day.date} className="flex flex-col items-center">
                    <div className="bg-primary w-8 rounded-t-md" style={{ height: `${day.count * 30}px` }}></div>
                    <div className="text-xs mt-2 rotate-90 origin-top-left translate-x-6">{day.date}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Confirmed</p>
                  <p className="text-2xl font-bold">{confirmedAppointments.length}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Pending</p>
                  <p className="text-2xl font-bold">{pendingAppointments.length}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Cancelled</p>
                  <p className="text-2xl font-bold">{cancelledAppointments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="services" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Distribution</CardTitle>
              <CardDescription>Most requested dental services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceData.map(({ service, count }) => (
                  <div key={service} className="flex items-center">
                    <div className="w-40 font-medium truncate">{service}</div>
                    <div className="flex-1">
                      <div className="h-4 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(count / appointments.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-12 text-right text-sm font-medium">{count}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="patients" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Statistics</CardTitle>
              <CardDescription>Patient growth and demographics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">Patient statistics will be available soon</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}

