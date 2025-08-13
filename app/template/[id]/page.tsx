import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Eye, Heart, Star, Check, Palette, Code } from "lucide-react"
import Link from "next/link"

// Mock template data (in real app, this would come from database)
const templates = {
  1: {
    id: 1,
    name: "Artisan Coffee",
    description: "Modern minimalist design perfect for specialty coffee shops",
    longDescription:
      "This template features a clean, modern aesthetic with plenty of white space and elegant typography. Perfect for specialty coffee shops that want to showcase their artisanal approach and premium products. Includes sections for menu, about, location, and online ordering.",
    image: "/modern-coffee-shop-website.png",
    category: "Modern",
    price: "Free",
    rating: 4.8,
    views: 1240,
    likes: 89,
    features: [
      "Responsive design",
      "Menu showcase",
      "Online ordering integration",
      "Location & hours",
      "Social media integration",
      "Contact forms",
    ],
    colors: ["#2D1B14", "#F5F5DC", "#8B4513", "#FFFFFF"],
    demoUrl: "/demo/artisan-coffee",
  },
  2: {
    id: 2,
    name: "Rustic Bistro",
    description: "Warm, cozy design ideal for family-owned restaurants",
    longDescription:
      "A warm and inviting design that captures the essence of a family-owned bistro. Features rich earth tones, comfortable typography, and layouts that emphasize community and tradition. Perfect for establishments with a story to tell.",
    image: "/rustic-bistro-template.png",
    category: "Classic",
    price: "Premium",
    rating: 4.9,
    views: 980,
    likes: 156,
    features: [
      "Story-focused layout",
      "Family photo galleries",
      "Traditional menu design",
      "Event booking",
      "Customer testimonials",
      "Newsletter signup",
    ],
    colors: ["#8B4513", "#DEB887", "#F4A460", "#FFFFFF"],
    demoUrl: "/demo/rustic-bistro",
  },
}

export default function TemplatePage({ params }: { params: { id: string } }) {
  const template = templates[Number.parseInt(params.id) as keyof typeof templates]

  if (!template) {
    return <div>Template not found</div>
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
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Template Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <div className="aspect-video bg-slate-100 relative">
                <img
                  src={template.image || "/placeholder.svg"}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button className="bg-white text-slate-900 hover:bg-slate-100">
                    <Eye className="w-4 h-4 mr-2" />
                    View Live Demo
                  </Button>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">{template.name}</h1>
                    <p className="text-lg text-slate-600">{template.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={template.price === "Free" ? "secondary" : "default"}
                      className={template.price === "Free" ? "bg-green-100 text-green-800" : "bg-sky-500"}
                    >
                      {template.price}
                    </Badge>
                    <Badge variant="outline" className="bg-white text-slate-700">
                      {template.category}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-6 mb-6 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{template.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{template.views} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{template.likes} likes</span>
                  </div>
                </div>

                <p className="text-slate-700 leading-relaxed mb-6">{template.longDescription}</p>

                {/* Color Palette */}
                <div className="mb-6">
                  <h3 className="font-semibold text-slate-900 mb-3">Color Palette</h3>
                  <div className="flex gap-2">
                    {template.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full border border-slate-200"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Features Included</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {template.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Selection Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-xl">Get Started with {template.name}</CardTitle>
                  <CardDescription>Choose how you'd like to use this template for your cafe</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Use As-Is Option */}
                  <div className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                        <Code className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 mb-1">Use Exact Template</h4>
                        <p className="text-sm text-slate-600 mb-3">
                          Get this template exactly as shown with your content
                        </p>
                        <Link href={`/contact?template=${template.id}&type=exact`}>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700">Use This Template</Button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Customize Option */}
                  <div className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mt-1">
                        <Palette className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 mb-1">Customize Template</h4>
                        <p className="text-sm text-slate-600 mb-3">
                          Modify colors, layout, and features to match your brand
                        </p>
                        <Link href={`/contact?template=${template.id}&type=custom`}>
                          <Button
                            variant="outline"
                            className="w-full border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
                          >
                            Customize Template
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Preview Demo */}
                  <div className="pt-4 border-t border-slate-200">
                    <Button
                      variant="outline"
                      className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Live Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Info */}
              <Card className="bg-slate-50 border-slate-200 mt-4">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-slate-900 mb-2">What happens next?</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Share your contact information</li>
                    <li>• We'll call you within 24 hours</li>
                    <li>• Discuss your specific needs</li>
                    <li>• Get your website built quickly</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
