"use client";

import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import GoogleButton from "../components/GoogleButton";
import FacebookButton from "../components/FacebookButton";
import { loginValidator } from "../util/validationSchema";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { getUerInfo } from "../api/userApi";
import { useQuery } from "react-query";
import { useContext } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";
function login() {
  const { loggedIn, setLoggedIn, user, setUser } = useAuthContext();

  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryFn: () => getUerInfo(),
    queryKey: ["users"],
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidator,
    onSubmit: (values) => {
      data.data.forEach((i) => {
        if (values.email === i.email && values.password === i.login.password) {
          setUser(values);
          setLoggedIn(true);
          localStorage.setItem("localUser", JSON.stringify(values));
        }
      });
    },
  });

  console.log(data);
  //   console.log(user);
  //   console.log(loggedIn);

  useEffect(() => {
    if (loggedIn) {
      localStorage.setItem("loggedIn", loggedIn);
      //   const localUser = JSON.parse(localStorage.getItem("localUser"));
      //   setUser(localUser);
      router.push("/");
    }
  }, [loggedIn]);

  //   useEffect(() => {
  //     const localLoggedIn = localStorage.getItem("loggedIn");
  //     if (localLoggedIn) {
  //       return setLoggedIn(true);
  //     }
  //   }, []);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className=" flex  flex-col gap-8 bg-white w-[750px] h-[700px] max-w-[100%] rounded m-auto mt-20 p-20 "
    >
      <h1 className="font-extrabold text-4xl">Login</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex  flex-col gap-5">
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="email" className="font-bold text-gray-500 pb-2">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Enter email address"
              className="outline-none border border-gray-300 rounded p-3 w-full"
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500">{formik.errors.email}</p>
            ) : null}
          </div>
          <div className="flex flex-col items-start justify-center pb-5">
            <label htmlFor="password" className="font-bold text-gray-500 pb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="Enter password"
              className="outline-none border border-gray-300 rounded p-3 w-full"
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500">{formik.errors.password}</p>
            ) : null}
          </div>
          <div>
            <Button>Login</Button>

            <p className="text-center pt-3 pb-3 text-gray-500 font-bold">or</p>
            <div className=" flex flex-col gap-5">
              <GoogleButton />
              <FacebookButton />
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

export default login;
