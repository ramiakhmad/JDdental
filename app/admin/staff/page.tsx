import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"

export default function StaffPage() {
  // In a real application, this would come from the database
  const staff = [
    {
      id: "1",
      name: "Dr. James Davis",
      role: "Founder & Lead Dentist",
      bio: "Dr. Davis has over 20 years of experience in dentistry. He specializes in cosmetic dentistry and is passionate about helping patients achieve their perfect smile.",
      email: "james.davis@jddentalclinic.com",
      phone: "(123) 456-7890",
    },
    {
      id: "2",
      name: "Dr. Sarah Johnson",
      role: "Orthodontist",
      bio: "Dr. Johnson is our orthodontics specialist with expertise in both traditional braces and clear aligners. She loves seeing the transformation in her patients' smiles.",
      email: "sarah.johnson@jddentalclinic.com",
      phone: "(123) 456-7891",
    },
    {
      id: "3",
      name: "Dr. Michael Chen",
      role: "Pediatric Dentist",
      bio: "Dr. Chen specializes in pediatric dentistry and has a gift for making children feel comfortable during their dental visits. He believes in establishing good oral health habits early.",
      email: "michael.chen@jddentalclinic.com",
      phone: "(123) 456-7892",
    },
    {
      id: "4",
      name: "Emily Wilson",
      role: "Dental Hygienist",
      bio: "Emily has been with our clinic for 10 years. She is known for her gentle touch and thorough cleanings. She is dedicated to preventive care and patient education.",
      email: "emily.wilson@jddentalclinic.com",
      phone: "(123) 456-7893",
    },
    {
      id: "5",
      name: "Robert Thompson",
      role: "Office Manager",
      bio: "Robert ensures that our clinic runs smoothly. He handles scheduling, insurance, and makes sure that every patient has a positive experience from start to finish.",
      email: "robert.thompson@jddentalclinic.com",
      phone: "(123) 456-7894",
    },
    {
      id: "6",
      name: "Lisa Garcia",
      role: "Dental Assistant",
      bio: "Lisa assists our dentists during procedures and helps patients feel at ease. Her friendly demeanor and attention to detail make her an invaluable member of our team.",
      email: "lisa.garcia@jddentalclinic.com",
      phone: "(123) 456-7895",
    },
  ]

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Staff</h1>
          <p className="text-muted-foreground">Manage staff members and their information</p>
        </div>
        <Button asChild>
          <Link href="/admin/staff/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Staff Member
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {staff.map((member) => (
          <Card key={member.id} className="overflow-hidden card-hover">
            <div className="aspect-square relative">
              <Image
                src={`/placeholder.svg?height=300&width=300&text=${member.name.charAt(0)}`}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>{member.name}</CardTitle>
              <CardDescription>{member.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-medium">Email:</span> {member.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {member.phone}
                </p>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/staff/${member.id}`}>View Profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

