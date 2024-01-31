"use client";
import { formatDate, formatUsername, updateHari } from "@/lib/utils";
import { AtSign, Dot } from "lucide-react";
import ActionButton from "./ActionButton";
import Link from "next/link";
import { useLikeTweet } from "@/lib/actions";
import { useRouter } from "next/navigation";

interface DataTweet {
  tweetId: number;
  userId: number;
  tweet: string;
  createdAt: Date; // Convert date to string
  updatedAt: Date; // Convert date to string
  user: {
    userId: number;
    email: string;
    username: string;
    password: string;
    createdAt: Date;
    image: string;
  };
  Like: [];
}

const CardTweet = ({ data }: any) => {
  const router = useRouter();
  return (
    <div>
      {data.map((res: any) => {
        return (
          <div
            key={res.tweetId}
            className="border dark:border-neutral-700 border-neutral-300 p-3 w-full rounded-md mb-2"
          >
            <Link href={`/feed/${res.tweetId}`}>
              <div className="flex gap-2 items-center mb-3">
                {res.user ? (
                  <img
                    src={res.user.image || "/avatar3.png"}
                    alt="profile"
                    className="w-[36px] h-[36px]"
                  />
                ) : (
                  <></>
                )}
                <div className="flex items-center gap-1">
                  <p className="font-semibold">{res.user.username}</p>
                  <p className="dark:text-neutral-500 text-neutral-500 text-xs">
                    @{formatUsername(res.user.email)}
                  </p>
                  <p className="dark:text-neutral-500 text-neutral-500 text-xs">
                    &#8226;
                  </p>
                  <p className="dark:text-neutral-500 text-neutral-500 text-xs">
                    {updateHari(res.createdAt)}
                  </p>
                </div>
              </div>
              <p className="break-words">{res.tweet}</p>
            </Link>
            <ActionButton
              like={res.Like?.length}
              userId={res.user?.userId}
              tweetId={res.tweetId}
              likeClick={async () => {
                await useLikeTweet(res.tweetId, res.user.userId);
                router.refresh();
              }}
            />
            {/* <button onClick={() => console.log(res.tweetId, res.user.userId)}>like</button> */}
          </div>
        );
      })}
    </div>
  );
};
export default CardTweet;
