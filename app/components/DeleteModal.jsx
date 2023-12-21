import React from "react";
import NoCancelBtn from "./NoCancelBtn";
import YesDeleteBtn from "./YesDeleteBtn";
function DeleteModal({ handleDeleteModal, removeButton, i }) {
  return (
    <div className=" fixed top-0 left-0  w-full h-full bg-[#00000099]  flex justify-start items-center">
      <div className="absolute bg-white w-[400px]  p-6 rounded-xl left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] mt-20 ">
        <h1 className="font-bold text-gray-700 text-2xl mb-6">
          Delete comment
        </h1>

        <p className="text-gray-500 pb-3 w-[32ch]">
          Are you sure you want to delete this comment? This will remove the
          comment and cna't be undone.
        </p>
        <div className="flex gap-3 pb-3">
          <NoCancelBtn handleDeleteModal={handleDeleteModal} />
          <YesDeleteBtn removeButton={removeButton} i={i} />
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
