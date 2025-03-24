"use server"

import { getGalleryImages, createGalleryImage } from "./db-service"
import type { GalleryImage } from "./models"

export async function seedGalleryImages() {
  try {
    // Check if gallery images already exist
    const existingImages = await getGalleryImages()

    if (existingImages.length > 0) {
      console.log("Gallery images already exist")
      return { success: true, message: "Gallery images already exist" }
    }

    // Sample gallery images
    const galleryImages: GalleryImage[] = [
      {
        title: "Modern Dental Chair",
        description: "Our state-of-the-art dental chairs ensure maximum comfort during procedures.",
        imageUrl: "/placeholder.svg?height=600&width=800&text=Dental+Chair",
        category: "clinic",
        featured: true,
      },
      {
        title: "Reception Area",
        description: "Our welcoming reception area where patients can relax before appointments.",
        imageUrl: "/placeholder.svg?height=600&width=800&text=Reception",
        category: "clinic",
        featured: true,
      },
      {
        title: "Treatment Room",
        description: "Equipped with the latest dental technology for optimal care.",
        imageUrl: "/placeholder.svg?height=600&width=800&text=Treatment+Room",
        category: "clinic",
        featured: false,
      },
      {
        title: "Teeth Whitening",
        description: "Professional teeth whitening procedure in progress.",
        imageUrl: "/placeholder.svg?height=600&width=800&text=Teeth+Whitening",
        category: "procedures",
        featured: true,
      },
      {
        title: "Dental Implant",
        description: "Close-up of a dental implant procedure.",
        imageUrl: "/placeholder.svg?height=600&width=800&text=Dental+Implant",
        category: "procedures",
        featured: false,
      },
      {
        title: "Orthodontic Treatment",
        description: "Clear aligners being fitted for a patient.",
        imageUrl: "/placeholder.svg?height=600&width=800&text=Orthodontics",
        category: "procedures",
        featured: false,
      },
      {
        title: "Dr. James Davis",
        description: "Our founder and lead dentist with over 20 years of experience.",
        imageUrl: "/placeholder.svg?height=600&width=800&text=Dr.+James",
        category: "staff",
        featured: true,
      },
      {
        title: "Dr. Sarah Johnson",
        description: "Our orthodontics specialist.",
        imageUrl: "/placeholder.svg?height=600&width=800&text=Dr.+Sarah",
        category: "staff",
        featured: false,
      },
      {
        title: "Happy Patient - Sarah",
        description: "Sarah after her successful teeth whitening treatment.",
        imageUrl: "/placeholder.svg?height=600&width=800&text=Happy+Patient+1",
        category: "patients",
        featured: true,
      },
      {
        title: "Happy Patient - Michael",
        description: "Michael showing off his new smile after orthodontic treatment.",
        imageUrl: "/placeholder.svg?height=600&width=800&text=Happy+Patient+2",
        category: "patients",
        featured: false,
      },
    ]

    // Insert gallery images
    for (const image of galleryImages) {
      await createGalleryImage(image)
    }

    console.log("Gallery images seeded successfully")
    return { success: true, message: "Gallery images seeded successfully" }
  } catch (error) {
    console.error("Error seeding gallery images:", error)
    return { success: false, error: "Failed to seed gallery images" }
  }
}

