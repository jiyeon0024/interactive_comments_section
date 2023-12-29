import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function VoteButton({ index }) {
  const [vote, setVote] = useState(0);
  const localStorageKey = `vote${index}`;

  const upVote = () => {
    setVote((prevVote) => {
      const newVote = prevVote + 1;
      localStorage.setItem(localStorageKey, newVote.toString());
      return newVote;
    });
  };

  const downVote = () => {
    setVote((prevVote) => {
      if (prevVote > 0) {
        const newVote = prevVote - 1;
        localStorage.setItem(localStorageKey, newVote.toString());
        return newVote;
      }
      return prevVote;
    });
  };

  useEffect(() => {
    const localVote = JSON.parse(localStorage.getItem(localStorageKey));
    if (localVote != null) {
      setVote(localVote);
    }
  }, [localStorageKey]);
  return (
    <div className="flex-row flex sm:flex-col sm:gap-1 gap-2 items-center justify-center text-[#5457b6] font-bold bg-[#f5f6fa] p-3 rounded-lg">
      <button
        className="font-bold text-gray-400"
        onClick={() => upVote(upVote)}
      >
        +
      </button>
      {vote}
      <button
        className="font-bold text-gray-400"
        onClick={() => downVote(downVote)}
      >
        -
      </button>
    </div>
  );
}

export default VoteButton;
