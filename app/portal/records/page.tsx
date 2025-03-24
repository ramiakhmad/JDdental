import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format, parseISO } from "date-fns"
import { FileText, Download, Eye } from "lucide-react"

export default function PatientRecordsPage() {
  // In a real application, this would come from the database based on the logged-in user
  const records = [
    {
      id: "1",
      type: "Examination",
      date: "2024-12-10",
      dentist: "Dr. James Davis",
      notes: "Regular check-up, no issues found.",
    },
    {
      id: "2",
      type: "X-Ray",
      date: "2024-12-10",
      dentist: "Dr. James Davis",
      notes: "Full mouth X-rays taken.",
    },
    {
      id: "3",
      type: "Treatment",
      date: "2024-10-05",
      dentist: "Dr. Sarah Johnson",
      notes: "Filling on lower right molar.",
    },
    {
      id: "4",
      type: "Examination",
      date: "2024-06-15",
      dentist: "Dr. James Davis",
      notes: "Regular check-up, recommended improved flossing.",
    },
    {
      id: "5",
      type: "Cleaning",
      date: "2024-06-15",
      dentist: "Emily Wilson",
      notes: "Professional cleaning performed.",
    },
  ]

  // Filter records by type
  const examinations = records.filter((r) => r.type === "Examination")
  const treatments = records.filter((r) => r.type === "Treatment")
  const xrays = records.filter((r) => r.type === "X-Ray")
  const cleanings = records.filter((r) => r.type === "Cleaning")

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dental Records</h1>
          <p className="text-muted-foreground">View your complete dental history</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/portal/records/request">Request Records</Link>
        </Button>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Medical Records</CardTitle>
          <CardDescription>Your complete dental history and documentation</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Records</TabsTrigger>
              <TabsTrigger value="examinations">Examinations</TabsTrigger>
              <TabsTrigger value="treatments">Treatments</TabsTrigger>
              <TabsTrigger value="xrays">X-Rays</TabsTrigger>
              <TabsTrigger value="cleanings">Cleanings</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Dentist</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {records.length > 0 ? (
                      records.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              {record.type}
                            </div>
                          </TableCell>
                          <TableCell>{format(parseISO(record.date), "MMM d, yyyy")}</TableCell>
                          <TableCell>{record.dentist}</TableCell>
                          <TableCell className="max-w-xs truncate">{record.notes}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" asChild>
                                <Link href={`/portal/records/${record.id}`}>
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">View</span>
                                </Link>
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                          No records found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Similar structure for other tabs */}
          </Tabs>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Treatment History</CardTitle>
          <CardDescription>Summary of your dental treatments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-medium">Fillings</h3>
              <p className="text-sm text-muted-foreground mt-1">Lower right molar (October 5, 2024)</p>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-medium">Cleanings</h3>
              <p className="text-sm text-muted-foreground mt-1">Professional cleaning (June 15, 2024)</p>
            </div>
            <div>
              <h3 className="font-medium">X-Rays</h3>
              <p className="text-sm text-muted-foreground mt-1">Full mouth X-rays (December 10, 2024)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

