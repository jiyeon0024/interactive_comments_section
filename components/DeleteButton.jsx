import React, { useState } from "react";
import Image from "next/image";
function DeleteButton({ onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseMove={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? (
        <button
          onClick={onClick}
          className="flex justify-center items-center gap-3"
        >
          <Image
            width={10}
            height={10}
            src="./images/icon-deleteHover.svg"
            alt=""
            className="w-auto h-auto"
          />
          <span className="font-bold text-[#ffb8bb]">Delete</span>
        </button>
      ) : (
        <button
          onClick={onClick}
          className="flex justify-center items-center gap-3"
        >
          <Image
            width={10}
            height={10}
            src="./images/icon-delete.svg"
            alt=""
            className="w-auto h-auto"
          />
          <span className="font-bold text-[#ed6468] ">Delete</span>
        </button>
      )}
    </div>
  );
}

export default DeleteButton;
