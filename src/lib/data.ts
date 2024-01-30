import { db } from "./db"
import { tweetSchema } from "./schema";

export const useFetchAllTweet = async () => {
    const response = await db.tweet.findMany({
        include: {
            user: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    const parseData = tweetSchema.parse(response)
    return parseData;
}
