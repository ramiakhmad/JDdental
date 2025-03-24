"use server"

import { getDb } from "./db-service"
import type { Service, Testimonial } from "./models"

export async function seedServices() {
  const db = await getDb()
  const servicesCollection = db.collection("services")

  // Check if services already exist
  const count = await servicesCollection.countDocuments()
  if (count > 0) {
    console.log("Services already seeded")
    return
  }

  const services: Service[] = [
    {
      title: "General Dentistry",
      description:
        "Our general dentistry services focus on the prevention, diagnosis, and treatment of a wide variety of conditions, disorders, and diseases affecting the teeth, gums, and maxillofacial region of the body.",
      procedures: [
        "Comprehensive dental exams",
        "Professional teeth cleaning",
        "Dental fillings",
        "Root canal therapy",
        "Gum disease treatment",
        "Dental crowns and bridges",
      ],
    },
    {
      title: "Cosmetic Dentistry",
      description:
        "Enhance your smile with our cosmetic dentistry services. We offer a variety of treatments designed to improve the appearance of your teeth and give you the confidence to smile brightly.",
      procedures: [
        "Teeth whitening",
        "Dental veneers",
        "Dental bonding",
        "Smile makeovers",
        "Gum contouring",
        "Tooth-colored fillings",
      ],
    },
    {
      title: "Orthodontics",
      description:
        "Our orthodontic treatments help straighten teeth and correct bite issues, improving both the function and appearance of your smile. We offer options for patients of all ages.",
      procedures: [
        "Traditional braces",
        "Clear aligners",
        "Retainers",
        "Early intervention orthodontics",
        "Adult orthodontics",
        "Orthodontic consultations",
      ],
    },
    {
      title: "Oral Surgery",
      description:
        "Our oral surgery services address more complex dental issues that require surgical intervention. We ensure your comfort throughout any procedure with our gentle approach.",
      procedures: [
        "Tooth extractions",
        "Wisdom teeth removal",
        "Dental implant placement",
        "Bone grafting",
        "Surgical treatment of oral diseases",
        "Corrective jaw surgery",
      ],
    },
    {
      title: "Pediatric Dentistry",
      description:
        "We provide specialized dental care for children in a friendly, comfortable environment. Our goal is to establish good oral health habits early and create positive dental experiences.",
      procedures: [
        "Child-friendly dental exams",
        "Gentle cleanings",
        "Fluoride treatments",
        "Dental sealants",
        "Space maintainers",
        "Early orthodontic assessment",
      ],
    },
    {
      title: "Emergency Care",
      description:
        "Dental emergencies can happen at any time. We offer prompt care for unexpected dental issues to relieve pain and prevent further complications.",
      procedures: [
        "Same-day emergency appointments",
        "Treatment for severe toothaches",
        "Repair of broken or chipped teeth",
        "Treatment for dental infections",
        "Management of dental trauma",
        "Emergency extractions",
      ],
    },
  ]

  await servicesCollection.insertMany(services)
  console.log("Services seeded successfully")
}

export async function seedTestimonials() {
  const db = await getDb()
  const testimonialsCollection = db.collection("testimonials")

  // Check if testimonials already exist
  const count = await testimonialsCollection.countDocuments()
  if (count > 0) {
    console.log("Testimonials already seeded")
    return
  }

  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      role: "Patient for 5 years",
      content: "The team at JD Dental Clinic is amazing! They make every visit comfortable and stress-free.",
    },
    {
      name: "Michael Brown",
      role: "Patient for 3 years",
      content: "Dr. Johnson transformed my smile with veneers. I couldn't be happier with the results!",
    },
    {
      name: "Emily Davis",
      role: "New Patient",
      content: "As someone with dental anxiety, I appreciate how patient and understanding the entire staff is.",
    },
  ]

  await testimonialsCollection.insertMany(testimonials)
  console.log("Testimonials seeded successfully")
}

