"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { updateGalleryImageAction } from "@/app/actions/gallery-actions"
import type { GalleryImage } from "@/lib/models"

export function EditGalleryImageForm({ image }: { image: GalleryImage }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      formData.append("id", image._id.toString())

      const result = await updateGalleryImageAction(formData)

      if (result.success) {
        toast({
          title: "Image Updated",
          description: "The gallery image has been updated successfully.",
        })
        router.push("/admin/gallery")
      } else {
        toast({
          title: "Update Failed",
          description: result.error || "Failed to update image",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating image:", error)
      toast({
        title: "Update Failed",
        description: "An error occurred while updating the image.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Image Details</CardTitle>
          <CardDescription>
            Update the details for this gallery image. All fields marked with * are required.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input id="title" name="title" defaultValue={image.title} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" rows={3} defaultValue={image.description || ""} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">
              Category <span className="text-red-500">*</span>
            </Label>
            <Select name="category" required defaultValue={image.category}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clinic">Our Clinic</SelectItem>
                <SelectItem value="procedures">Procedures</SelectItem>
                <SelectItem value="staff">Our Staff</SelectItem>
                <SelectItem value="patients">Happy Patients</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="featured" name="featured" value="true" defaultChecked={image.featured} />
            <Label htmlFor="featured">Featured Image</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Current Image</Label>
            <div className="aspect-video relative rounded-md overflow-hidden border">
              <Image
                src={image.imageUrl || "/placeholder.svg"}
                alt={image.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Upload New Image (Optional)</Label>
            <Input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} />
            <p className="text-sm text-muted-foreground">
              Leave empty to keep the current image. Recommended size: 1200x800 pixels. Maximum file size: 5MB.
            </p>
          </div>

          {imagePreview && (
            <div className="mt-4">
              <Label>Preview of New Image</Label>
              <div className="mt-2 aspect-video relative rounded-md overflow-hidden border">
                <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="object-cover w-full h-full" />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => router.push("/admin/gallery")} type="button">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Image"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

