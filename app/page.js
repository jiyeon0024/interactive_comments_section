"use client";
import axios from "axios";

import { useFormik } from "formik";
import { commentValidator } from "./util/validationSchema";

import { getComments, postComments } from "./api/commentsApi";
import { useQuery } from "react-query";
import CommentsCard from "./components/CommentsCard";
import { useAuthContext } from "./context/AuthContext";
import InputReplyCard from "./components/InputReplyCard";
import SendButton from "./components/SendButton";

import { useEffect, useState } from "react";

export default function Home() {
  const { user } = useAuthContext();
  console.log(user);
  // const { data, isLoading } = useQuery({
  //   queryFn: async () => await getComments(),
  //   queryKey: ["comments"],
  // });
  // console.log(data);

  const username =
    user && user.email ? user.email.slice(0, 1).toUpperCase() : "";
  // const username = "J";
  const [comment, setComment] = useState("");
  const [newArr, setNewArr] = useState([]);

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: commentValidator,
    onSubmit: (values, { resetForm }) => {
      if (values !== "") {
        // postComments(values);

        setNewArr([...newArr, values]);
        resetForm();
      }
    },
  });

  useEffect(() => {
    fetch("./data.json")
      .then((res) => res.json())
      .then((val) => setNewArr(val.comments));
  }, []);

  return (
    <>
      <div className=" mt-20 max-w-[40%] flex  flex-col justify-center  items-center m-auto  ">
        {newArr &&
          newArr.map((i, index) => {
            return (
              <CommentsCard
                key={index}
                i={i}
                index={index}
                newArr={newArr}
                setNewArr={setNewArr}
              />
            );
          })}

        {/* <InputReplyCard userName={userName} data={data} /> */}
      </div>
      <div className="max-w-[40%] flex justify-center  m-auto">
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
                ? "border border-red-500 rounded-lg  focus:outline-none resize-none w-full h-28 py-2 px-3 font-medium placeholder-gray-700 "
                : " rounded-lg border border-gray-300  resize-none w-full h-28 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:border-[#5457b6]"
            }
            // required
          ></textarea>
          <SendButton />
        </form>
      </div>
    </>
  );
}
