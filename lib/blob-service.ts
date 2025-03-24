import { put, del } from "@vercel/blob"
import { nanoid } from "nanoid"

export async function uploadImage(file: File) {
  try {
    const filename = `${nanoid()}-${file.name}`
    const blob = await put(filename, file, {
      access: "public",
    })

    return {
      success: true,
      url: blob.url,
      filename: blob.pathname,
    }
  } catch (error) {
    console.error("Error uploading image:", error)
    return {
      success: false,
      error: "Failed to upload image",
    }
  }
}

export async function deleteImage(filename: string) {
  try {
    await del(filename)
    return { success: true }
  } catch (error) {
    console.error("Error deleting image:", error)
    return {
      success: false,
      error: "Failed to delete image",
    }
  }
}

