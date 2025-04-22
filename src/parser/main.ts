import { ProductData, Review } from "@/types/main"
import * as cheerio from 'cheerio';

export async function handleParse1(url:string,cbs:{
    onError:(message:string)=>void,
    onSuccess:(data:ProductData)=>void
    onStart:()=>void
    onFinish:()=>void
}){
    const {onError,onSuccess,onStart,onFinish} = cbs;
    if (!url) return

    onStart();


    try {
        // let job = fetch(`https://api.github.com/users/${name}`).then(
        //     successResponse => {
        //       if (successResponse.status != 200) {
        //         return null;

        //       } else {
        //         return successResponse.text();
        //       }
        //     },
        //     failResponse => {
        //       return null;
        //     }
        //   ).then(function(responseText) {
        //     if (responseText != null) {
        //       const $ = cheerio.load(responseText);
        //     }
        //   });

        const summaryResponse = await fetch(url,{method:"GET"});
        console.log(summaryResponse);
        if (!summaryResponse.ok) {
          throw new Error("Failed to fetch summary data");
        }
        const summaryData = await summaryResponse.text();
        const $ = cheerio.load(summaryData);
        const productName = $(".fn").text().trim();
        const averageRating = parseFloat($("[itemprop='ratingValue']").text().trim());
        const totalReviews = parseInt($("[itemprop='reviewCount']").text().trim());
        const positiveReviews = parseInt($(".RecommendRating-like span").text().trim());
        const negativeReviews = totalReviews - positiveReviews;

        const pages = Math.floor(totalReviews / 50);

        const reviews =[] as Review[];

        $(".list-comments li").each((_, li) => {
            const author = $(li).find(".author-name").text().trim();
            const rating = $(li).find(".starsRating .on").length;
            const createdAt = $(li).find(".created").text().trim();
            const comments =  parseInt($(li).find(".comments").text().trim()) || 0;
            const title = $(li).find(".reviewTitle").text().trim();
            const link = "https://irecommend.ru"+$(li).find(".reviewTextSnippet").attr("href");

            console.log(author,rating,createdAt,comments,title,link);
          });
      onSuccess({
        name: productName,
        totalReviews,
        positiveReviews,
        negativeReviews,
        averageScore: averageRating,
        reviews})
    } catch (err) {
      onError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      onFinish();
    }
  }