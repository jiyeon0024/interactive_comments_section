import React from "react";
import { useCommentsStore } from "@/stores/commentsStore";

function ReplyDeleteBtn({ i, replyRemoveButton, setDeleteModal }) {
  const [removeReply] = useCommentsStore((state) => [state.removeReply]);
  const [comments] = useCommentsStore((state) => [state.comments]);

  return (
    <button
      onClick={() => {
        // replyRemoveButton(i);
        removeReply(i.id);
        setDeleteModal(false);
      }}
      className="bg-[#ed6468] px-6 py-3 rounded-lg text-white w-full "
    >
      YES, DELETE
    </button>
  );
}

export default ReplyDeleteBtn;
