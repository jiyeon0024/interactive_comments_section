import React, { useState } from "react";

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
          <img src="./images/icon-deleteHover.svg" alt="" />
          <span className="font-bold text-[#ffb8bb]">Delete</span>
        </button>
      ) : (
        <button
          onClick={onClick}
          className="flex justify-center items-center gap-3"
        >
          <img src="./images/icon-delete.svg" alt="" />
          <span className="font-bold text-[#ed6468] ">Delete</span>
        </button>
      )}
    </div>
  );
}

export default DeleteButton;
