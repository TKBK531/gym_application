import React from "react";

const Login = () => (
  <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
    <div className="bg-white shadow-md rounded-lg px-8 pb-8 sm:mx-4 sm:w-full md:w-1/2 lg:w-1/3">
      <div className="font-poppins font-medium xs:text-[64px] text-[40px] text-black xs:leading-[76.8px] leading-[66.8px] w-full">
        WELCOME BACK
      </div>

      <div className="mb-6">
        <label
          htmlFor="email"
          className="font-poppins font-medium text-gray-700 text-sm mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="shadow appearance-none border rounded-w-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          placeholder="Enter your email"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="password"
          className="text-gray-700 text-sm font-bold mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="shadow appearance-none border rounded-w-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          placeholder="Password"
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
          />
          <label htmlFor="remember-me" className="text-gray-700 text-sm ml-2">
            Remember me
          </label>
        </div>
        <a href="#" className="text-sm text-gray-600 hover:underline">
          Forgot password?
        </a>
      </div>

      <button className="btn-primary w-full py-2 px-4 bg-blue-400 hover:bg-blue-500 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 text-center text-white font-bold shadow-sm sm:rounded-md">
        Login
      </button>

      <div className="flex items-center mt-6">
        <a
          href="#"
          className="text-center w-full pb-2 text-gray-600 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          G Sign in with Google
        </a>
      </div>

      <div className="text-center text-sm mt-4">
        <p>Don&apos;t have an account? </p>
        <a href="#" className="text-blue-500 hover:underline">
          Sign up here
        </a>
      </div>
    </div>
  </div>
);

export default Login;
