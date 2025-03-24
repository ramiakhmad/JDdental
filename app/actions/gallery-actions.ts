"use server"

import { revalidatePath } from "next/cache"
import { createGalleryImage, updateGalleryImage, deleteGalleryImage } from "@/lib/db-service"
import { uploadImage, deleteImage } from "@/lib/blob-service"
import type { GalleryImage } from "@/lib/models"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function uploadGalleryImage(formData: FormData) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "admin") {
      return { success: false, error: "Unauthorized" }
    }

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const category = formData.get("category") as "clinic" | "procedures" | "staff" | "patients"
    const featured = formData.get("featured") === "true"
    const imageFile = formData.get("image") as File

    if (!imageFile || !title || !category) {
      return { success: false, error: "Missing required fields" }
    }

    // Upload image to Vercel Blob
    const uploadResult = await uploadImage(imageFile)
    if (!uploadResult.success) {
      return uploadResult
    }

    // Create gallery image record in database
    const galleryImage: GalleryImage = {
      title,
      description,
      imageUrl: uploadResult.url,
      category,
      featured,
    }

    const result = await createGalleryImage(galleryImage)

    revalidatePath("/gallery")
    revalidatePath("/admin/gallery")

    return { success: true, data: result }
  } catch (error) {
    console.error("Error uploading gallery image:", error)
    return { success: false, error: "Failed to upload gallery image" }
  }
}

export async function updateGalleryImageAction(formData: FormData) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "admin") {
      return { success: false, error: "Unauthorized" }
    }

    const id = formData.get("id") as string
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const category = formData.get("category") as "clinic" | "procedures" | "staff" | "patients"
    const featured = formData.get("featured") === "true"
    const imageFile = formData.get("image") as File | null

    if (!id || !title || !category) {
      return { success: false, error: "Missing required fields" }
    }

    let imageUrl

    // If a new image is provided, upload it
    if (imageFile && imageFile.size > 0) {
      const uploadResult = await uploadImage(imageFile)
      if (!uploadResult.success) {
        return uploadResult
      }
      imageUrl = uploadResult.url
    }

    // Update gallery image record in database
    const galleryImage: Partial<GalleryImage> = {
      title,
      description,
      category,
      featured,
    }

    if (imageUrl) {
      galleryImage.imageUrl = imageUrl
    }

    const result = await updateGalleryImage(id, galleryImage)

    revalidatePath("/gallery")
    revalidatePath("/admin/gallery")

    return { success: true, data: result }
  } catch (error) {
    console.error("Error updating gallery image:", error)
    return { success: false, error: "Failed to update gallery image" }
  }
}

export async function deleteGalleryImageAction(id: string, filename: string) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "admin") {
      return { success: false, error: "Unauthorized" }
    }

    // Delete image from Vercel Blob
    await deleteImage(filename)

    // Delete gallery image record from database
    await deleteGalleryImage(id)

    revalidatePath("/gallery")
    revalidatePath("/admin/gallery")

    return { success: true }
  } catch (error) {
    console.error("Error deleting gallery image:", error)
    return { success: false, error: "Failed to delete gallery image" }
  }
}

