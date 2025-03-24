import nodemailer from "nodemailer"
import type { Appointment } from "./models"
import { format, parseISO } from "date-fns"

// Create a transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function sendAppointmentConfirmation(appointment: Appointment) {
  const { patientName, email, service, date, time } = appointment

  const formattedDate = format(parseISO(date), "MMMM d, yyyy")

  const mailOptions = {
    from: `"JD Dental Clinic" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "Appointment Confirmation",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0284c7;">Appointment Confirmation</h2>
        <p>Dear ${patientName},</p>
        <p>Your appointment has been confirmed for:</p>
        <div style="background-color: #f0f9ff; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Time:</strong> ${time}</p>
        </div>
        <p>If you need to reschedule or cancel, please contact us at least 24 hours in advance.</p>
        <p>Thank you for choosing JD Dental Clinic.</p>
      </div>
    `,
  }

  return transporter.sendMail(mailOptions)
}

export async function sendAppointmentReminder(appointment: Appointment) {
  const { patientName, email, service, date, time } = appointment

  const formattedDate = format(parseISO(date), "MMMM d, yyyy")

  const mailOptions = {
    from: `"JD Dental Clinic" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "Appointment Reminder",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0284c7;">Appointment Reminder</h2>
        <p>Dear ${patientName},</p>
        <p>This is a friendly reminder about your upcoming appointment:</p>
        <div style="background-color: #f0f9ff; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Time:</strong> ${time}</p>
        </div>
        <p>If you need to reschedule or cancel, please contact us as soon as possible.</p>
        <p>We look forward to seeing you!</p>
      </div>
    `,
  }

  return transporter.sendMail(mailOptions)
}

