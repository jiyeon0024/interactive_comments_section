import React from "react";

function NoCancelBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#67727e] px-6 py-3 rounded-lg text-white  w-full"
    >
      NO, CANCEL
    </button>
  );
}

export default NoCancelBtn;
