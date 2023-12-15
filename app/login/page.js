import React from "react";
import Button from "../components/Button";
import GoogleButton from "../components/GoogleButton";
import FacebookButton from "../components/FacebookButton";
function login() {
  return (
    <form className=" flex  flex-col gap-8 bg-white w-[750px]  max-w-[100%] rounded m-auto mt-20 p-20 ">
      <h1 className="font-extrabold text-4xl">Login</h1>
      <div className="flex flex-col items-start justify-center">
        <label htmlFor="" className="font-bold text-gray-500 pb-2">
          Email address
        </label>
        <input
          type="email"
          placeholder="Enter email address"
          className="outline-none border border-gray-300 rounded p-3 w-full"
        />
      </div>
      <div className="flex flex-col items-start justify-center">
        <label htmlFor="" className="font-bold text-gray-500 pb-2">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter password"
          className="outline-none border border-gray-300 rounded p-3 w-full"
        />
      </div>
      <div>
        <Button>Login</Button>
        <p className="text-center pt-3 pb-3 text-gray-500 font-bold">or</p>
        <div className=" flex flex-col gap-5">
          <GoogleButton />
          <FacebookButton />
        </div>
      </div>
    </form>
  );
}

export default login;
