"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [clinicSettings, setClinicSettings] = useState({
    name: "JD Dental Clinic",
    address: "123 Dental Street, City, State 12345",
    phone: "(123) 456-7890",
    email: "info@jddentalclinic.com",
    website: "www.jddentalclinic.com",
    hours: "Monday - Friday: 9am - 5pm, Saturday: 9am - 2pm, Sunday: Closed",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailReminders: true,
    smsReminders: true,
    appointmentConfirmations: true,
    marketingEmails: false,
  })

  const handleClinicSettingsChange = (e) => {
    const { name, value } = e.target
    setClinicSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationToggle = (setting) => {
    setNotificationSettings((prev) => ({ ...prev, [setting]: !prev[setting] }))
  }

  const saveClinicSettings = () => {
    // In a real application, this would save to the database
    toast({
      title: "Settings Saved",
      description: "Your clinic settings have been updated successfully.",
    })
  }

  const saveNotificationSettings = () => {
    // In a real application, this would save to the database
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated.",
    })
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your clinic settings and preferences</p>
        </div>
      </div>

      <Tabs defaultValue="clinic" className="mt-6">
        <TabsList>
          <TabsTrigger value="clinic">Clinic Information</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="backup">Backup & Data</TabsTrigger>
        </TabsList>

        <TabsContent value="clinic" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Clinic Information</CardTitle>
              <CardDescription>Update your clinic's basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Clinic Name</Label>
                <Input id="name" name="name" value={clinicSettings.name} onChange={handleClinicSettingsChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={clinicSettings.address}
                  onChange={handleClinicSettingsChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" value={clinicSettings.phone} onChange={handleClinicSettingsChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={clinicSettings.email}
                    onChange={handleClinicSettingsChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  value={clinicSettings.website}
                  onChange={handleClinicSettingsChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hours">Business Hours</Label>
                <Textarea id="hours" name="hours" value={clinicSettings.hours} onChange={handleClinicSettingsChange} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveClinicSettings}>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Branding</CardTitle>
              <CardDescription>Customize your clinic's branding elements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-md bg-muted flex items-center justify-center">Logo</div>
                  <Button variant="outline">Upload New Logo</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Color Scheme</Label>
                <div className="flex gap-2">
                  <div className="h-10 w-10 rounded-md bg-primary"></div>
                  <div className="h-10 w-10 rounded-md bg-secondary"></div>
                  <div className="h-10 w-10 rounded-md bg-accent"></div>
                  <Button variant="outline" size="sm" className="ml-2">
                    Customize
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Branding</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how and when notifications are sent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Appointment Reminders</Label>
                  <p className="text-sm text-muted-foreground">Send email reminders to patients before appointments</p>
                </div>
                <Switch
                  checked={notificationSettings.emailReminders}
                  onCheckedChange={() => handleNotificationToggle("emailReminders")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Appointment Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Send text message reminders to patients before appointments
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.smsReminders}
                  onCheckedChange={() => handleNotificationToggle("smsReminders")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Appointment Confirmations</Label>
                  <p className="text-sm text-muted-foreground">
                    Send confirmation messages when appointments are booked or changed
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.appointmentConfirmations}
                  onCheckedChange={() => handleNotificationToggle("appointmentConfirmations")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Send promotional emails about special offers and services
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.marketingEmails}
                  onCheckedChange={() => handleNotificationToggle("marketingEmails")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveNotificationSettings}>Save Notification Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage staff accounts and access permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                User management features will be available soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Backup & Data Management</CardTitle>
              <CardDescription>Manage your clinic's data and backups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Backup and data management features will be available soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}

