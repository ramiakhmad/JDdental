"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getGalleryImages } from "@/lib/db-service";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { deleteGalleryImageAction } from "@/app/actions/gallery-actions";

export default async function AdminGalleryPage() {
  const images = await getGalleryImages();

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gallery Management</h1>
          <p className="text-muted-foreground">Manage the photo gallery for your dental clinic</p>
        </div>
        <Button asChild>
          <Link href="/admin/gallery/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New Image
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {images.map((image) => (
          <Card key={image._id.toString()} className="overflow-hidden">
            <div className="aspect-video relative">
              <Image
                src={image.imageUrl || "/placeholder.svg"}
                alt={image.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <Button variant="secondary" size="icon" asChild>
                  <Link href={`/admin/gallery/${image._id}/edit`}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Link>
                </Button>
                <DeleteImageButton id={image._id.toString()} filename={image.imageUrl.split("/").pop()} />
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{image.title}</h3>
                  <p className="text-sm text-muted-foreground">{image.category}</p>
                  {image.description && <p className="text-sm mt-1">{image.description}</p>}
                </div>
                {image.featured && (
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Featured</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {images.length === 0 && (
          <div className="col-span-3 text-center py-12">
            <p className="text-muted-foreground">No images available. Add your first gallery image.</p>
            <Button asChild className="mt-4">
              <Link href="/admin/gallery/new">
                <Plus className="mr-2 h-4 w-4" />
                Add New Image
              </Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

function DeleteImageButton({ id, filename }) {
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this image? This action cannot be undone.")) {
      try {
        const result = await deleteGalleryImageAction(id, filename);
        if (result.success) {
          window.location.reload();
        } else {
          alert("Failed to delete image: " + result.error);
        }
      } catch (error) {
        console.error("Error deleting image:", error);
        alert("An error occurred while deleting the image.");
      }
    }
  };

  return (
    <Button variant="destructive" size="icon" onClick={handleDelete}>
      <Trash2 className="h-4 w-4" />
      <span className="sr-only">Delete</span>
    </Button>
  );
}
