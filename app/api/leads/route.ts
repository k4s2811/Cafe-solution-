import { type NextRequest, NextResponse } from "next/server"

// Lead data interface
interface Lead {
  id: string
  name: string
  email: string
  phone: string
  businessName: string
  businessType: string
  message: string
  preferredContact: "phone" | "email"
  templateId?: string
  selectionType?: "exact" | "custom"
  templateName?: string
  status: "new" | "contacted" | "in-progress" | "completed" | "closed"
  createdAt: string
  updatedAt: string
}

// In-memory storage (in production, this would be a database)
const leads: Lead[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    phone: "+1-555-0123",
    businessName: "Downtown Coffee Co.",
    businessType: "coffee-shop",
    message: "Looking for a modern website with online ordering capabilities.",
    preferredContact: "phone",
    templateId: "1",
    selectionType: "custom",
    templateName: "Artisan Coffee",
    status: "new",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@bistrodelights.com",
    phone: "+1-555-0456",
    businessName: "Bistro Delights",
    businessType: "restaurant",
    message: "Need a website that showcases our family recipes and story.",
    preferredContact: "email",
    templateId: "2",
    selectionType: "exact",
    templateName: "Rustic Bistro",
    status: "contacted",
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-14T16:45:00Z",
  },
]

const templates = {
  1: { name: "Artisan Coffee", category: "Modern" },
  2: { name: "Rustic Bistro", category: "Classic" },
  3: { name: "Urban Eatery", category: "Contemporary" },
  4: { name: "Garden Cafe", category: "Organic" },
  5: { name: "Night Lounge", category: "Elegant" },
  6: { name: "Breakfast Corner", category: "Cheerful" },
}

// GET - Retrieve all leads
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to retrieve leads" }, { status: 500 })
  }
}

// POST - Create new lead
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["name", "email", "phone", "businessName", "preferredContact"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `${field} is required` }, { status: 400 })
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ success: false, error: "Invalid email format" }, { status: 400 })
    }

    // Get template name if templateId is provided
    let templateName = undefined
    if (body.templateId) {
      const template = templates[Number.parseInt(body.templateId) as keyof typeof templates]
      templateName = template?.name
    }

    // Create new lead
    const newLead: Lead = {
      id: Date.now().toString(),
      name: body.name,
      email: body.email,
      phone: body.phone,
      businessName: body.businessName,
      businessType: body.businessType || "",
      message: body.message || "",
      preferredContact: body.preferredContact,
      templateId: body.templateId,
      selectionType: body.selectionType,
      templateName,
      status: "new",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    leads.push(newLead)

    return NextResponse.json(
      {
        success: true,
        data: newLead,
        message: "Lead created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating lead:", error)
    return NextResponse.json({ success: false, error: "Failed to create lead" }, { status: 500 })
  }
}

// PUT - Update lead status
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json({ success: false, error: "ID and status are required" }, { status: 400 })
    }

    const leadIndex = leads.findIndex((lead) => lead.id === id)
    if (leadIndex === -1) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 })
    }

    leads[leadIndex] = {
      ...leads[leadIndex],
      status,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: leads[leadIndex],
      message: "Lead updated successfully",
    })
  } catch (error) {
    console.error("Error updating lead:", error)
    return NextResponse.json({ success: false, error: "Failed to update lead" }, { status: 500 })
  }
}
