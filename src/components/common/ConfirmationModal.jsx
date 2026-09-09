
import React from "react";

const ConfirmationModal = ({ modalData }) => {
  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center bg-black/50 backdrop-blur-sm">

      <div className="w-[90%] max-w-[400px] rounded-xl border border-stone-700 bg-stone-900 p-6 text-center shadow-2xl">

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-white">
          {modalData?.text1}
        </h2>

        {/* Message */}
        <p className="mt-3 text-gray-400">
          {modalData?.text2}
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4">

          <button
            onClick={modalData?.btn1Handler}
            className="rounded-md bg-yellow-400 px-5 py-2.5 font-semibold text-black transition hover:bg-yellow-300"
          >
            {modalData?.btn1Text}
          </button>

          <button
            onClick={modalData?.btn2Handler}
            className="rounded-md border border-stone-600 px-5 py-2.5 font-semibold text-white transition hover:bg-stone-800"
          >
            {modalData?.btn2Text}
          </button>

        </div>

      </div>

    </div>
  );
};

export default ConfirmationModal;