import React from "react";

function ReplyDeleteBtn({ i, replyRemoveButton }) {
  return (
    <button
      onClick={() => {
        replyRemoveButton(i);
      }}
      className="bg-[#ed6468] px-6 py-3 rounded-lg text-white w-full "
    >
      YES, DELETE
    </button>
  );
}

export default ReplyDeleteBtn;
