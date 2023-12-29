import React, { useState } from "react";
import Image from "next/image";
function EditButton({ onClick }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseMove={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? (
        <button
          type="submit"
          onClick={onClick}
          className="flex justify-center items-center gap-3"
        >
          <Image
            src="./images/icon-editHover.svg"
            width={10}
            height={10}
            alt=""
            className="w-auto h-auto"
          />
          <span className="font-bold text-[#c3c4ef]">Edit</span>
        </button>
      ) : (
        <button
          type="submit"
          onClick={onClick}
          className="flex justify-center items-center gap-3"
        >
          <Image
            src="./images/icon-edit.svg"
            alt=""
            width={10}
            height={10}
            className="w-auto h-auto"
          />
          <span className="font-bold text-[#5457b6]">Edit</span>
        </button>
      )}
    </div>
  );
}

export default EditButton;
