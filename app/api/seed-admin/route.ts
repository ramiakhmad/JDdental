import { NextResponse } from "next/server"
import { seedAdminUser } from "@/lib/seed-admin"

export async function GET() {
  try {
    const result = await seedAdminUser()

    if (result.success) {
      return NextResponse.json({ success: true, message: result.message })
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error("Error in seed-admin route:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

