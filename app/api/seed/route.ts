import { NextResponse } from "next/server"
import { seedAdminUser } from "@/lib/seed-admin"
import { seedGalleryImages } from "@/lib/seed-gallery"

export async function GET() {
  try {
    // Seed admin user
    const adminResult = await seedAdminUser()

    // Seed gallery images
    const galleryResult = await seedGalleryImages()

    return NextResponse.json({
      success: true,
      admin: adminResult,
      gallery: galleryResult,
    })
  } catch (error) {
    console.error("Error in seed route:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

