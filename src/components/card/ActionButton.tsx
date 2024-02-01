"use client";
import { Heart, MessageSquareMore, Repeat } from "lucide-react";
import { DialogCloseButton } from "../form/dialog";

const ActionButton = ({
  like,
  comment,
  likeClick,
}: {
  like: number;
  comment: () => void;
  likeClick: () => void;
}) => {
  return (
    <section className="flex gap-10 border-t dark:border-neutral-700 border-neutral-300 pt-3 mt-5 items-center">
      <div className="flex items-center ">
        <button
          className="dark:text-neutral-500 text-neutral-500 mr-1  "
          onClick={likeClick}
        >
          <Heart className="w-5 h-5 text-neutral-500" />
        </button>
        <p className="text-sm">{like}</p>
      </div>
      <div className="flex items-center">
        <DialogCloseButton />
        <p className="text-sm">{0}</p>
      </div>
      {/* <button>
        <MessageSquareMore className="w-5 h-5 dark:text-neutral-500 text-neutral-500 mr-1" />
      </button> */}
      <div className="flex items-center ">
        <button
          className="dark:text-neutral-500 text-neutral-500 mr-1  "
          onClick={likeClick}
        >
          <Repeat className="w-5 h-5 dark:text-neutral-500 text-neutral-500" />
        </button>
        <p className="text-sm">{0}</p>
      </div>
    </section>
  );
};

export default ActionButton;
