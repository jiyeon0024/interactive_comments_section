import { useFormik } from "formik";
import React, { useEffect, useState, useTransition } from "react";
import SendButton from "./SendButton";
import { commentValidator } from "../util/validationSchema";
import { repliesValidator } from "../util/validationSchema";
import { useAuthContext } from "../context/AuthContext";
import { postComments } from "../api/commentsApi";
import ReplyButton2 from "./ReplyButton2";
function InputReplyCard({ newArr, setNewArr, id, i }) {
  const { user } = useAuthContext();
  // const username = user.email?.slice(0, 1).toUpperCase();
  const username = "J";

  const [target, setTarget] = useState();

  const formik = useFormik({
    initialValues: {
      content: "",
      replyingTo: "",
    },
    validationSchema: repliesValidator,
    onSubmit: (values) => {
      let newReply = [...target.replies, values];

      const newArrCopy = newArr.map((comment) => {
        newReply.map((i) => {
          // console.log(comment);
          // console.log(i);
          if (comment.user.username === i.replyingTo) {
            return {
              ...comment,
              replies: [...comment.replies, values.content],
            };
          }
          return comment;
        });
      });
      // setNewArr(newArrCopy);
      console.log(newArrCopy);
    },
  });

  const handleReplyButton = (val) => {
    setTarget(val);
  };

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
            ? "border border-red-500 rounded-lg  focus:outline-none resize-none w-full h-28 py-2 px-3 font-medium placeholder-gray-700 "
            : " rounded-lg border border-gray-300  resize-none w-full h-28 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:border-[#5457b6]"
        }
        // required
      ></textarea>
      <input
        type="text"
        id="replyingTo"
        name="replyingTo"
        onChange={formik.handleChange}
        value={formik.values.replyingTo}
        className="border border-green-300"
        placeholder="Replying to"
      />
      <ReplyButton2 onClick={() => handleReplyButton(i)} />
    </form>
  );
}

export default InputReplyCard;
