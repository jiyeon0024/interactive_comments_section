import { useFormik } from "formik";
import React, { useEffect, useState, useTransition } from "react";

import { useAuthContext } from "../context/AuthContext";
import { repliesEditValidator } from "../util/validationSchema";
import ReplyButton2 from "./ReplyButton2";

function InputRepliesCard({ i, newArr, setNewArr, setClickReplicesCard }) {
  const { user } = useAuthContext();
  const username = user?.email?.slice(0, 1).toUpperCase();
  // const username = "J";

  const [value, setValue] = useState("");
  const formik = useFormik({
    initialValues: {
      id: "",

      content: i.user?.username + "@,",
      createdAt: "Just now",
      replyingTo: "",
      score: 0,
      user: {},
    },
    // validationSchema: repliesEditValidator,
    onSubmit: (values) => {
      //   console.log(values);
    },
  });

  const handleReplyButton = (val) => {
    const updatedArr = newArr.map((comment) => {
      if (
        typeof comment.replies !== "undefined" &&
        comment.replies !== null &&
        comment.replies.length > 0
      ) {
        const updatedReplies = comment.replies.map((reply) => {
          if (reply.content === val.content) {
            // 특정 댓글에 대한 처리
            return {
              ...reply,
              reply: [...(reply.reply || []), formik.values],
            };
          }
          // 특정 댓글이 아닌 경우 그대로 반환
          return reply;
        });

        // 특정 댓글이 있는 경우 해당 댓글의 replies를 업데이트
        return { ...comment, replies: updatedReplies };
      }

      // replies가 없는 경우 그대로 반환
      return comment;
    });

    // 업데이트된 댓글 목록을 state에 설정
    setNewArr(updatedArr);
    setClickReplicesCard(false);
  };
  console.log(newArr);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className=" h-36 mt-5 mb-5 bg-white rounded-lg  flex justify-center items-start gap-3 p-5 w-full  "
    >
      <p className="w-10  h-10 flex justify-center items-center bg-sky-500 p-5 rounded-full text-white font-bold">
        {username}
      </p>

      <textarea
        id="content"
        name="content"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.content}
        placeholder=""
        className={
          formik.errors.content
            ? "border-2 border-[#ed6468] rounded-lg  focus:outline-none resize-none w-full h-28 py-2 px-3 font-medium placeholder-gray-700 "
            : " rounded-lg border-2 border-gray-200  resize-none w-full h-28 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:border-[#5457b6]"
        }
        // required
      ></textarea>

      <ReplyButton2 onClick={() => handleReplyButton(i)} />
    </form>
  );
}

export default InputRepliesCard;
