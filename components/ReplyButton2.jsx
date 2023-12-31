import React from "react";

function ReplyButton2({ onClick }) {
  return (
    <button
      onClick={onClick}
      type="submit"
      className="bg-[#5457b6] text-white px-6 py-2 rounded-lg hover:bg-[#c3c4ef]"
    >
      Reply
    </button>
  );
}

export default ReplyButton2;
