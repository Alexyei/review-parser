export interface Review {
    id: string
    userName: string
    rating: number
    title: string
    content: string
    date: string
  }
  
  export interface ProductData {
    name: string
    totalReviews: number
    positiveReviews: number
    negativeReviews: number
    averageScore: number
    reviews: Review[]
  }

  export type SortMode  = "highest" | "lowest" | "newest" | "oldest"
