"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Clock, Plus } from "lucide-react"
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns"

export default function SchedulePage() {
  const [date, setDate] = useState<Date>(new Date())
  const [view, setView] = useState<"day" | "week" | "month">("week")

  // In a real application, this would come from the database
  const appointments = [
    {
      id: "1",
      patientName: "John Smith",
      service: "General Check-up",
      date: new Date(),
      time: "10:00",
      duration: 30,
      status: "confirmed",
    },
    {
      id: "2",
      patientName: "Emily Johnson",
      service: "Teeth Cleaning",
      date: new Date(),
      time: "14:00",
      duration: 60,
      status: "confirmed",
    },
    {
      id: "3",
      patientName: "Michael Brown",
      service: "Root Canal",
      date: addDays(new Date(), 1),
      time: "11:00",
      duration: 90,
      status: "pending",
    },
    {
      id: "4",
      patientName: "Sarah Wilson",
      service: "Orthodontic Consultation",
      date: addDays(new Date(), 2),
      time: "09:00",
      duration: 45,
      status: "confirmed",
    },
  ]

  // Generate time slots for the day view
  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const hour = i + 9 // Start at 9 AM
    return `${hour}:00`
  })

  // Generate days for the week view
  const weekStart = startOfWeek(date, { weekStartsOn: 1 }) // Start on Monday
  const weekEnd = endOfWeek(date, { weekStartsOn: 1 })
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd })

  // Filter appointments for the selected date or week
  const filteredAppointments = appointments.filter((appointment) => {
    if (view === "day") {
      return isSameDay(appointment.date, date)
    } else if (view === "week") {
      return weekDays.some((day) => isSameDay(appointment.date, day))
    }
    return true
  })

  // Navigate to previous/next day or week
  const navigatePrevious = () => {
    if (view === "day") {
      setDate((prev) => addDays(prev, -1))
    } else if (view === "week") {
      setDate((prev) => addDays(prev, -7))
    }
  }

  const navigateNext = () => {
    if (view === "day") {
      setDate((prev) => addDays(prev, 1))
    } else if (view === "week") {
      setDate((prev) => addDays(prev, 7))
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
          <p className="text-muted-foreground">Manage your clinic's daily schedule</p>
        </div>
        <Button asChild>
          <Link href="/admin/appointments/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Appointment
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming</CardTitle>
              <CardDescription>Today's appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          appointment.status === "confirmed"
                            ? "bg-green-500"
                            : appointment.status === "pending"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      />
                      <div>
                        <p className="font-medium">{appointment.patientName}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>
                            {appointment.time} ({appointment.duration} min)
                          </span>
                        </div>
                        <p className="text-sm">{appointment.service}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">No appointments scheduled</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="flex-1">
              <CardTitle>Schedule View</CardTitle>
              <CardDescription>
                {view === "day"
                  ? format(date, "MMMM d, yyyy")
                  : `${format(weekStart, "MMM d")} - ${format(weekEnd, "MMM d, yyyy")}`}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={view} onValueChange={(value) => setView(value as "day" | "week" | "month")}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="View" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Day</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex">
                <Button variant="outline" size="icon" onClick={navigatePrevious}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={navigateNext}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {view === "day" ? (
              <div className="space-y-2">
                {timeSlots.map((time) => {
                  const timeAppointments = filteredAppointments.filter((a) => a.time === time)
                  return (
                    <div key={time} className="grid grid-cols-[80px_1fr] gap-4 py-2 border-b last:border-0">
                      <div className="text-sm font-medium text-muted-foreground">{time}</div>
                      <div>
                        {timeAppointments.length > 0 ? (
                          timeAppointments.map((appointment) => (
                            <div
                              key={appointment.id}
                              className={`p-2 rounded-md mb-1 ${
                                appointment.status === "confirmed"
                                  ? "bg-green-100 border border-green-200"
                                  : appointment.status === "pending"
                                    ? "bg-yellow-100 border border-yellow-200"
                                    : "bg-red-100 border border-red-200"
                              }`}
                            >
                              <p className="font-medium">{appointment.patientName}</p>
                              <p className="text-sm">{appointment.service}</p>
                            </div>
                          ))
                        ) : (
                          <div className="h-8 border border-dashed border-muted rounded-md"></div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="grid grid-cols-7 gap-4">
                {weekDays.map((day) => (
                  <div key={day.toString()} className="space-y-2">
                    <div className="text-center">
                      <p className="text-sm font-medium">{format(day, "EEE")}</p>
                      <p className={`text-2xl ${isSameDay(day, new Date()) ? "text-primary font-bold" : ""}`}>
                        {format(day, "d")}
                      </p>
                    </div>
                    <div className="min-h-[200px] border rounded-md p-2">
                      {appointments
                        .filter((a) => isSameDay(a.date, day))
                        .map((appointment) => (
                          <div
                            key={appointment.id}
                            className={`p-2 rounded-md mb-1 text-sm ${
                              appointment.status === "confirmed"
                                ? "bg-green-100 border border-green-200"
                                : appointment.status === "pending"
                                  ? "bg-yellow-100 border border-yellow-200"
                                  : "bg-red-100 border border-red-200"
                            }`}
                          >
                            <p className="font-medium truncate">{appointment.patientName}</p>
                            <p className="text-xs">
                              {appointment.time} - {appointment.service}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

