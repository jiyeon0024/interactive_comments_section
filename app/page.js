"use client";

import { getComments } from "./api/coomentsApi";
import { useQuery } from "react-query";
import CommentsCard from "./components/CommentsCard";

export default function Home() {
  const { data } = useQuery({
    queryFn: () => getComments(),
    queryKey: ["comments"],
  });
  console.log(data);

  return (
    <div className=" mt-20 max-w-[50%] flex  flex-col justify-center gap-10  items-center m-auto">
      {Object.values(data?.data.comments || {}).map((comments, index) => {
        return <CommentsCard key={index} comments={comments} />;
      })}
    </div>
  );
}
