import React from "react";

function YesDeleteBtn({ removeReplyButton, i }) {
  return (
    <button
      onClick={() => {
        removeReplyButton(i);
      }}
      className="bg-[#ed6468] px-6 py-3 rounded-lg text-white w-full "
    >
      YES, DELETE
    </button>
  );
}

export default YesDeleteBtn;
