"use server"

import { revalidatePath } from "next/cache"
import { createAppointment, updateAppointment, deleteAppointment, createPatient } from "@/lib/db-service"
import type { Appointment, Patient } from "@/lib/models"

export async function bookAppointment(formData: FormData) {
  try {
    const patientName = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const service = formData.get("service") as string
    const date = formData.get("date") as string
    const time = formData.get("time") as string
    const appointmentType = formData.get("appointmentType") as string
    const notes = formData.get("notes") as string

    // Create a new appointment
    const appointment: Appointment = {
      patientName,
      email,
      phone,
      service,
      date,
      time,
      status: "pending",
      notes,
    }

    // If it's a new patient, create a patient record
    if (appointmentType === "new") {
      const patient: Patient = {
        name: patientName,
        email,
        phone,
      }
      await createPatient(patient)
    }

    const result = await createAppointment(appointment)

    revalidatePath("/admin/dashboard")
    revalidatePath("/book-appointment")

    return { success: true, data: result }
  } catch (error) {
    console.error("Error booking appointment:", error)
    return { success: false, error: "Failed to book appointment" }
  }
}

export async function adminCreateAppointment(formData: FormData) {
  try {
    const patientName = formData.get("patientName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const service = formData.get("service") as string
    const date = formData.get("date") as string
    const time = formData.get("time") as string
    const status = formData.get("status") as string
    const notes = formData.get("notes") as string

    // Create a new appointment
    const appointment: Appointment = {
      patientName,
      email,
      phone,
      service,
      date,
      time,
      status: status as "confirmed" | "pending" | "cancelled",
      notes,
    }

    const result = await createAppointment(appointment)

    revalidatePath("/admin/dashboard")

    return { success: true, data: result }
  } catch (error) {
    console.error("Error creating appointment:", error)
    return { success: false, error: "Failed to create appointment" }
  }
}

export async function adminUpdateAppointment(formData: FormData) {
  try {
    const id = formData.get("id") as string
    const patientName = formData.get("patientName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const service = formData.get("service") as string
    const date = formData.get("date") as string
    const time = formData.get("time") as string
    const status = formData.get("status") as string
    const notes = formData.get("notes") as string

    // Update appointment
    const appointment: Partial<Appointment> = {
      patientName,
      email,
      phone,
      service,
      date,
      time,
      status: status as "confirmed" | "pending" | "cancelled",
      notes,
    }

    const result = await updateAppointment(id, appointment)

    revalidatePath("/admin/dashboard")

    return { success: true, data: result }
  } catch (error) {
    console.error("Error updating appointment:", error)
    return { success: false, error: "Failed to update appointment" }
  }
}

export async function adminDeleteAppointment(id: string) {
  try {
    await deleteAppointment(id)

    revalidatePath("/admin/dashboard")

    return { success: true }
  } catch (error) {
    console.error("Error deleting appointment:", error)
    return { success: false, error: "Failed to delete appointment" }
  }
}

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const message = formData.get("message") as string

    // In a real application, you would store this in the database
    // and/or send an email notification
    console.log("Contact form submission:", { name, email, phone, message })

    return { success: true, message: "Thank you for contacting us. We'll get back to you soon!" }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return { success: false, error: "Failed to submit form" }
  }
}

