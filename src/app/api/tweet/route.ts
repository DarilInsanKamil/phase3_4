import { db } from "@/lib/db";
import { tweetSchema } from "@/lib/schema";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export const dynamic = "force-dynamic";
export async function GET() {
    revalidateTag("tweet")
    try {
        const response = await db.tweet.findMany({
            include: {
                user: true,
                Like: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        const parseData = tweetSchema.parse(response)
        return NextResponse.json(parseData, { status: 200 })
    } catch (err) {
        return NextResponse.json("failed to get data", { status: 500 })
    }
}