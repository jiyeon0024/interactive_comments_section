import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { useFormik } from "formik";
import Updatebutton from "./Updatebutton";
import ReplyButton from "./ReplyButton";
import RepliesCommentReplyDeleteModal from "./RepliesCommentReplyDeleteModal";

function RepliesCommentsReply({ i, index, newArr, setNewArr }) {
  const { user } = useAuthContext();
  const username = user && user.email?.slice(0, 1).toUpperCase();
  const userId = user && user.email ? user.email.slice(0, 7) : "";
  const [editInput, setEditInput] = useState(false);
  const [closeEdit, setCloseEdit] = useState(false);
  const [clickRepliresCard, setClickReplicesCard] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [buttonValue, setButtonValue] = useState("");

  const formik = useFormik({
    initialValues: {
      content: i?.content,
    },
    // validationSchema: replyEditValidator,
    onSubmit: (values) => {},
  });

  const handleDeleteModal = () => {
    if (deleteModal) {
      setDeleteModal(false);
    } else {
      setDeleteModal(true);
    }
  };

  const removeReplyButton = (val) => {
    let updatedArr = newArr.map((comment) => {
      if (
        comment.replies &&
        comment.replies.length > 0 &&
        comment.replies.some((reply) => reply.reply && reply.reply.length > 0)
      ) {
        // 조건을 만족하는 경우에만 해당 comment를 반환
        let updatedReplies = comment.replies.map((reply) => {
          if (reply.reply && reply.reply.length > 0) {
            // reply가 비어 있지 않은 경우에만 처리
            let filteredReply = reply.reply.filter(
              (item) => item.content !== val.content
            );
            return { ...reply, reply: [...filteredReply] }; // 새로운 배열로 복사
          } else {
            return reply;
          }
        });

        return { ...comment, replies: updatedReplies };
      } else {
        // 조건을 만족하지 않는 경우에는 기존 comment를 그대로 반환
        return comment;
      }
    });

    // 새로운 배열을 적용
    setNewArr(updatedArr);

    // Modal 닫기
    setDeleteModal(false);

    console.log(updatedArr);
  };

  const editButton = (val) => {
    setButtonValue(val.content);

    setEditInput(true);
    setCloseEdit(false);
  };

  const updateButton = () => {
    console.log(formik.values);
    console.log(newArr);

    let arr = newArr.map((i) => {
      if (
        i.replies !== null &&
        typeof i.replies !== "undefined" &&
        i.replies.length > 0
      ) {
        let repliesArr = i.replies.map((replies) => {
          if (
            replies.reply !== null &&
            typeof replies.reply !== "undefined" &&
            replies.reply.length > 0
          ) {
            let replyArr = replies.reply.map((reply) => {
              if (reply.content === buttonValue) {
                return { reply, content: formik.values.content };
              } else {
                return reply;
              }
            });
            return { ...replies, reply: replyArr };
          } else {
            return replies;
          }
        });

        return { ...i, replies: [...repliesArr] };
      } else {
        return i;
      }
    });
    setNewArr(arr);
    console.log(arr);
    setCloseEdit(true);
  };

  const [vote, setVote] = useState(0);
  const localStorageKey = `replyVote${index}`;

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
    const localVote = JSON.parse(localStorage.getItem(localStorageKey));
    if (localVote != null) {
      setVote(localVote);
    }
  }, []);

  return (
    <>
      <div className="bg-white rounded-lg mb-5 flex justify-center items-start gap-10 p-8  w-full">
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
              <p className="w-10  h-10 flex justify-center items-center bg-sky-500 p-5 rounded-full text-white font-bold">
                {username}
              </p>

              <p className="font-bold"> {userId}</p>

              <p className="text-gray-400 font-semibold">{i.createdAt}</p>
            </div>
            <div className=" hidden sm:flex gap-3">
              <div className="sm:flex gap-3 hidden  ">
                <DeleteButton
                  onClick={() => {
                    //   removeButton(i);
                    handleDeleteModal();
                  }}
                />
                <EditButton onClick={() => editButton(i)} />
              </div>
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
                  <Updatebutton onClick={() => updateButton()} />
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
          <RepliesCommentReplyDeleteModal
            i={i}
            handleDeleteModal={handleDeleteModal}
            removeReplyButton={removeReplyButton}
          />
        ) : null}
      </div>
    </>
  );
}

export default RepliesCommentsReply;
