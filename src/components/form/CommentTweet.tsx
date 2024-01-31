"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { db } from "@/lib/db";

const CommentTweet = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, handleSubmit } = useForm();
  const onSubmit = async () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
      <div className="border border-neutral-300 rounded-md p-3 flex gap-3 items-start ">
        {/* <img src={image} alt="profile" className="w-[36px] h-[36px]" /> */}
        <div className="w-full">
          <textarea
            id="textarea"
            className="w-full outline-none resize-y mt-1 overflow-hidden h-auto"
            placeholder="apa yang kamu pikirkan?"
            {...register("tweet", {})}
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
