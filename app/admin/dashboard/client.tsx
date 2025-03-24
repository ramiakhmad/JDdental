"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { format, parseISO, isToday, isThisWeek, isThisMonth } from "date-fns"
import { Edit, Trash2, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { adminUpdateAppointment, adminDeleteAppointment } from "@/app/actions"

export function AppointmentManager({ initialAppointments }) {
  const { toast } = useToast()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [filteredAppointments, setFilteredAppointments] = useState(initialAppointments)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editFormData, setEditFormData] = useState({
    id: "",
    patientName: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    status: "",
    notes: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [allAppointments, setAllAppointments] = useState(initialAppointments)

  // Filter appointments based on selected tab
  const filterAppointmentsByTab = (tab) => {
    switch (tab) {
      case "all":
        setFilteredAppointments(allAppointments)
        break
      case "today":
        setFilteredAppointments(allAppointments.filter((appointment) => isToday(parseISO(appointment.date))))
        break
      case "upcoming":
        setFilteredAppointments(
          allAppointments.filter(
            (appointment) =>
              (isThisWeek(parseISO(appointment.date)) || isThisMonth(parseISO(appointment.date))) &&
              appointment.status !== "cancelled",
          ),
        )
        break
      case "confirmed":
        setFilteredAppointments(allAppointments.filter((appointment) => appointment.status === "confirmed"))
        break
      case "pending":
        setFilteredAppointments(allAppointments.filter((appointment) => appointment.status === "pending"))
        break
      case "cancelled":
        setFilteredAppointments(allAppointments.filter((appointment) => appointment.status === "cancelled"))
        break
      default:
        setFilteredAppointments(allAppointments)
    }
  }

  // Filter appointments based on selected date
  const filterAppointmentsByDate = (date) => {
    setSelectedDate(date)
    setFilteredAppointments(allAppointments.filter((appointment) => appointment.date === format(date, "yyyy-MM-dd")))
  }

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment)
    setEditFormData({
      id: appointment._id,
      patientName: appointment.patientName,
      email: appointment.email,
      phone: appointment.phone,
      service: appointment.service,
      date: appointment.date,
      time: appointment.time,
      status: appointment.status,
      notes: appointment.notes,
    })
    setIsEditDialogOpen(true)
  }

  const handleDeleteAppointment = (appointment) => {
    setSelectedAppointment(appointment)
    setIsDeleteDialogOpen(true)
  }

  const handleEditFormChange = (e) => {
    const { name, value } = e.target
    setEditFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditSelectChange = (name, value) => {
    setEditFormData((prev) => ({ ...prev, [name]: value }))
  }

  const saveAppointmentChanges = async () => {
    try {
      setIsLoading(true)
      // Create FormData object to pass to server action
      const formDataObj = new FormData()
      Object.entries(editFormData).forEach(([key, value]) => {
        if (value !== null) {
          formDataObj.append(key, value)
        }
      })

      // Call server action
      const result = await adminUpdateAppointment(formDataObj)

      if (result.success) {
        // Update local state
        const updatedAppointments = allAppointments.map((appointment) =>
          appointment._id === editFormData.id ? { ...appointment, ...editFormData } : appointment,
        )
        setAllAppointments(updatedAppointments)
        setFilteredAppointments(updatedAppointments)

        setIsEditDialogOpen(false)
        toast({
          title: "Appointment Updated",
          description: `Appointment for ${editFormData.patientName} has been updated.`,
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update appointment",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating appointment:", error)
      toast({
        title: "Error",
        description: "Failed to update appointment",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const confirmDeleteAppointment = async () => {
    try {
      setIsLoading(true)
      // Call server action
      const result = await adminDeleteAppointment(selectedAppointment._id)

      if (result.success) {
        // Update local state
        const updatedAppointments = allAppointments.filter((appointment) => appointment._id !== selectedAppointment._id)
        setAllAppointments(updatedAppointments)
        setFilteredAppointments(updatedAppointments)

        setIsDeleteDialogOpen(false)
        toast({
          title: "Appointment Deleted",
          description: `Appointment for ${selectedAppointment.patientName} has been deleted.`,
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to delete appointment",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting appointment:", error)
      toast({
        title: "Error",
        description: "Failed to delete appointment",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_300px]">
      <Card>
        <CardHeader>
          <CardTitle>Appointment List</CardTitle>
          <CardDescription>View and manage all patient appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={filterAppointmentsByTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              {isLoading ? (
                <div className="text-center py-8">Loading appointments...</div>
              ) : filteredAppointments.length > 0 ? (
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
                      {filteredAppointments.map((appointment) => (
                        <TableRow key={appointment._id}>
                          <TableCell className="font-medium">
                            <div>{appointment.patientName}</div>
                            <div className="text-sm text-muted-foreground">{appointment.email}</div>
                          </TableCell>
                          <TableCell>{appointment.service}</TableCell>
                          <TableCell>
                            <div>{format(parseISO(appointment.date), "MMM d, yyyy")}</div>
                            <div className="text-sm text-muted-foreground">{appointment.time}</div>
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
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleEditAppointment(appointment)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteAppointment(appointment)}>
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8">No appointments found</div>
              )}
            </TabsContent>
            {/* Other tab contents would be similar */}
          </Tabs>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
          <CardDescription>View appointments by date</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={filterAppointmentsByDate}
            className="rounded-md border"
          />
          <div className="mt-4">
            <h3 className="font-medium mb-2">{format(selectedDate, "MMMM d, yyyy")}</h3>
            {filteredAppointments.length > 0 ? (
              <div className="space-y-2">
                {filteredAppointments.map((appointment) => (
                  <div key={appointment._id} className="flex items-center justify-between rounded-md border p-3">
                    <div>
                      <div className="font-medium">{appointment.patientName}</div>
                      <div className="text-sm text-muted-foreground">
                        {appointment.time} - {appointment.service}
                      </div>
                    </div>
                    <div
                      className={`h-2 w-2 rounded-full ${
                        appointment.status === "confirmed"
                          ? "bg-green-500"
                          : appointment.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">No appointments for this date</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Appointment Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Appointment</DialogTitle>
            <DialogDescription>Make changes to the appointment details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="patientName" className="text-right">
                Name
              </Label>
              <Input
                id="patientName"
                name="patientName"
                value={editFormData.patientName}
                onChange={handleEditFormChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                value={editFormData.email}
                onChange={handleEditFormChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={editFormData.phone}
                onChange={handleEditFormChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="service" className="text-right">
                Service
              </Label>
              <Select value={editFormData.service} onValueChange={(value) => handleEditSelectChange("service", value)}>
                <SelectTrigger className="col-span-3">
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={editFormData.date}
                onChange={handleEditFormChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Time
              </Label>
              <Select value={editFormData.time} onValueChange={(value) => handleEditSelectChange("time", value)}>
                <SelectTrigger className="col-span-3">
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select value={editFormData.status} onValueChange={(value) => handleEditSelectChange("status", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Textarea
                id="notes"
                name="notes"
                value={editFormData.notes}
                onChange={handleEditFormChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveAppointmentChanges} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Appointment Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Appointment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this appointment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedAppointment && (
              <div className="rounded-md border p-4">
                <p>
                  <span className="font-medium">Patient:</span> {selectedAppointment.patientName}
                </p>
                <p>
                  <span className="font-medium">Service:</span> {selectedAppointment.service}
                </p>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {format(parseISO(selectedAppointment.date), "MMMM d, yyyy")}
                </p>
                <p>
                  <span className="font-medium">Time:</span> {selectedAppointment.time}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteAppointment} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

