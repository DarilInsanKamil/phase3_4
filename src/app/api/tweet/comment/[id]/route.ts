import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { z } from "zod"

const commentSchema = z.object({
    tweetId: z.number(),
    userId: z.number(),
    commentTweet: z.string().min(1).max(300)
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { tweetId, userId, commentTweet } = commentSchema.parse(body)

        const getUserId = await db.user.findUnique({
            where: { userId: userId },
        });

        if (!getUserId) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }
        const getTweetId = await db.tweet.findFirst({
            where: { tweetId: tweetId },
        });

        if (!getTweetId) {
            return NextResponse.json({ message: "Tweet not found" }, { status: 404 })
        }

        const createComment = await db.comment.create({
            data: {
                userId,
                tweetId,
                commentTweet
            }
        })

        return NextResponse.json({ message: `${createComment} Success` }, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: `Can't create comment` }, { status: 500 })
    }
}