"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const CommentTweet = ({
  userId,
  tweetId,
}: {
  userId: number;
  tweetId: number;
}) => {
  
  const [commentTweet, setCommentTweet] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSubmit = async () => {
    const twId: number = Number(tweetId);
    const uId: number = Number(userId);
    const comTweet: string = commentTweet.toString();
    console.log({twId}, {uId}, {commentTweet})
    try {
      setIsLoading(true)
      const response = await fetch("api/tweet/comment", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          tweetId: twId,
          userId: uId,
          commentTweet: comTweet,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.log("Error while comment");
      }
    } catch (err) {
      console.error("Error during like tweet", err);
      return null;
    } finally {
      setIsLoading(false)
    }
  };
  return (
    <form className="mb-5" onSubmit={handleSubmit}>
      <div className="border border-neutral-300 rounded-md p-3 flex gap-3 items-start ">
        {/* <img src={image} alt="profile" className="w-[36px] h-[36px]" /> */}
        <div className="w-full">
          <textarea
            id="textarea"
            className="w-full outline-none resize-y mt-1 overflow-hidden h-auto"
            placeholder="apa yang kamu pikirkan?"
            onChange={(e) => setCommentTweet(e.target.value)}
          ></textarea>
          {/* {errors.tweet && (
              <span className="bg-red-300 rounded-md px-3 py-2 font-semibold text-red-900 text-xs flex gap-2 items-center">
                <Info className="w-3 h-3" />
                {errors.tweet.message}
              </span>
            )} */}
          <Button
            type="submit"
            variant={"outline"}
            aria-disabled={isLoading}
            disabled={isLoading}
            className="aria-disabled:bg-neutral-300 gap-2 dark:hover:bg-neutral-700 float-right"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            Posting
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CommentTweet;
