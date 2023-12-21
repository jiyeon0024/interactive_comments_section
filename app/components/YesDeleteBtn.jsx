import React from "react";

function YesDeleteBtn({ removeButton, i }) {
  return (
    <button
      onClick={() => {
        removeButton(i);
      }}
      className="bg-[#ed6468] px-6 py-3 rounded-lg text-white "
    >
      YES, DELETE
    </button>
  );
}

export default YesDeleteBtn;
