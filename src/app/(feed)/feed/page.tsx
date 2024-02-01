import CardTweet from "@/components/card/CardTweet";
import CreateTweet from "@/components/form/CreateTweet";
import { FetchAllTweet } from "@/lib/data";
import { getUserData } from "@/lib/type";
import { Suspense } from "react";

const page = async () => {
  const userData = await getUserData();

  if (userData.error) {
    return <div>Error: {userData.error}</div>;
  }
  const image = userData.image || "/avatar1.png";
  const userId = userData.userId || 0;
  const data = await FetchAllTweet();
  return (
    <main className="grid lg:grid-cols-12 grid-cols-6 py-5 px-3">
      <Suspense fallback={<p>Loading....</p>}>
        <div className="lg:col-start-5 lg:col-span-4 col-start-1 col-span-6">
          <CreateTweet userId={userId} image={image} />
          <CardTweet data={data} userId={userId}/>
        </div>
      </Suspense>
    </main>
  );
};

export default page;
