import React from "react";

function EditButton({ i, onClick }) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="flex justify-center items-center gap-3"
    >
      <img src="./images/icon-edit.svg" alt="" />
      <span className="font-bold text-[#5457b6]">Edit</span>
    </button>
  );
}

export default EditButton;
