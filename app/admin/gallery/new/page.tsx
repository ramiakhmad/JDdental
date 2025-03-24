"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { uploadGalleryImage } from "@/app/actions/gallery-actions"

export default function NewGalleryImagePage() {
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
      const result = await uploadGalleryImage(formData)

      if (result.success) {
        toast({
          title: "Image Uploaded",
          description: "The gallery image has been uploaded successfully.",
        })
        router.push("/admin/gallery")
      } else {
        toast({
          title: "Upload Failed",
          description: result.error || "Failed to upload image",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({
        title: "Upload Failed",
        description: "An error occurred while uploading the image.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Gallery Image</h1>
          <p className="text-muted-foreground">Upload a new image to the gallery</p>
        </div>
        <Button variant="outline" onClick={() => router.push("/admin/gallery")}>
          Cancel
        </Button>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Image Details</CardTitle>
            <CardDescription>
              Fill in the details for the new gallery image. All fields marked with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input id="title" name="title" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" rows={3} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select name="category" required defaultValue="clinic">
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
              <Switch id="featured" name="featured" value="true" />
              <Label htmlFor="featured">Featured Image</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">
                Image <span className="text-red-500">*</span>
              </Label>
              <Input id="image" name="image" type="file" accept="image/*" required onChange={handleImageChange} />
              <p className="text-sm text-muted-foreground">
                Recommended size: 1200x800 pixels. Maximum file size: 5MB.
              </p>
            </div>

            {imagePreview && (
              <div className="mt-4">
                <Label>Preview</Label>
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
              {isLoading ? "Uploading..." : "Upload Image"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

