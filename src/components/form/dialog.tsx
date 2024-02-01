"use client";
import { CopyIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MessageSquareMore } from "lucide-react";
import CommentTweet from "./CommentTweet";

export function DialogCloseButton({
  userId,
  tweetId,
}: {
  userId: number;
  tweetId: number;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="dark:text-neutral-500 text-neutral-500 mr-1">
          <MessageSquareMore className="w-5 h-5 text-neutral-500" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <CommentTweet userId={userId} tweetId={tweetId} />
        </div>
        {/* <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
