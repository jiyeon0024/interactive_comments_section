import React from "react";
import { FcGoogle } from "react-icons/fc";

function GoogleButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className=" relative border w-full flex justify-center  items-center border-gray-300  p-4  rounded text-gray-500"
    >
      <FcGoogle
        size={20}
        className="w-[30%] absolute top-[50%] translate-y-[-50%] left-0"
      />
      <span className="w-full bg-blue">Login with Google</span>
    </button>
  );
}

export default GoogleButton;
