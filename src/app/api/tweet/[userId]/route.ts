import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { z } from "zod"

const tweetSchema = z.object({
    tweet: z.string().min(1, "tweet is required").max(300)
})

export async function POST(req: Request, { params }: { params: { userId: number } }) {
    try {
        const body = await req.json()
        const { tweet } = tweetSchema.parse(body)
        
        const userId = Number(params.userId)
        const getUserId = await db.user.findUnique({
            where: { userId: userId },
        });

        if (!getUserId) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }

        const createTweet = await db.tweet.create({
            data: {
                userId: getUserId.userId,
                tweet
            }
        })

        return NextResponse.json({ message: `${createTweet} Success` }, { status: 201 })


    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: `Can't create tweet` }, { status: 500 })
    }
}
