import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { z } from "zod"

const likeSchema = z.object({
    tweetId: z.number(),
    userId: z.number()
})

export async function POST(req: Request) {
    try {
        
        const body = await req.json()
        const { tweetId, userId } = likeSchema.parse(body)

        const getUserId = await db.user.findUnique({
            where: { userId: userId },
        });

        if (!getUserId) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }

        const existingLike = await db.like.findFirst({
            where: { userId: userId, tweetId: tweetId }
        })

        if (existingLike) {
            await db.like.delete({
                where: { likeId: existingLike.likeId }
            });

            return NextResponse.json({ message: "Tweet unliked successfully" }, { status: 200 });
        }

        const createTweet = await db.like.create({
            data: {
                userId,
                tweetId
            }
        })

        return NextResponse.json({ message: `${createTweet} Success` }, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: `Can't create tweet` }, { status: 500 })
    }
}
