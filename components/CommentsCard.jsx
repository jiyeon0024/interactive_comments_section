import React, { useEffect, useState } from "react";
import ReplyCard from "./ReplyCard";
import VoteButton from "./VoteButton";
import ReplyButton from "./ReplyButton";
import { useSearchParams } from "react-router-dom";
import InputReplyCard from "./InputReplyCard";
import { useAuthContext } from "../context/AuthContext";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import DeleteModal from "./DeleteModal";
import Updatebutton from "./Updatebutton";
import { useFormik } from "formik";
import { editValidator } from "../util/validationSchema";
import Image from "next/image";
import { useCommentsStore } from "@/stores/commentsStore";
function CommentsCard({ newArr, setNewArr, comment, index }) {
  const { user } = useAuthContext();
  const username =
    user && user.email ? user.email.slice(0, 1).toUpperCase() : "";
  // const username = "J";
  // const userId = "Jiyeon";
  const userId = user && user.email ? user.email.slice(0, 7) : "";
  const [click, setClick] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editInput, setEditInput] = useState(false);
  const [buttonValue, setButtonValue] = useState("");
  //   const [formikval, setFormikVal] = useState("");
  const [closeEdit, setCloseEdit] = useState(false);
  const [editComment] = useCommentsStore((state) => [state.editComment]);
  const formik = useFormik({
    initialValues: {
      content: comment?.content,
    },
    validationSchema: editValidator,
    onSubmit: (values) => {
      // setFormikVal(values.content);
      // const arr =  newArr.forEach((i) => {
      //     if (i.content === buttonValue) {
      //       return {...i, comment:}
      //     }
      //   });
      //   //   setNewArr(buttonValue);
      //   console.log(buttonValue);
    },
  });
  //   console.log(newArr);
  const handleClick = () => {
    console.log();
    if (!click) {
      setClick(true);
    } else {
      setClick(false);
    }
  };

  const handleDeleteModal = () => {
    if (deleteModal) {
      setDeleteModal(false);
    } else {
      setDeleteModal(true);
    }
  };

  // const removeButton = () => {
  // let filtered = newArr.filter((i) => val !== i);
  // setNewArr(filtered);
  // setDeleteModal(false);
  // localStorage.setItem("comments", JSON.stringify(filtered));
  // removeReply(i.id);
  // };

  const editButton = (val) => {
    setEditInput(true);
    setCloseEdit(false);
  };

  //input card update button
  const updateButton = () => {
    const arr = newArr.map((i) => {
      if (i.content === buttonValue) {
        return { ...i, content: formik.values.content };
      }
      return i;
    });
    setNewArr(arr);
    localStorage.setItem("comments", JSON.stringify(arr));

    setCloseEdit(true);
  };

  return (
    <>
      <div className="flex flex-col gap-5 w-full h-full  ">
        <div className="bg-white rounded-lg  flex justify-center items-start gap-10 p-8 w-full h-full ">
          <div className="sm:flex flex-col items-center justify-center  hidden  ">
            <VoteButton index={comment.id} />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div className="flex justify-between items-center gap-3">
              <div className="flex  items-center gap-3">
                {comment.user?.image?.png ? (
                  <Image
                    src={comment.user?.image?.png}
                    alt=""
                    className="w-10"
                    width={100}
                    height={100}
                  />
                ) : (
                  <div className="w-10  h-10 flex justify-center items-center bg-sky-500 p-5 rounded-full text-white font-bold">
                    {username}
                  </div>
                )}
                {comment?.user?.username ? (
                  <p className="font-bold">{comment.user?.username}</p>
                ) : (
                  <p className="font-bold">{userId}</p>
                )}
                {comment.createdAt ? (
                  <p className="text-gray-400 font-semibold">
                    {comment.createdAt}
                  </p>
                ) : (
                  <p className="text-gray-400 font-semibold">Today</p>
                )}
              </div>

              {comment.id === 1 || comment.id == 2 ? (
                <div className="hidden sm:block">
                  <ReplyButton onClick={() => handleClick(comment)} />
                </div>
              ) : (
                <div className="sm:flex gap-3 hidden  ">
                  <DeleteButton
                    onClick={() => {
                      //   removeButton(i);
                      handleDeleteModal();
                    }}
                  />
                  <EditButton onClick={() => editButton(comment)} />
                </div>
              )}
            </div>
            <div className="">
              {editInput && !closeEdit ? (
                <form
                  className="flex flex-col w-full "
                  onSubmit={formik.handleSubmit}
                >
                  <textarea
                    id="content"
                    name="content"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.content}
                    placeholder=""
                    className={
                      formik.errors.content
                        ? "border-2 border-[#ed6468] rounded-lg  focus:outline-none resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 "
                        : " rounded-lg border-2 border-gray-200  resize-none full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:border-[#5457b6]"
                    }
                    // required
                  ></textarea>
                  <div className="flex justify-end mt-3">
                    <Updatebutton
                      onClick={() => {
                        editComment(comment.id, formik.values.content);
                        setEditInput(false);
                      }}
                    />
                  </div>
                </form>
              ) : (
                <p className="text-gray-600 w-full  break-words ">
                  {comment.content}
                </p>
              )}
              <div className=" pt-5 sm:pt-0 flex justify-between items-center sm:hidden">
                <VoteButton index={index} />{" "}
                {comment.id === 1 || comment.id == 2 ? (
                  <div className="block sm:hidden">
                    <ReplyButton onClick={() => handleClick(comment)} />
                  </div>
                ) : (
                  <div className="sm:hidden gap-3 flex ">
                    <DeleteButton
                      onClick={() => {
                        //   removeButton(i);
                        handleDeleteModal();
                      }}
                    />
                    <EditButton
                      onClick={() =>
                        editComment(comment.id, formik.values.content)
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          {deleteModal ? (
            <DeleteModal handleDeleteModal={handleDeleteModal} i={comment} />
          ) : null}
        </div>
        {click ? (
          <InputReplyCard
            id={comment.id}
            setClick={setClick}
            comment={comment}
          />
        ) : null}
        <div className="  w-full  flex justify-end   ">
          <div className=" w-[95%] flex  flex-col items-end  gap-5  border-l-2 border-gray-200 pl-3 sm:pl-6  ">
            {comment.replies?.map((i, j) => {
              return <ReplyCard j={j} comment={comment} i={i} key={j} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentsCard;
