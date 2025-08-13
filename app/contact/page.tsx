"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Phone, Mail, MessageSquare, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

const templates = {
  1: { name: "Artisan Coffee", category: "Modern" },
  2: { name: "Rustic Bistro", category: "Classic" },
  3: { name: "Urban Eatery", category: "Contemporary" },
  4: { name: "Garden Cafe", category: "Organic" },
  5: { name: "Night Lounge", category: "Elegant" },
  6: { name: "Breakfast Corner", category: "Cheerful" },
}

export default function ContactPage() {
  const searchParams = useSearchParams()
  const templateId = searchParams.get("template")
  const selectionType = searchParams.get("type")

  const selectedTemplate = templateId ? templates[Number.parseInt(templateId) as keyof typeof templates] : null

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: "",
    message: "",
    preferredContact: "phone",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          templateId,
          selectionType,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus("success")
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          businessName: "",
          businessType: "",
          message: "",
          preferredContact: "phone",
        })
      } else {
        setSubmitStatus("error")
        setErrorMessage(result.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Show success message
  if (submitStatus === "success") {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Templates
                </Link>
              </div>
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-slate-900">CafeSolutions</h1>
              </div>
              <div className="w-32"></div>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Thank You!</h2>
            <p className="text-lg text-slate-600 mb-6">
              We've received your request and will contact you within 24 hours.
            </p>
            {selectedTemplate && (
              <div className="bg-slate-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-slate-600">
                  Selected template: <strong>{selectedTemplate.name}</strong>
                  {selectionType && (
                    <span className="ml-2">
                      ({selectionType === "exact" ? "Exact template" : "Custom modifications"})
                    </span>
                  )}
                </p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="bg-blue-600 hover:bg-blue-700">Browse More Templates</Button>
              </Link>
              <Button variant="outline" onClick={() => setSubmitStatus("idle")}>
                Submit Another Request
              </Button>
            </div>
          </div>
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
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
                <ArrowLeft className="w-4 h-4" />
                Back to Templates
              </Link>
            </div>
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-slate-900">CafeSolutions</h1>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-2xl">Let's Build Your Website</CardTitle>
                <CardDescription>
                  {selectedTemplate ? (
                    <>
                      You've selected <strong>{selectedTemplate.name}</strong> to{" "}
                      {selectionType === "exact" ? "use exactly as shown" : "customize for your brand"}. Tell us about
                      your business so we can help you get started.
                    </>
                  ) : (
                    "Tell us about your business and we'll help you choose the perfect template."
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-900">Error</h4>
                      <p className="text-red-800">{errorMessage}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        disabled={isSubmitting}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        disabled={isSubmitting}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="mt-1"
                    />
                  </div>

                  {/* Business Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input
                        id="businessName"
                        value={formData.businessName}
                        onChange={(e) => handleInputChange("businessName", e.target.value)}
                        required
                        disabled={isSubmitting}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="businessType">Business Type</Label>
                      <Select
                        onValueChange={(value) => handleInputChange("businessType", value)}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="coffee-shop">Coffee Shop</SelectItem>
                          <SelectItem value="restaurant">Restaurant</SelectItem>
                          <SelectItem value="bistro">Bistro</SelectItem>
                          <SelectItem value="bakery">Bakery</SelectItem>
                          <SelectItem value="bar">Bar/Lounge</SelectItem>
                          <SelectItem value="food-truck">Food Truck</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Preferred Contact Method */}
                  <div>
                    <Label>Preferred Contact Method *</Label>
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="phone"
                          checked={formData.preferredContact === "phone"}
                          onChange={(e) => handleInputChange("preferredContact", e.target.value)}
                          disabled={isSubmitting}
                          className="text-blue-600"
                        />
                        <Phone className="w-4 h-4" />
                        Phone Call
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="email"
                          checked={formData.preferredContact === "email"}
                          onChange={(e) => handleInputChange("preferredContact", e.target.value)}
                          disabled={isSubmitting}
                          className="text-blue-600"
                        />
                        <Mail className="w-4 h-4" />
                        Email
                      </label>
                    </div>
                  </div>

                  {/* Additional Message */}
                  <div>
                    <Label htmlFor="message">Tell us about your vision (optional)</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Any specific requirements, features you need, or questions you have..."
                      disabled={isSubmitting}
                      className="mt-1"
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Summary Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-4">
              {selectedTemplate && (
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg">Selected Template</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="font-semibold">{selectedTemplate.name}</p>
                      <p className="text-sm text-slate-600">{selectedTemplate.category} style</p>
                      <p className="text-sm text-slate-600">
                        {selectionType === "exact" ? "Using exact template" : "Custom modifications"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• We'll review your request</li>
                        <li>• Contact you within 24 hours</li>
                        <li>• Discuss your specific needs</li>
                        <li>• Provide timeline and pricing</li>
                        <li>• Start building your website</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-50 border-slate-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-slate-900 mb-2">Need help choosing?</h4>
                  <p className="text-sm text-slate-600 mb-3">
                    Not sure which template is right for you? Our team can help you decide.
                  </p>
                  <Button variant="outline" className="w-full text-sm bg-transparent">
                    Schedule a Consultation
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
