import ActionButton from "@/components/card/ActionButton";
import { useLikeTweet } from "@/lib/actions";
import { db } from "@/lib/db";
import { formatUsername, updateHari } from "@/lib/utils";
import { Suspense } from "react";

const page = async ({ params }: { params: { id: number } }) => {
  const data = await db.tweet.findFirst({
    where: { tweetId: Number(params.id) },
    include: {
      user: true,
      Like: true,
    },
  });
  return (
    <main className="grid lg:grid-cols-12 grid-cols-6 py-5 px-3">
      <Suspense fallback={<p>Loading....</p>}>
        <div className="lg:col-start-5 lg:col-span-4 col-start-1 col-span-6">
          {data && (
            <div
              key={data?.tweetId}
              className="border dark:border-neutral-700 border-neutral-300 p-3 w-full rounded-md mb-2"
            >
              <div className="flex gap-2 items-center mb-3">
                {data?.user ? (
                  <img
                    src={data?.user.image || "/avatar3.png"}
                    alt="profile"
                    className="w-[36px] h-[36px]"
                  />
                ) : (
                  <></>
                )}
                <div className="flex items-center gap-1">
                  <p className="font-semibold">{data?.user.username}</p>
                  <p className="dark:text-neutral-500 text-neutral-500 text-xs">
                    @{formatUsername(data?.user.email)}
                  </p>
                  <p className="dark:text-neutral-500 text-neutral-500 text-xs">
                    &#8226;
                  </p>
                  <p className="dark:text-neutral-500 text-neutral-500 text-xs">
                    {updateHari(data?.createdAt)}
                  </p>
                </div>
              </div>
              <p className="break-words">{data?.tweet}</p>
              {/* <ActionButton
                like={data?.Like.length}
                likeClick={async () =>
                  await useLikeTweet(data.tweetId, data.userId)
                }
                comment={async () => console.log("helo")}
              /> */}
            </div>
          )}
        </div>
      </Suspense>
    </main>
  );
};
export default page;
