import React from "react";

function DeleteButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center gap-3"
    >
      <img src="./images/icon-delete.svg" alt="" />
      <span className="font-bold text-red-500">Delete</span>
    </button>
  );
}

export default DeleteButton;
