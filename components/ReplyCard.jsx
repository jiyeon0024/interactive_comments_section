import React, { useState, useEffect } from "react";
import VoteButton from "./VoteButton";
import ReplyButton from "./ReplyButton";
import { useAuthContext } from "../context/AuthContext";
import InputReplyCard from "./InputRepliesCard";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import ReplyDeleteModal from "./ReplyDeleteModal";
import { useFormik } from "formik";
import { replyEditValidator } from "../util/validationSchema";
import InputRepliesCard from "./InputRepliesCard";
import Updatebutton from "./Updatebutton";
import RepliesCommentsReply from "./RepliesCommentsReply";
import Image from "next/image";
import { useCommentsStore } from "@/stores/commentsStore";

function ReplyCard({ i, j, comment }) {
  const [click, setClick] = useState(false);
  const { user } = useAuthContext();
  const [deleteModal, setDeleteModal] = useState(false);
  const [editInput, setEditInput] = useState(false);
  const [closeEdit, setCloseEdit] = useState(false);
  const [clickRepliresCard, setClickReplicesCard] = useState(false);
  const [buttonValue, setButtonValue] = useState("");
  const username = user && user.email?.slice(0, 1).toUpperCase();
  const userId = user && user.email ? user.email.slice(0, 7) : "";
  const [editReply, comments] = useCommentsStore((state) => [
    state.editReply,
    state.comments,
  ]);

  const formik = useFormik({
    initialValues: {
      content: i?.content,
    },
    validationSchema: replyEditValidator,
    onSubmit: (values) => {},
  });

  const handleDeleteModal = () => {
    if (deleteModal) {
      setDeleteModal(false);
    } else {
      setDeleteModal(true);
    }
  };

  const editButton = (val) => {
    // setButtonValue(val.content);

    setEditInput(true);
    setCloseEdit(false);
  };

  //comment replies update button
  const updateButton = () => {
    let arr = newArr.map((i) => {
      let reply = i.replies.map((j) => {
        if (j.content === buttonValue) {
          return { ...j, content: formik.values.content };
        }
        return j;
      });

      return { ...i, replies: reply };
    });

    setNewArr(arr);
    localStorage.setItem("comments", JSON.stringify(arr));
    setCloseEdit(true);
  };

  const replyRemoveButton = (val) => {
    // console.log(newArr);

    const updatedArr = newArr.map((comment) => {
      const updatedReplies = comment.replies.filter(
        (reply) => reply.content !== val.content
      );

      return {
        ...comment,
        replies: updatedReplies,
      };
    });

    setNewArr(updatedArr);
    localStorage.setItem("comments", JSON.stringify(updatedArr));
    setDeleteModal(false);

    // console.log(reply);
  };

  const handleClick = () => {
    if (click) {
      setClick(false);
    } else {
      setClick(true);
    }
  };

  const handleRepliesCard = () => {
    if (clickRepliresCard) {
      setClickReplicesCard(false);
    } else {
      setClickReplicesCard(true);
    }
  };

  const [vote, setVote] = useState(0);
  const localStorageKey = `replyVote${j}`;

  const upVote = () => {
    setVote((prevVote) => {
      const newVote = prevVote + 1;
      localStorage.setItem(localStorageKey, newVote.toString());
      return newVote;
    });
  };

  const downVote = () => {
    setVote((prevVote) => {
      if (prevVote > 0) {
        const newVote = prevVote - 1;
        localStorage.setItem(localStorageKey, newVote.toString());
        return newVote;
      }
      return prevVote;
    });
  };

  useEffect(() => {
    let localComment = localStorage.getItem("comments");
    // setNewArr(JSON.parse(localComment));

    const localVote = JSON.parse(localStorage.getItem(localStorageKey));
    if (localVote != null) {
      setVote(localVote);
    }
  }, [localStorageKey]);

  return (
    <>
      <div className="bg-white rounded-lg  flex justify-center items-start gap-10 p-8  w-full">
        <div className=" hidden sm:flex flex-col  gap-1 items-center justify-center text-[#5457b6] font-bold bg-[#f5f6fa] p-3 rounded-lg">
          <button
            className="font-bold text-gray-400"
            onClick={() => upVote(upVote)}
          >
            +
          </button>
          {vote}
          <button
            className="font-bold text-gray-400"
            onClick={() => downVote(downVote)}
          >
            -
          </button>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex justify-between items-center gap-3 w-full ">
            <div className="flex  justify-between items-center gap-3 ">
              {i.user?.image ? (
                <Image
                  src={i.user.image.png}
                  alt=""
                  className="w-10"
                  width={100}
                  height={100}
                />
              ) : (
                <p className="w-10  h-10 flex justify-center items-center bg-sky-500 p-5 rounded-full text-white font-bold">
                  {username}
                </p>
              )}
              {i.user.username ? (
                <p className="font-bold"> {i.user.username}</p>
              ) : (
                <p className="font-bold"> {userId}</p>
              )}
              <p className="text-gray-400 font-semibold">{i.createdAt}</p>
            </div>
            <div className=" hidden sm:flex gap-3">
              {i.id === 1 || i.id === 2 || i.id === 3 || i.id === 4 ? (
                <div>
                  <ReplyButton onClick={() => handleRepliesCard()} />
                </div>
              ) : (
                <div className="sm:flex gap-3 hidden  ">
                  <DeleteButton
                    onClick={() => {
                      //   removeButton(i);
                      handleDeleteModal();
                    }}
                  />
                  <EditButton
                    onClick={() => {
                      editButton();
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div>
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
                      editReply(i.id, formik.values.content);
                      setEditInput(false);
                    }}
                  />
                </div>
              </form>
            ) : (
              <p className="text-gray-600 w-full break-all">{i.content}</p>
            )}
          </div>

          <div className="sm:hidden flex justify-between items-center">
            <div className=" flex flex-row   gap-2 items-center justify-center text-[#5457b6] font-bold bg-[#f5f6fa] p-3 rounded-lg">
              <button
                className="font-bold text-gray-400"
                onClick={() => upVote(upVote)}
              >
                +
              </button>
              {vote}
              <button
                className="font-bold text-gray-400"
                onClick={() => downVote(downVote)}
              >
                -
              </button>
            </div>
            {i.id === 1 || i.id === 2 || i.id === 3 || i.id === 4 ? (
              <div>
                <ReplyButton onClick={() => handleRepliesCard()} />
              </div>
            ) : (
              <div className="sm:hidden gap-3 flex ">
                <DeleteButton
                  onClick={() => {
                    //   removeButton(i);
                    handleDeleteModal();
                  }}
                />
                <EditButton onClick={() => editButton(i)} />
              </div>
            )}
          </div>
        </div>
        {deleteModal ? (
          <ReplyDeleteModal
            i={i}
            handleDeleteModal={handleDeleteModal}
            setDeleteModal={setDeleteModal}
            // replyRemoveButton={replyRemoveButton}
          />
        ) : null}
      </div>
      {/* {i.reply !== null && typeof i.reply !== "undefined"
        ? i.reply.map((i, index) => {
            return (
              // <<div className="bg-green-100" key={index}>
              //   {i.content}
              // </div>

              <RepliesCommentsReply
                i={i}
                index={index}
                key={i + index}
                newArr={newArr}
                setNewArr={setNewArr}
              />
            );
          })
        : null} */}
      {click ? <InputReplyCard /> : null}
      {clickRepliresCard ? (
        <InputRepliesCard
          i={i}
          comment={comment}
          setClickReplicesCard={setClickReplicesCard}
        />
      ) : null}
    </>
  );
}

export default ReplyCard;
