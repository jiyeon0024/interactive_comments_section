import React, { useState, useEffect } from "react";
import VoteButton from "./VoteButton";
import ReplyButton from "./ReplyButton";
import { useAuthContext } from "../context/AuthContext";
import InputReplyCard from "./InputReplyCard";
function ReplyCard({ i, j }) {
  const [click, setClick] = useState(false);
  const handleClick = () => {
    if (click) {
      setClick(false);
    } else {
      setClick(true);
    }
  };

  const [vote, setVote] = useState(0);
  const localStorageKey = `replyVote${j}`;

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
  }, []);

  return (
    <>
      <div className="bg-white rounded-lg  flex justify-center items-center gap-10 p-8 w-full">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col  gap-1 items-center justify-center text-[#5457b6] font-bold bg-[#f5f6fa] p-3 rounded-lg">
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
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center gap-3">
            <div className="flex  items-center gap-3">
              <img src={i.user.image.png} alt="" className="w-10" />
              <p className="font-bold">{i.user.username}</p>
              <p className="text-gray-400 font-semibold">{i.createdAt}</p>
            </div>
            <div className="flex gap-3">
              <ReplyButton onClick={() => handleClick()} />
            </div>
          </div>
          <p className="text-gray-600 max-w-[60ch]">{i.content}</p>
        </div>
      </div>
      {click ? <InputReplyCard /> : null}
    </>
  );
}

export default ReplyCard;
