import React, { useState } from "react";
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
          <img src="./images/icon-editHover.svg" alt="" />
          <span className="font-bold text-[#c3c4ef]">Edit</span>
        </button>
      ) : (
        <button
          type="submit"
          onClick={onClick}
          className="flex justify-center items-center gap-3"
        >
          <img src="./images/icon-edit.svg" alt="" />
          <span className="font-bold text-[#5457b6]">Edit</span>
        </button>
      )}
    </div>
  );
}

export default EditButton;
