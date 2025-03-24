import { getGalleryImageById } from "@/lib/db-service"
import { EditGalleryImageForm } from "./edit-form"

export default async function EditGalleryImagePage({ params }: { params: { id: string } }) {
  const image = await getGalleryImageById(params.id)

  if (!image) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold tracking-tight">Image Not Found</h1>
        <p className="text-muted-foreground mt-2">The requested gallery image could not be found.</p>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Gallery Image</h1>
          <p className="text-muted-foreground">Update the details for this gallery image</p>
        </div>
      </div>

      <EditGalleryImageForm image={image} />
    </div>
  )
}

