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

function CommentsCard({ newArr, setNewArr, i, index }) {
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

  const formik = useFormik({
    initialValues: {
      content: i?.content,
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

  const removeButton = (val) => {
    let filtered = newArr.filter((i) => val !== i);
    setNewArr(filtered);
    setDeleteModal(false);
  };

  const editButton = (val) => {
    setButtonValue(val.content);

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

    setCloseEdit(true);
  };

  return (
    <>
      <div className="flex flex-col gap-5 w-full h-full  ">
        <div className="bg-white rounded-lg  flex justify-center items-start gap-10 p-8 w-full h-full ">
          <div className="sm:flex flex-col items-center justify-center  hidden  ">
            <VoteButton index={index} />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div className="flex justify-between items-center gap-3">
              <div className="flex  items-center gap-3">
                {i.user?.image?.png ? (
                  <img src={i.user?.image?.png} alt="" className="w-10" />
                ) : (
                  <div className="w-10  h-10 flex justify-center items-center bg-sky-500 p-5 rounded-full text-white font-bold">
                    {username}
                  </div>
                )}
                {i?.user?.username ? (
                  <p className="font-bold">{i?.user?.username}</p>
                ) : (
                  <p className="font-bold">{userId}</p>
                )}
                {i.createdAt ? (
                  <p className="text-gray-400 font-semibold">{i.createdAt}</p>
                ) : (
                  <p className="text-gray-400 font-semibold">Today</p>
                )}
              </div>

              {i.id === 1 || i.id == 2 ? (
                <div className="hidden sm:block">
                  <ReplyButton onClick={() => handleClick(i)} />
                </div>
              ) : (
                <div className="sm:flex gap-3 hidden  ">
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
                    <Updatebutton onClick={() => updateButton()} />
                  </div>
                </form>
              ) : (
                <p className="text-gray-600 w-full  break-words ">
                  {i.content}
                </p>
              )}
              <div className=" pt-5 sm:pt-0 flex justify-between items-center sm:hidden">
                <VoteButton index={index} />{" "}
                {i.id === 1 || i.id == 2 ? (
                  <div className="block sm:hidden">
                    <ReplyButton onClick={() => handleClick(i)} />
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
          </div>
          {deleteModal ? (
            <DeleteModal
              handleDeleteModal={handleDeleteModal}
              removeButton={removeButton}
              i={i}
            />
          ) : null}
        </div>
        {click ? (
          <InputReplyCard
            id={i.id}
            newArr={newArr}
            setNewArr={setNewArr}
            setClick={setClick}
            i={i}
          />
        ) : null}
        <div className="  w-full  flex justify-end  ">
          <div className=" w-[95%] flex  flex-col items-end   border-l-2 border-gray-200 pl-3 sm:pl-6  ">
            {i.replies?.map((i, j) => {
              return (
                <ReplyCard
                  j={j}
                  i={i}
                  key={j}
                  newArr={newArr}
                  setNewArr={setNewArr}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentsCard;
