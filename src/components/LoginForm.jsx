import React from "react";

const LoginForm = () => {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center bg-[#e8e8e8] mb-[-150px]">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md mb-44">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
            Login
          </h2>
          <form className="flex flex-col">
            <input
              type="email"
              className="mb-4 rounded-md border-0 bg-gray-100 p-2 text-gray-900 transition duration-150 ease-in-out focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Email address"
            />
            <input
              type="password"
              className="mb-4 rounded-md border-0 bg-gray-100 p-2 text-gray-900 transition duration-150 ease-in-out focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Password"
            />
            <div className="flex flex-wrap items-center justify-between">
              <label
                htmlFor="remember-me"
                className="cursor-pointer text-sm text-gray-900"
              >
                <input type="checkbox" id="remember-me" className="mr-2" />
                Remember me
              </label>
              <a
                href="#"
                className="mb-0.5 text-sm text-blue-500 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <p className="text-md mt-8 text-gray-900">
              Don't have an account?
              <a
                href="#"
                className=" text-md ml-5 text-blue-500 hover:underline"
              >
                Signup
              </a>
            </p>
            <button
              type="submit"
              className="mt-8 rounded-md bg-gradient-to-r from-indigo-500 to-blue-500 px-4 py-2 font-bold text-white transition duration-150 ease-in-out hover:bg-indigo-600 hover:to-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
