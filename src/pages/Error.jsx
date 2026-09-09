
import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-950 px-6 text-white">
      <div className="text-center">

        <h1 className="text-7xl font-bold text-yellow-400">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-semibold">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-400">
          Sorry, the page or course you are looking for does not exist.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-8 rounded-md bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-300"
        >
          Go to Home
        </button>

      </div>
    </div>
  );
};

export default Error;

