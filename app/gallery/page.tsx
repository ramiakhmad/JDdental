import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getGalleryImages } from "@/lib/db-service"
import { seedGalleryImages } from "@/lib/seed-gallery"

export default async function GalleryPage() {
  // Seed gallery images if needed
  await seedGalleryImages()

  // Fetch all gallery images
  const images = await getGalleryImages()

  // Group images by category
  const clinicImages = images.filter((img) => img.category === "clinic")
  const procedureImages = images.filter((img) => img.category === "procedures")
  const staffImages = images.filter((img) => img.category === "staff")
  const patientImages = images.filter((img) => img.category === "patients")

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">Photo Gallery</h1>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Take a visual tour of our dental clinic, procedures, staff, and happy patients
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="clinic">Our Clinic</TabsTrigger>
              <TabsTrigger value="procedures">Procedures</TabsTrigger>
              <TabsTrigger value="staff">Our Staff</TabsTrigger>
              <TabsTrigger value="patients">Happy Patients</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image) => (
                  <GalleryCard key={image._id.toString()} image={image} />
                ))}
                {images.length === 0 && (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-muted-foreground">No images available yet.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="clinic">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clinicImages.map((image) => (
                  <GalleryCard key={image._id.toString()} image={image} />
                ))}
                {clinicImages.length === 0 && (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-muted-foreground">No clinic images available yet.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="procedures">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {procedureImages.map((image) => (
                  <GalleryCard key={image._id.toString()} image={image} />
                ))}
                {procedureImages.length === 0 && (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-muted-foreground">No procedure images available yet.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="staff">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {staffImages.map((image) => (
                  <GalleryCard key={image._id.toString()} image={image} />
                ))}
                {staffImages.length === 0 && (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-muted-foreground">No staff images available yet.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="patients">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {patientImages.map((image) => (
                  <GalleryCard key={image._id.toString()} image={image} />
                ))}
                {patientImages.length === 0 && (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-muted-foreground">No patient images available yet.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}

function GalleryCard({ image }) {
  return (
    <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow transition-all hover:shadow-lg">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={image.imageUrl || "/placeholder.svg"}
          alt={image.title}
          fill
          className="object-cover transition-transform hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{image.title}</h3>
        {image.description && <p className="text-sm text-muted-foreground mt-1">{image.description}</p>}
      </div>
    </div>
  )
}

