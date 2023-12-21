import React from "react";

function NoCancelBtn({ handleDeleteModal }) {
  return (
    <button
      onClick={() => {
        handleDeleteModal();
      }}
      className="bg-[#324152] px-6 py-3 rounded-lg text-white "
    >
      NO, CANCEL
    </button>
  );
}

export default NoCancelBtn;
