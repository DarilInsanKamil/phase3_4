"use client";
import { Heart, MessageSquareMore, Repeat } from "lucide-react";
import { DialogCloseButton } from "../form/dialog";
import { FetchLikeTweet } from "@/lib/actions";
import { useRouter } from "next/navigation";

const ActionButton = ({
  like,
  comment,
  userId,
  tweetId,
}: {
  like: number;
  comment: number;
  userId: number;
  tweetId: number;
}) => {
  const router = useRouter();

  const handleLike = async () => {
    const twId = Number(tweetId);
    const uId = Number(userId);
    try {
      const response = await fetch("/api/tweet/like", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          tweetId: twId,
          userId: uId,
        }),
      });
      if (response.ok) {
        router.refresh();
        const data = await response.json();
        return data;
      }
    } catch (err) {
      console.error("Error during like tweet", err);
      return null;
    }
  }
  const handleComment = async () => {
    
  }
  return (
    <section className="flex gap-10 border-t dark:border-neutral-700 border-neutral-300 pt-3 mt-5 items-center">
      <div className="flex items-center ">
        <button
          className="dark:text-neutral-500 text-neutral-500 mr-1  "
          onClick={handleLike}
        >
          <Heart className="w-5 h-5 text-neutral-500" />
        </button>
        <p className="text-sm">{like}</p>
      </div>
      <div className="flex items-center">
        <DialogCloseButton userId={userId} tweetId={tweetId} />
        <p className="text-sm">{comment}</p>
      </div>
      {/* <button>
        <MessageSquareMore className="w-5 h-5 dark:text-neutral-500 text-neutral-500 mr-1" />
      </button> */}
      <div className="flex items-center ">
        <button className="dark:text-neutral-500 text-neutral-500 mr-1  ">
          <Repeat className="w-5 h-5 dark:text-neutral-500 text-neutral-500" />
        </button>
        <p className="text-sm">{0}</p>
      </div>
    </section>
  );
};

export default ActionButton;
