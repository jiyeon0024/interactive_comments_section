"use client";

import { useFormik } from "formik";
import React, { useEffect, useState, useTransition } from "react";
import SendButton from "./SendButton";
import { commentValidator } from "../util/validationSchema";
import { repliesValidator } from "../util/validationSchema";
import { useAuthContext } from "../context/AuthContext";
import { postComments } from "../api/commentsApi";
import ReplyButton2 from "./ReplyButton2";
import { useCommentsStore } from "@/stores/commentsStore";

function InputReplyCard({
  newArr,
  setNewArr,
  id,
  i,
  setClick,
  replying,
  comment,
}) {
  const { user } = useAuthContext();
  const [addReply] = useCommentsStore((state) => [state.addReply]);

  const username = user.email?.slice(0, 1).toUpperCase();
  // const username = "J";
  const [value, setValue] = useState("");
  const formik = useFormik({
    initialValues: {
      id: Date.now(),
      content: comment.user?.username + "@,",
      createdAt: "Just now",
      replyingTo: "",
      score: 0,
      user: {},
    },
    validationSchema: repliesValidator,
    onSubmit: (values) => {
      if (values !== "") {
        // setValue(values);
      }
      // let newReply = [...target.replies, values];

      // const newArrCopy = newArr.map((comment) => {
      //   newReply.map((i) => {
      //     // console.log(comment);
      //     // console.log(i);
      //     if (comment.user.username === i.replyingTo) {
      //       return {
      //         ...comment,
      //         replies: [...comment.replies, values.content],
      //       };
      //     }
      //     return comment;
      //   });
      // });
      addReply(values, id);
      setClick(false);
    },
  });

  //comment card
  const handleReplyButton = (val) => {
    // console.log(val.user.username);
    // console.log(formik.values.replyingTo);
    // alert("same");
    //   const arr = newArr.map((i) => {
    //     if (
    //       val.user.username === i.user.username &&
    //       formik.values.content !== ""
    //     ) {
    //       // return i.replies.push({ content: formik.values.content });
    //       return {
    //         ...i,
    //         replies: [...i.replies, formik.values],
    //       };
    //     }
    //     return i;
    //   }
    // );
    // setNewArr(arr);
    // setClick(false);
    addReply(formik.values);
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
            ? "border-2 border-[#ed6468] rounded-lg  focus:outline-none resize-none w-full h-28 py-2 px-3 font-medium placeholder-gray-700 "
            : " rounded-lg border-2 border-gray-200  resize-none w-full h-28 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:border-[#5457b6]"
        }
        // required
      ></textarea>

      <ReplyButton2 onClick={() => handleReplyButton(comment)} />
    </form>
  );
}

export default InputReplyCard;
