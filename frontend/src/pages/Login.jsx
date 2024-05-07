import React from "react";

const Login = () => (
  <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
    <div className="bg-white shadow-md rounded-lg px-8 pb-8 sm:mx-4 w-full max-w-sm md:max-w-md lg:max-w-lg flex flex-col items-center">
      <h1 className="font-medium text-2xl mb-6 md:text-3xl text-black leading-tight">
        WELCOME BACK
      </h1>

      <div className="mb-6 w-full max-w-sm">
        <label
          htmlFor="email"
          className="font-poppins block text-gray-700 text-sm mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="font-poppins text-sm w-full shadow appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          placeholder="Enter your email"
        />
      </div>

      <div className="mb-6 w-full max-w-sm">
        <label
          htmlFor="password"
          className="font-poppins font-medium text-gray-700 text-sm"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="font-poppins text-sm w-full shadow appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          placeholder="Password"
        />
      </div>

      <div className="flex items-center justify-between mb-4 w-full max-w-sm">
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

      <button className="w-full max-w-sm py-2 px-4 bg-primary hover:bg-primary_shade_2 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 text-center text-white font-bold shadow-sm rounded-md">
        Login
      </button>

      <div className="flex items-center mt-6 w-[50%]">
        <a
          href="#"
          className="font-poppins text-center w-full pb-2 text-gray-600 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          G Sign in with Google
        </a>
      </div>

      <div className="font-poppins flex gap-2 text-sm mt-4 w-[50%]">
        <p>Don&apos;t have an account? </p>
        <a href="#" className="text-primary_shade_1 hover:underline">
          Sign up here
        </a>
      </div>
    </div>
  </div>
);

export default Login;
