import { NextResponse } from "next/server"
import { getAppointments } from "@/lib/db-service"

export async function GET() {
  try {
    const appointments = await getAppointments()
    return NextResponse.json({ success: true, appointments })
  } catch (error) {
    console.error("Error fetching appointments:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch appointments" }, { status: 500 })
  }
}

