import { db } from "./db"
import { tweetSchema } from "./schema";
export const dynamic = "force-dynamic";

export const FetchAllTweet = async () => {
    console.log('Fetching data...'); // Tambahkan log
    const response = await db.tweet.findMany({
        include: {
            user: true,
            Like: true,
            Comment: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    // const parseData = tweetSchema.parse(response)
    return response;
}
