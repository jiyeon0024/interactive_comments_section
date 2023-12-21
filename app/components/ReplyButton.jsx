import React from "react";

function ReplyButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center gap-3"
    >
      <img src="./images/icon-reply.svg" alt="" />
      <span className="font-bold text-[#5457b6]">Reply</span>
    </button>
  );
}

export default ReplyButton;
