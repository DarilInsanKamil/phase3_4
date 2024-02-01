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

        console.log('Request body:', body);
        console.log('Parsed tweetId:', tweetId);
        console.log('Parsed userId:', userId);
        
        const existingLike = await db.like.findFirst({
            where: { userId: userId, tweetId: tweetId }
        });

        console.log('Existing like:', existingLike);

        if (existingLike) {
            // User has already liked, so unlike
            await db.like.delete({
                where: { likeId: existingLike.likeId }
            });

            return NextResponse.json({ message: "Tweet unliked successfully" }, { status: 200 });
        } else {
            // User hasn't liked yet, so like
            const createTweet = await db.like.create({
                data: {
                    userId,
                    tweetId
                }
            });

            return NextResponse.json({ message: "Tweet liked successfully" }, { status: 201 });
        }
        // await db.$transaction([
        //     db.user.findUnique({ where: { userId: userId } }),
        //     db.like.findFirst({ where: { userId: userId, tweetId: tweetId } }),
        //     db.like.create({ data: { userId, tweetId } })
        // ]);

        // return NextResponse.json({ message: `Success` }, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: `Can't create tweet` }, { status: 500 })
    }
}
