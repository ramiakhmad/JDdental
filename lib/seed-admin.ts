"use server"

import { hash } from "bcrypt"
import { getUserByEmail, createUser } from "./db-service"
import type { User } from "./models"

export async function seedAdminUser() {
  try {
    // Check if admin user already exists
    const existingAdmin = await getUserByEmail("rami.akhmad@gmail.com")

    if (existingAdmin) {
      console.log("Admin user already exists")
      return { success: true, message: "Admin user already exists" }
    }

    // Hash the password
    const hashedPassword = await hash("2D3r4s8U@", 10)

    // Create admin user
    const adminUser: User = {
      name: "Admin User",
      email: "rami.akhmad@gmail.com",
      password: hashedPassword,
      role: "admin",
    }

    await createUser(adminUser)

    console.log("Admin user created successfully")
    return { success: true, message: "Admin user created successfully" }
  } catch (error) {
    console.error("Error seeding admin user:", error)
    return { success: false, error: "Failed to seed admin user" }
  }
}

