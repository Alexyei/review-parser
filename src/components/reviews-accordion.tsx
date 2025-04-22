import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FileText, Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Review } from "@/types/main";
import { formatDate } from "@/lib/utils";

export default function ReviewsAccordeon({sortedReviews}:{sortedReviews:Review[]}&React.ComponentProps<"div">) {
  return (
    <Card className="py-0 gap-0">
      <CardContent className="p-4">
        <Accordion type="single" collapsible className="w-full">
          {sortedReviews.map((review) => (
            <AccordionItem key={review.id} value={review.id}>
              <AccordionTrigger className="py-3">
                <div className="flex flex-col items-start text-left w-full pr-4">
                  <div className="flex items-center gap-2 font-medium">
                    <FileText className="h-4 w-4" />
                    <span>{review.id}</span>
                    <span>•</span>
                    <span>{review.userName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1 flex-wrap">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < review.rating
                              ? "fill-amber-400 stroke-amber-400"
                              : "fill-muted stroke-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span>•</span>
                    <span>{review.title}</span>
                    <span>•</span>
                    <span>{formatDate(review.date)}</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3 pt-1">
                {review.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
