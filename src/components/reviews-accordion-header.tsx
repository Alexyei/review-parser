import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { MessageSquare, ThumbsUp, ThumbsDown, Star } from 'lucide-react'
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ProductData, SortMode } from '@/types/main';

export default function ReviewsAccordeonHeader({productData,sortBy,setSortBy}:{productData:ProductData,sortBy:SortMode,setSortBy:(sort:SortMode)=>void}&React.ComponentProps<"div">) {
  return (
    <Card className="py-0 gap-0">
    <CardHeader className="pb-2 pt-4 px-4">
      <div className="flex justify-between items-start">
        <CardTitle className="text-2xl leading-none">{productData.name}</CardTitle>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="highest">Highest Rating</SelectItem>
            <SelectItem value="lowest">Lowest Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </CardHeader>
    <CardContent className="pt-0 px-4 pb-4">
      <p className="text-sm text-muted-foreground flex items-center flex-wrap gap-x-4 gap-y-1">
        <span className="flex items-center">
          <MessageSquare className="h-4 w-4 mr-1" />
          {productData.totalReviews} reviews
        </span>
        <span className="flex items-center">
          <ThumbsUp className="h-4 w-4 mr-1" />
          {productData.positiveReviews} positive
        </span>
        <span className="flex items-center">
          <ThumbsDown className="h-4 w-4 mr-1" />
          {productData.negativeReviews} negative
        </span>
        <span className="flex items-center">
          <Star className="h-4 w-4 mr-1 fill-amber-400 stroke-amber-400" />
          {productData.averageScore.toFixed(1)}/5
        </span>
      </p>
    </CardContent>
  </Card>
  )
}
