import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Heart, Star } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock template data
const templates = [
  {
    id: 1,
    name: "Artisan Coffee",
    description: "Modern minimalist design perfect for specialty coffee shops",
    image: "/modern-coffee-shop-website.png",
    category: "Modern",
    price: "Free",
    rating: 4.8,
    views: 1240,
    likes: 89,
  },
  {
    id: 2,
    name: "Rustic Bistro",
    description: "Warm, cozy design ideal for family-owned restaurants",
    image: "/rustic-bistro-template.png",
    category: "Classic",
    price: "Premium",
    rating: 4.9,
    views: 980,
    likes: 156,
  },
  {
    id: 3,
    name: "Urban Eatery",
    description: "Bold, contemporary layout for trendy urban cafes",
    image: "/urban-modern-restaurant-website-template.png",
    category: "Contemporary",
    price: "Free",
    rating: 4.7,
    views: 2100,
    likes: 203,
  },
  {
    id: 4,
    name: "Garden Cafe",
    description: "Fresh, organic-inspired design for health-conscious venues",
    image: "/organic-garden-cafe-template.png",
    category: "Organic",
    price: "Premium",
    rating: 4.6,
    views: 756,
    likes: 67,
  },
  {
    id: 5,
    name: "Night Lounge",
    description: "Sophisticated dark theme for evening dining establishments",
    image: "/dark-elegant-restaurant-website.png",
    category: "Elegant",
    price: "Premium",
    rating: 4.8,
    views: 1450,
    likes: 134,
  },
  {
    id: 6,
    name: "Breakfast Corner",
    description: "Bright, cheerful design perfect for morning cafes",
    image: "/bright-breakfast-cafe-template.png",
    category: "Cheerful",
    price: "Free",
    rating: 4.5,
    views: 890,
    likes: 78,
  },
]

const categories = ["All", "Modern", "Classic", "Contemporary", "Organic", "Elegant", "Cheerful"]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-serif font-bold text-foreground">CafeSolutions</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#templates" className="text-muted-foreground hover:text-primary font-medium transition-colors">
                Templates
              </a>
              <a href="#about" className="text-muted-foreground hover:text-primary font-medium transition-colors">
                About
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-primary font-medium transition-colors">
                Contact
              </a>
            </nav>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-card py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6">
            Elevate Your Cafe's Online Presence
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover a range of beautifully designed templates tailored for cafes and restaurants. Customize to fit your
            unique style and brand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-3">
              Explore Templates
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-3 bg-transparent"
            >
              Contact Us for More Info
            </Button>
          </div>
        </div>
      </section>

      {/* Template Gallery */}
      <section id="templates" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif font-bold text-foreground mb-4">Choose Your Perfect Template</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our collection of professionally designed templates, each crafted specifically for the food and
              beverage industry.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className={
                  category === "All"
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "border-border text-muted-foreground hover:bg-muted"
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <Card
                key={template.id}
                className="group hover:shadow-lg transition-shadow duration-300 bg-card border-border"
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={template.image || "/placeholder.svg"}
                      alt={template.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge
                        variant={template.price === "Free" ? "secondary" : "default"}
                        className={
                          template.price === "Free"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : "bg-accent text-accent-foreground"
                        }
                      >
                        {template.price}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-background/90 text-foreground border-border">
                        {template.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl font-serif font-bold text-foreground mb-2">{template.name}</CardTitle>
                  <CardDescription className="text-muted-foreground mb-4">{template.description}</CardDescription>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{template.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{template.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{template.likes}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex gap-2">
                  <Link href={`/template/${template.id}`} className="flex-1">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Use This Template
                    </Button>
                  </Link>
                  <Link href={`/template/${template.id}`}>
                    <Button
                      variant="outline"
                      className="border-border text-muted-foreground hover:bg-muted bg-transparent"
                    >
                      Preview
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-serif font-bold text-primary-foreground mb-4">Ready to make your mark?</h3>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Let's build your cafe's online identity together. Get in touch with our team for personalized assistance.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-background text-foreground hover:bg-background/90 text-lg px-8 py-3"
          >
            Contact Us for More Info
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-serif font-bold mb-4 text-foreground">CafeSolutions</h4>
              <p className="text-muted-foreground">
                Empowering cafes and restaurants with beautiful, functional websites.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-foreground">Templates</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Modern
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Classic
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contemporary
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-foreground">Support</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-foreground">Company</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 CafeSolutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
