import { NextResponse } from "next/server"
import { getAppointments } from "@/lib/db-service"
import { sendAppointmentReminder } from "@/lib/email-service"
import { addDays, format } from "date-fns"

// This endpoint will be called by a cron job
export async function GET() {
  try {
    // Get all appointments for tomorrow
    const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd")
    const appointments = await getAppointments()
    const tomorrowAppointments = appointments.filter(
      (appointment) => appointment.date === tomorrow && appointment.status === "confirmed",
    )

    // Send reminders
    for (const appointment of tomorrowAppointments) {
      await sendAppointmentReminder(appointment)
    }

    return NextResponse.json({
      success: true,
      message: `Sent ${tomorrowAppointments.length} reminders`,
    })
  } catch (error) {
    console.error("Error sending reminders:", error)
    return NextResponse.json({ success: false, error: "Failed to send reminders" }, { status: 500 })
  }
}

