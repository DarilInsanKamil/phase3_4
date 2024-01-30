import { Heart, MessageSquareMore, Repeat } from "lucide-react";

const ActionButton = () => {
  return (
    <section className="flex gap-10 border-t dark:border-neutral-700 border-neutral-300 pt-3 mt-5">
      <button>
        <Heart className="w-5 h-5 dark:text-neutral-500 text-neutral-500" />
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
