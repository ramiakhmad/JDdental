import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">About JD Dental Clinic</h1>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Providing exceptional dental care with a gentle touch since 2005
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">Our Story</h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  JD Dental Clinic was founded in 2005 by Dr. James Davis with a vision to provide comprehensive dental
                  care in a comfortable, patient-centered environment. What started as a small practice has grown into a
                  trusted dental clinic serving thousands of patients in our community.
                </p>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our mission is to improve the oral health of our patients through preventive care, education, and
                  personalized treatment plans. We believe that a healthy smile contributes to overall well-being and
                  quality of life.
                </p>
              </div>
            </div>
            <div className="mx-auto lg:ml-auto">
              <Image
                src="/placeholder.svg?height=550&width=550"
                alt="Dental clinic building"
                width={550}
                height={550}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">Meet Our Team</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our experienced team of dental professionals is dedicated to providing you with the highest quality care
              </p>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <Card key={member.name} className="overflow-hidden">
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
                  <p className="text-sm text-gray-500">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">Our Values</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The principles that guide our practice and patient care
              </p>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} className="flex flex-col h-full">
                <CardHeader>
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Image
                        src={`/placeholder.svg?height=30&width=30&text=${value.title.charAt(0)}`}
                        alt={value.title}
                        width={30}
                        height={30}
                      />
                    </div>
                  </div>
                  <CardTitle className="text-center">{value.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 text-center">
                  <p className="text-sm text-gray-500">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
                Ready to Experience Our Care?
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Schedule your appointment today and discover the difference at JD Dental Clinic
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/book-appointment">Book Appointment</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const team = [
  {
    name: "Dr. James Davis",
    role: "Founder & Lead Dentist",
    bio: "Dr. Davis has over 20 years of experience in dentistry. He specializes in cosmetic dentistry and is passionate about helping patients achieve their perfect smile.",
  },
  {
    name: "Dr. Sarah Johnson",
    role: "Orthodontist",
    bio: "Dr. Johnson is our orthodontics specialist with expertise in both traditional braces and clear aligners. She loves seeing the transformation in her patients' smiles.",
  },
  {
    name: "Dr. Michael Chen",
    role: "Pediatric Dentist",
    bio: "Dr. Chen specializes in pediatric dentistry and has a gift for making children feel comfortable during their dental visits. He believes in establishing good oral health habits early.",
  },
  {
    name: "Emily Wilson",
    role: "Dental Hygienist",
    bio: "Emily has been with our clinic for 10 years. She is known for her gentle touch and thorough cleanings. She is dedicated to preventive care and patient education.",
  },
  {
    name: "Robert Thompson",
    role: "Office Manager",
    bio: "Robert ensures that our clinic runs smoothly. He handles scheduling, insurance, and makes sure that every patient has a positive experience from start to finish.",
  },
  {
    name: "Lisa Garcia",
    role: "Dental Assistant",
    bio: "Lisa assists our dentists during procedures and helps patients feel at ease. Her friendly demeanor and attention to detail make her an invaluable member of our team.",
  },
]

const values = [
  {
    title: "Excellence",
    description:
      "We strive for excellence in every aspect of our practice, from the quality of our dental care to the cleanliness of our facility.",
  },
  {
    title: "Compassion",
    description:
      "We understand that dental visits can be stressful for some patients. We approach every patient with empathy and compassion.",
  },
  {
    title: "Integrity",
    description:
      "We believe in honest communication and transparent pricing. We will always recommend what's best for your oral health.",
  },
  {
    title: "Innovation",
    description:
      "We stay current with the latest advancements in dental technology and techniques to provide the best possible care.",
  },
]

