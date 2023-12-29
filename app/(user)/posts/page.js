"use client";
import axios from "axios";

import { useFormik } from "formik";
import { commentValidator } from "../../../util/validationSchema";

import { getComments, postComments } from "../../../api/commentsApi";
import { useQuery } from "react-query";
import CommentsCard from "../../../components/CommentsCard";
import { useAuthContext } from "../../../context/AuthContext";
import InputReplyCard from "../../../components/InputReplyCard";
import SendButton from "../../../components/SendButton";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { useCommentsStore } from "@/stores/commentsStore";
import LogoutButton from "@/components/LogoutButton";

function Home() {
  const { loggedIn, user } = useAuthContext();
  const router = useRouter();
  const [comments, addComment] = useCommentsStore((state) => [
    state.comments,
    state.addComment,
  ]);

  // if (!loggedIn) {
  //   return router.push("/login");
  // }

  const username =
    user && user.email ? user.email.slice(0, 1).toUpperCase() : "";
  // const username = "J";

  const [newArr, setNewArr] = useState([]);

  const formik = useFormik({
    initialValues: {
      id: Date.now(),
      content: "",
      createdAt: "Just now",
      score: 0,
      user: {},
      replies: [],
    },
    validationSchema: commentValidator,
    onSubmit: (values, { resetForm }) => {
      if (values !== null) {
      }
      resetForm();
    },
  });

  return (
    <>
      <div className=" mt-20 xl:max-w-[40%] w-[80%] flex  flex-col   items-center m-auto gap-5 ">
        <div className="w-full flex justify-end items-center">
          <LogoutButton />
        </div>
        {comments?.map((comment, index) => {
          return <CommentsCard key={index} comment={comment} index={index} />;
        })}

        {/* <InputReplyCard userName={userName} data={data} /> */}
      </div>
      <div className="xl:max-w-[40%] w-[90%] flex justify-center  m-auto">
        <form
          onSubmit={formik.handleSubmit}
          className="   h-36 mt-5 mb-20 bg-white rounded-lg  flex justify-center items-start gap-3 p-5 w-full  "
        >
          <p className="w-10  h-10 flex justify-center items-center bg-sky-500 p-5 rounded-full text-white font-bold">
            {username}
          </p>

          <textarea
            id="content"
            name="content"
            typeof="text"
            onChange={formik.handleChange}
            value={formik.values.content}
            placeholder="Add a comment"
            className={
              formik.errors.content
                ? "border-2 border-[#ed6468] rounded-lg  focus:outline-none resize-none w-full h-28 py-2 px-3 font-medium placeholder-gray-700 "
                : " rounded-lg border-2 border-gray-200  resize-none w-full h-28 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:border-[#5457b6]"
            }
            // required
          ></textarea>
          <SendButton
            onClick={() => {
              addComment(formik.values);
            }}
          />
        </form>
      </div>
    </>
  );
}

export default Home;
