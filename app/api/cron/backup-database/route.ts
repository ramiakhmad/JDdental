import { NextResponse } from "next/server"
import { getMongoClient } from "@/lib/mongodb"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { format } from "date-fns"

// This endpoint will be called by a cron job
export async function GET() {
  try {
    // Get MongoDB data
    const client = await getMongoClient()
    const db = client.db("jd-dental-clinic")

    // Get all collections
    const collections = await db.listCollections().toArray()
    const backup = {}

    for (const collection of collections) {
      const collectionName = collection.name
      const data = await db.collection(collectionName).find({}).toArray()
      backup[collectionName] = data
    }

    // Upload to S3
    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    })

    const date = format(new Date(), "yyyy-MM-dd-HH-mm-ss")
    const fileName = `backup-${date}.json`

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: JSON.stringify(backup),
        ContentType: "application/json",
      }),
    )

    return NextResponse.json({
      success: true,
      message: `Backup created: ${fileName}`,
    })
  } catch (error) {
    console.error("Error creating backup:", error)
    return NextResponse.json({ success: false, error: "Failed to create backup" }, { status: 500 })
  }
}

