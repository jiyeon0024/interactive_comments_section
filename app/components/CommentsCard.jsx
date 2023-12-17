import React from "react";
import ReplyCard from "./ReplyCard";
function CommentsCard({ comments }) {
  return (
    <>
      <div className="bg-white rounded-lg w-full flex justify-center items-start gap-10 p-6">
        <div className="flex flex-col items-center justify-center">
          <button>+</button>12 <button>-</button>
          {/* button component   */}
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center gap-3">
            <div className="flex  items-center gap-3">
              <img src={comments.user.image.png} alt="" />
              <p>{comments.user.username}</p>
              <p>{comments.createdAt}</p>
            </div>
            <button>Reply</button>
            {/* button component  */}
          </div>
          <p>{comments.content}</p>
        </div>
      </div>
      {comments.replies?.map((i, index) => {
        return (
          <div key={index}>
            <div>
              <p>{i.content}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default CommentsCard;
