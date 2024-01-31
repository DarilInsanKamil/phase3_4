import { db } from "./db"
import { tweetSchema } from "./schema";
import { cache } from 'react'
export const dynamic = "force-dynamic";
export const useFetchAllTweet = cache(async () => {
    console.log('Fetching data...'); // Tambahkan log
    const response = await db.tweet.findMany({
        include: {
            user: true,
            Like: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    // const parseData = tweetSchema.parse(response)
    return response;
})
