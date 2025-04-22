"use client"

import { useMemo, useState } from "react"
import { AlertCircle, FileText, MessageSquare, Search, Star,ThumbsDown, ThumbsUp } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ModeToggle } from "./components/mode-toggle"
import { SortMode } from "./types/main"
import ReviewsAccordeonHeader from "./components/reviews-accordion-header"
import ReviewsAccordeon from "./components/reviews-accordion"


interface Review {
  id: string
  userName: string
  rating: number
  title: string
  content: string
  date: string
}

interface ProductData {
  name: string
  totalReviews: number
  positiveReviews: number
  negativeReviews: number
  averageScore: number
  reviews: Review[]
}



function App() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [productData, setProductData] = useState<ProductData | null>(null)
  const [sortBy, setSortBy] = useState<SortMode>("newest")
 

  const handleParse = async () => {
    if (!url) return

    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // This is mock data - in a real app, you would fetch this from your API
      if (url.includes("error")) {
        throw new Error("Failed to parse reviews from the provided URL")
      }

      const mockData: ProductData = {
        name: "Premium Wireless Headphones",
        totalReviews: 124,
        positiveReviews: 98,
        negativeReviews: 26,
        averageScore: 4.2,
        reviews: [
          {
            id: "rev-001",
            userName: "John Doe",
            rating: 5,
            title: "Amazing sound quality!",
            content:
              "I've been using these headphones for a month now and I'm extremely impressed with the sound quality. The bass is deep and the highs are crisp. Battery life is also excellent, lasting me about 30 hours on a single charge.",
            date: "2023-04-15",
          },
          {
            id: "rev-002",
            userName: "Jane Smith",
            rating: 4,
            title: "Great but a bit heavy",
            content:
              "The sound quality is fantastic and noise cancellation works well. My only complaint is that they get a bit uncomfortable after wearing them for several hours. They're slightly heavier than my previous headphones.",
            date: "2023-03-22",
          },
          {
            id: "rev-003",
            userName: "Mike Johnson",
            rating: 2,
            title: "Connection issues",
            content:
              "While the sound is good when they work, I've been having constant Bluetooth connection issues. They disconnect randomly and I have to repair them frequently. Not what I expected for this price point.",
            date: "2023-02-10",
          },
        ],
      }

      setProductData(mockData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const sortedReviews = useMemo(() => {
    if (!productData) return []

    return [...productData.reviews].sort((a, b) => {
      if (sortBy === "highest") return b.rating - a.rating
      if (sortBy === "lowest") return a.rating - b.rating
      if (sortBy === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime()
      if (sortBy === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime()
      return 0
    })
  },[productData,sortBy]);



  return (
    <div className="min-h-screen py-8 bg-background">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="flex justify-between items-top mb-6">
          <h1 className="text-2xl font-bold mr-4">Парсер комментариев и отзывов</h1>
          <ModeToggle/>
        </div>

        <div className="flex gap-4 mb-4">
          <Input
            placeholder="Enter product page URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleParse} disabled={isLoading || !url}>
            {isLoading ? "Parsing..." : "Parse"}
            {!isLoading && <Search className="ml-2 h-4 w-4" />}
          </Button>
        </div>

        {isLoading && (
          <div className="space-y-4">
            <Skeleton className="w-full h-[120px] rounded-lg" />
            <Skeleton className="w-full h-[300px] rounded-lg" />
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {productData && !isLoading && !error && (
          <div className="space-y-4">
            <ReviewsAccordeonHeader productData={productData} setSortBy={setSortBy} sortBy={sortBy}/>

            <ReviewsAccordeon sortedReviews={sortedReviews}/>
          </div>
        )}
      </div>
    </div>
  )
}

export default App;
