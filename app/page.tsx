import Link from "next/link"
import Image from "next/image"
import { CalendarClock, Phone, MapPin, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getServices, getTestimonials } from "@/lib/db-service"
import { seedServices, seedTestimonials } from "@/lib/seed-data"

export default async function Home() {
  // Seed data if needed
  await seedServices()
  await seedTestimonials()

  // Fetch data from database
  const services = await getServices()
  const testimonials = await getTestimonials()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
                  JD Dental Clinic
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Professional dental care for your entire family. We provide comprehensive dental services with a
                  gentle touch.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/book-appointment">Book Appointment</Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link href="/services">Our Services</Link>
                </Button>
              </div>
            </div>
            <div className="mx-auto lg:ml-auto">
              <Image
                src="/placeholder.svg?height=550&width=550"
                alt="Dental clinic"
                width={550}
                height={550}
                className="rounded-lg object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Our Services</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We offer a wide range of dental services to meet all your oral health needs
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {services.slice(0, 6).map((service) => (
              <Card key={service.title} className="flex flex-col h-full">
                <CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-gray-500">{service.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="gap-1" asChild>
                    <Link href="/services">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button asChild variant="outline">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                What Our Patients Say
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Don't just take our word for it. Here's what our patients have to say.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="flex flex-col h-full">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src={`/placeholder.svg?height=50&width=50&text=${testimonial.name.charAt(0)}`}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-gray-500 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Contact Us</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We're here to help with all your dental needs. Reach out to us today.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-gray-500">(123) 456-7890</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-gray-500">123 Dental Street, City, State 12345</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-5 w-5 text-primary" />
                  <span className="text-gray-500">Mon-Fri: 9am-5pm, Sat: 9am-2pm</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/book-appointment">Book Appointment</Link>
                </Button>
              </div>
            </div>
            <div className="mx-auto lg:ml-auto">
              <Image
                src="/placeholder.svg?height=550&width=550"
                alt="Dental office"
                width={550}
                height={550}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

