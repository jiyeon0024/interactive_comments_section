import React, { useState } from "react";
import Image from "next/image";

function ReplyButton({ onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseMove={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? (
        <button className="flex justify-center items-center gap-3">
          <Image
            src="./images/icon-replyHover.svg"
            width={10}
            height={10}
            alt=""
          />

          <span className="font-bold text-[#c3c4ef]">Reply</span>
        </button>
      ) : (
        <button className="flex justify-center items-center gap-3">
          <Image src="./images/icon-reply.svg" alt="" width={10} height={10} />

          <span className="font-bold text-[#5457b6]">Reply</span>
        </button>
      )}
    </div>
  );
}

export default ReplyButton;
