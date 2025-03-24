"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"
import { adminCreateAppointment } from "@/app/actions"

export default function NewAppointmentPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [date, setDate] = useState(null)
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    phone: "",
    service: "",
    date: null,
    time: "",
    status: "pending",
    notes: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date) => {
    setDate(date)
    setFormData((prev) => ({ ...prev, date: format(date, "yyyy-MM-dd") }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Create FormData object to pass to server action
    const formDataObj = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        formDataObj.append(key, value)
      }
    })

    // Call server action
    const result = await adminCreateAppointment(formDataObj)

    if (result.success) {
      toast({
        title: "Appointment Created",
        description: `New appointment for ${formData.patientName} has been created.`,
      })
      router.push("/admin/dashboard")
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to create appointment",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">JD Dental Clinic Admin</div>
        </div>
      </header>
      <div className="container py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">New Appointment</h1>
            <p className="text-muted-foreground">Create a new appointment for a patient</p>
          </div>
          <Button variant="outline" onClick={() => router.push("/admin/dashboard")}>
            Cancel
          </Button>
        </div>
        <div className="mx-auto max-w-2xl mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
              <CardDescription>Enter the patient information and appointment details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Input
                    id="patientName"
                    name="patientName"
                    placeholder="Full name"
                    required
                    value={formData.patientName}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Phone number"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service">Service</Label>
                  <Select onValueChange={(value) => handleSelectChange("service", value)} value={formData.service}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General Check-up">General Check-up</SelectItem>
                      <SelectItem value="Teeth Cleaning">Teeth Cleaning</SelectItem>
                      <SelectItem value="Teeth Whitening">Teeth Whitening</SelectItem>
                      <SelectItem value="Dental Filling">Dental Filling</SelectItem>
                      <SelectItem value="Root Canal">Root Canal</SelectItem>
                      <SelectItem value="Tooth Extraction">Tooth Extraction</SelectItem>
                      <SelectItem value="Orthodontic Consultation">Orthodontic Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Appointment Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={handleDateChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Appointment Time</Label>
                  <Select onValueChange={(value) => handleSelectChange("time", value)} value={formData.time}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">9:00 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="11:00">11:00 AM</SelectItem>
                      <SelectItem value="13:00">1:00 PM</SelectItem>
                      <SelectItem value="14:00">2:00 PM</SelectItem>
                      <SelectItem value="15:00">3:00 PM</SelectItem>
                      <SelectItem value="16:00">4:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select onValueChange={(value) => handleSelectChange("status", value)} value={formData.status}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Additional information"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => router.push("/admin/dashboard")}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Create Appointment</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

