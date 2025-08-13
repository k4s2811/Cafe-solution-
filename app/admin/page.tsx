"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, Calendar, User, Building, MessageSquare, RefreshCw } from "lucide-react"
import { useState, useEffect } from "react"

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

const statusColors = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
  closed: "bg-slate-100 text-slate-800",
}

const statusLabels = {
  new: "New",
  contacted: "Contacted",
  "in-progress": "In Progress",
  completed: "Completed",
  closed: "Closed",
}

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [filter, setFilter] = useState<string>("all")

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/leads")
      const result = await response.json()

      if (result.success) {
        setLeads(result.data)
      } else {
        setError("Failed to load leads")
      }
    } catch (err) {
      setError("Network error")
    } finally {
      setLoading(false)
    }
  }

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const response = await fetch("/api/leads", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      })

      const result = await response.json()

      if (result.success) {
        setLeads((prev) =>
          prev.map((lead) =>
            lead.id === leadId
              ? { ...lead, status: newStatus as Lead["status"], updatedAt: new Date().toISOString() }
              : lead,
          ),
        )
      } else {
        alert("Failed to update lead status")
      }
    } catch (err) {
      alert("Network error")
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const filteredLeads = filter === "all" ? leads : leads.filter((lead) => lead.status === filter)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading leads...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-slate-900">CafeSolutions Admin</h1>
            </div>
            <Button onClick={fetchLeads} variant="outline" className="flex items-center gap-2 bg-transparent">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Leads</p>
                  <p className="text-2xl font-bold text-slate-900">{leads.length}</p>
                </div>
                <User className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">New Leads</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {leads.filter((lead) => lead.status === "new").length}
                  </p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">New</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">In Progress</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {leads.filter((lead) => lead.status === "in-progress").length}
                  </p>
                </div>
                <Badge className="bg-purple-100 text-purple-800">Active</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Completed</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {leads.filter((lead) => lead.status === "completed").length}
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800">Done</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter and Leads List */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Lead Management</CardTitle>
                <CardDescription>Manage and track all incoming leads</CardDescription>
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Leads</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">{error}</div>}

            <div className="space-y-4">
              {filteredLeads.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  {filter === "all" ? "No leads found" : `No ${filter} leads found`}
                </div>
              ) : (
                filteredLeads.map((lead) => (
                  <Card key={lead.id} className="border border-slate-200">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-slate-900">{lead.name}</h3>
                            <Badge className={statusColors[lead.status]}>{statusLabels[lead.status]}</Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                              <Building className="w-4 h-4" />
                              <span>{lead.businessName}</span>
                              {lead.businessType && (
                                <Badge variant="outline" className="text-xs">
                                  {lead.businessType.replace("-", " ")}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(lead.createdAt)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {lead.preferredContact === "phone" ? (
                                <Phone className="w-4 h-4" />
                              ) : (
                                <Mail className="w-4 h-4" />
                              )}
                              <span>{lead.preferredContact === "phone" ? lead.phone : lead.email}</span>
                            </div>
                            {lead.templateName && (
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Template:</span>
                                <span>{lead.templateName}</span>
                                {lead.selectionType && (
                                  <Badge variant="outline" className="text-xs">
                                    {lead.selectionType}
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                          {lead.message && (
                            <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                              <div className="flex items-start gap-2">
                                <MessageSquare className="w-4 h-4 text-slate-500 mt-0.5" />
                                <p className="text-sm text-slate-700">{lead.message}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <Select value={lead.status} onValueChange={(value) => updateLeadStatus(lead.id, value)}>
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="contacted">Contacted</SelectItem>
                              <SelectItem value="in-progress">In Progress</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="closed">Closed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
