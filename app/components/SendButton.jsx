import React from "react";

function SendButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      type="submit"
      className="bg-[#5457b6] text-white px-6 py-2 rounded-lg"
    >
      send
    </button>
  );
}

export default SendButton;
