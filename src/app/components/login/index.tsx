"use client";
import React, { useState } from "react"


export default function Login() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [hidePassword, setHidePassword] = useState<boolean>(true)
    const [hideCheck, setHideCheck] = useState<boolean>(true);

    async function handleSubmit(e: any) {
        e.preventDefault();
        console.log(email + password);
        setEmail("")
        setPassword("")
    }

    function passwordVisibility() {
      setHidePassword((prev) => !prev);
      setHideCheck((prev) => !prev);
    }

    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-40 w-auto"
              src="./images/greatOceanLogo.png"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type={hidePassword ? "password" : "text"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mid-blue-I sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        className="h-4 w-4 mt-2 rounded border-gray-300 text-mid-blue-I focus:ring-mid-blue-I"
                        type="checkbox"
                        id="login-checkbox"
                        checked={!hideCheck}
                        onChange={passwordVisibility}
                        style={{ cursor: "pointer" }}
                      />
                      <label
                        className="absolute pb-1.5 mt-4 sm:mt-4 ml-5 font-medium text-sm leading-6 text-gray-900 cursor-pointer"
                        htmlFor="login-checkbox"
                      >
                        Show password
                      </label>
                    </div>
                  </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-mid-blue-I px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-light-blue-I focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mid-blue-I"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
  