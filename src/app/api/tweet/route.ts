import { db } from "@/lib/db";
import { tweetSchema } from "@/lib/schema";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await db.tweet.findMany({
            include: {
                user: true
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