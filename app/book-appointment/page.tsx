"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, CheckCircle } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"
import { bookAppointment } from "../actions"

export default function BookAppointmentPage() {
  const { toast } = useToast()
  const [date, setDate] = useState(null)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    appointmentType: "new",
    date: null,
    time: "",
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

  const handleRadioChange = (value) => {
    setFormData((prev) => ({ ...prev, appointmentType: value }))
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
    const result = await bookAppointment(formDataObj)

    if (result.success) {
      toast({
        title: "Appointment Requested",
        description: "We'll confirm your appointment shortly. Thank you!",
      })
      setStep(3)
    } else {
      toast({
        title: "Error",
        description: result.error || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">Book an Appointment</h1>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Schedule your visit with our dental professionals
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl">
            <div className="flex justify-between items-center mb-8">
              <div className={`flex flex-col items-center ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 1 ? "border-primary bg-primary/10" : "border-muted"}`}
                >
                  1
                </div>
                <span className="text-sm mt-1">Personal Info</span>
              </div>
              <div className={`flex-1 h-1 mx-2 ${step >= 2 ? "bg-primary" : "bg-muted"}`}></div>
              <div className={`flex flex-col items-center ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 2 ? "border-primary bg-primary/10" : "border-muted"}`}
                >
                  2
                </div>
                <span className="text-sm mt-1">Appointment Details</span>
              </div>
              <div className={`flex-1 h-1 mx-2 ${step >= 3 ? "bg-primary" : "bg-muted"}`}></div>
              <div className={`flex flex-col items-center ${step >= 3 ? "text-primary" : "text-muted-foreground"}`}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 3 ? "border-primary bg-primary/10" : "border-muted"}`}
                >
                  3
                </div>
                <span className="text-sm mt-1">Confirmation</span>
              </div>
            </div>

            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Please provide your contact details so we can reach you regarding your appointment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your full name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your email address"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="Your phone number"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Appointment Type</Label>
                      <RadioGroup defaultValue={formData.appointmentType} onValueChange={handleRadioChange}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="new" id="new" />
                          <Label htmlFor="new">New Patient</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="existing" id="existing" />
                          <Label htmlFor="existing">Existing Patient</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={nextStep}>Next</Button>
                </CardFooter>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Details</CardTitle>
                  <CardDescription>Select your preferred service, date, and time</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
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
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Preferred Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground",
                            )}
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
                      <Label htmlFor="time">Preferred Time</Label>
                      <Select onValueChange={(value) => handleSelectChange("time", value)} value={formData.time}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9:00">9:00 AM</SelectItem>
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
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        placeholder="Any specific concerns or information we should know?"
                        rows={3}
                        value={formData.notes}
                        onChange={handleChange}
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                  <Button onClick={handleSubmit}>Book Appointment</Button>
                </CardFooter>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                  </div>
                  <CardTitle className="text-center">Appointment Requested</CardTitle>
                  <CardDescription className="text-center">
                    Thank you for booking an appointment with JD Dental Clinic
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="mb-4">
                    We have received your appointment request and will confirm it shortly. A confirmation email has been
                    sent to {formData.email}.
                  </p>
                  <div className="bg-muted p-4 rounded-lg max-w-sm mx-auto text-left">
                    <h3 className="font-medium mb-2">Appointment Details:</h3>
                    <p>
                      <span className="font-medium">Name:</span> {formData.name}
                    </p>
                    <p>
                      <span className="font-medium">Service:</span> {formData.service}
                    </p>
                    <p>
                      <span className="font-medium">Date:</span>{" "}
                      {formData.date ? format(new Date(formData.date), "PPP") : "Not selected"}
                    </p>
                    <p>
                      <span className="font-medium">Time:</span> {formData.time}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button asChild>
                    <a href="/">Return to Home</a>
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

