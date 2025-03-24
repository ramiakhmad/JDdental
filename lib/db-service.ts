"server-only";
import clientPromise from "./mongodb"
import type { Appointment, Patient } from "./models"
import { ObjectId } from "mongodb"

// Mark this module as server-only to prevent it from being imported in client components


// Database and collection names
const DB_NAME = "jd-dental-clinic"
const COLLECTIONS = {
  APPOINTMENTS: "appointments",
  PATIENTS: "patients",
  SERVICES: "services",
  TESTIMONIALS: "testimonials",
}

// Get MongoDB client
export async function getMongoClient() {
  const client = await clientPromise
  return client
}

// Get database
export async function getDb() {
  const client = await getMongoClient()
  return client.db(DB_NAME)
}

// Appointments
export async function getAppointments() {
  const db = await getDb()
  return db.collection(COLLECTIONS.APPOINTMENTS).find({}).sort({ date: 1, time: 1 }).toArray()
}

export async function getAppointmentById(id: string) {
  const db = await getDb()
  return db.collection(COLLECTIONS.APPOINTMENTS).findOne({ _id: new ObjectId(id) })
}

export async function getAppointmentsByDate(date: string) {
  const db = await getDb()
  return db.collection(COLLECTIONS.APPOINTMENTS).find({ date }).sort({ time: 1 }).toArray()
}

export async function getAppointmentsByStatus(status: string) {
  const db = await getDb()
  return db.collection(COLLECTIONS.APPOINTMENTS).find({ status }).sort({ date: 1, time: 1 }).toArray()
}

export async function createAppointment(appointment: Appointment) {
  const db = await getDb()
  const now = new Date()
  const newAppointment = {
    ...appointment,
    createdAt: now,
    updatedAt: now,
  }
  const result = await db.collection(COLLECTIONS.APPOINTMENTS).insertOne(newAppointment)
  return { ...newAppointment, _id: result.insertedId }
}

export async function updateAppointment(id: string, appointment: Partial<Appointment>) {
  const db = await getDb()
  const updatedAppointment = {
    ...appointment,
    updatedAt: new Date(),
  }
  await db.collection(COLLECTIONS.APPOINTMENTS).updateOne({ _id: new ObjectId(id) }, { $set: updatedAppointment })
  return getAppointmentById(id)
}

export async function deleteAppointment(id: string) {
  const db = await getDb()
  return db.collection(COLLECTIONS.APPOINTMENTS).deleteOne({ _id: new ObjectId(id) })
}

// Patients
export async function getPatients() {
  const db = await getDb()
  return db.collection(COLLECTIONS.PATIENTS).find({}).sort({ name: 1 }).toArray()
}

export async function getPatientById(id: string) {
  const db = await getDb()
  return db.collection(COLLECTIONS.PATIENTS).findOne({ _id: new ObjectId(id) })
}

export async function createPatient(patient: Patient) {
  const db = await getDb()
  const now = new Date()
  const newPatient = {
    ...patient,
    createdAt: now,
    updatedAt: now,
  }
  const result = await db.collection(COLLECTIONS.PATIENTS).insertOne(newPatient)
  return { ...newPatient, _id: result.insertedId }
}

// Services
export async function getServices() {
  const db = await getDb()
  return db.collection(COLLECTIONS.SERVICES).find({}).toArray()
}

// Testimonials
export async function getTestimonials() {
  const db = await getDb()
  return db.collection(COLLECTIONS.TESTIMONIALS).find({}).toArray()
}

// Define GalleryImage and User types
interface GalleryImage {
  _id?: ObjectId
  featured: boolean
  category: string
  createdAt?: Date
  updatedAt?: Date
  url: string
}

interface User {
  _id?: ObjectId
  name: string
  email: string
  password?: string
  createdAt?: Date
  updatedAt?: Date
}

// Gallery Images
export async function getGalleryImages() {
  const db = await getDb()
  return db.collection("gallery").find({}).sort({ createdAt: -1 }).toArray()
}

export async function getFeaturedGalleryImages() {
  const db = await getDb()
  return db.collection("gallery").find({ featured: true }).sort({ createdAt: -1 }).toArray()
}

export async function getGalleryImagesByCategory(category: string) {
  const db = await getDb()
  return db.collection("gallery").find({ category }).sort({ createdAt: -1 }).toArray()
}

export async function getGalleryImageById(id: string) {
  const db = await getDb()
  return db.collection("gallery").findOne({ _id: new ObjectId(id) })
}

export async function createGalleryImage(image: GalleryImage) {
  const db = await getDb()
  const now = new Date()
  const newImage = {
    ...image,
    createdAt: now,
    updatedAt: now,
  }
  const result = await db.collection("gallery").insertOne(newImage)
  return { ...newImage, _id: result.insertedId }
}

export async function updateGalleryImage(id: string, image: Partial<GalleryImage>) {
  const db = await getDb()
  const updatedImage = {
    ...image,
    updatedAt: new Date(),
  }
  await db.collection("gallery").updateOne({ _id: new ObjectId(id) }, { $set: updatedImage })
  return getGalleryImageById(id)
}

export async function deleteGalleryImage(id: string) {
  const db = await getDb()
  return db.collection("gallery").deleteOne({ _id: new ObjectId(id) })
}

// Users
export async function getUserByEmail(email: string) {
  const db = await getDb()
  return db.collection("users").findOne({ email })
}

export async function createUser(user: User) {
  const db = await getDb()
  const now = new Date()
  const newUser = {
    ...user,
    createdAt: now,
    updatedAt: now,
  }
  const result = await db.collection("users").insertOne(newUser)
  return { ...newUser, _id: result.insertedId }
}

export async function updateUser(id: string, user: Partial<User>) {
  const db = await getDb()
  const updatedUser = {
    ...user,
    updatedAt: new Date(),
  }
  await db.collection("users").updateOne({ _id: new ObjectId(id) }, { $set: updatedUser })
  return getUserById(id)
}

export async function getUserById(id: string) {
  const db = await getDb()
  return db.collection("users").findOne({ _id: new ObjectId(id) })
}

export async function getUsers() {
  const db = await getDb()
  return db.collection("users").find({}).sort({ name: 1 }).toArray()
}

