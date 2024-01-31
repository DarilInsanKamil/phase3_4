"use client";
import { Heart, MessageSquareMore, Repeat } from "lucide-react";

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
    <section className="flex gap-10 border-t dark:border-neutral-700 border-neutral-300 pt-3 mt-5">
      <button
        className="flex gap-1 items-center dark:text-neutral-500 text-neutral-500 "
        onClick={likeClick}
      >
        <Heart className="w-7 h-7 text-red-600 transition-all hover:bg-neutral-200 p-1 rounded-full" />
        <p>{like}</p>
      </button>
      <button>
        <MessageSquareMore className="w-5 h-5 dark:text-neutral-500 text-neutral-500" />
      </button>
      <button>
        <Repeat className="w-5 h-5 dark:text-neutral-500 text-neutral-500" />
      </button>
    </section>
  );
};

export default ActionButton;
