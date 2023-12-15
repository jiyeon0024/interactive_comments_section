import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
function FacebookButton({ onClick }) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className=" relative border w-full flex justify-center gap-10 items-center border-gray-300  p-4 rounded text-white bg-[#0165E1]"
    >
      <FaFacebookSquare
        size={20}
        className="text-white w-[30%] absolute top-[50%] translate-y-[-50%] left-0"
      />{" "}
      Login with Facebook
    </button>
  );
}

export default FacebookButton;
