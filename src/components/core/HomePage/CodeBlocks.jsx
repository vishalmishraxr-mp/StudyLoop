

import React from "react";
import CTAButton from "../HomePage/Button";
import { FaArrowRightLong } from "react-icons/fa6";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblocks,
  codeColor,
}) => {
  return (
    <div
      className={`mx-auto my-20 flex w-[92%] min-w-0 flex-col items-center gap-12 sm:w-[88%] lg:w-[75%] ${position}`}
    >

      {/* TEXT SECTION */}
      <div className="w-full min-w-0 lg:w-[45%]">
        <div className="flex flex-col gap-6">
          {heading}

          <p className="text-sm leading-6 text-gray-400 sm:text-base">
            {subheading}
          </p>

          <div className="flex flex-wrap gap-4">
            <CTAButton
              active={ctabtn1.active}
              linkto={ctabtn1.linkto}
            >
              <div className="flex items-center gap-2">
                {ctabtn1.btnText}
                <FaArrowRightLong />
              </div>
            </CTAButton>

            <CTAButton
              active={ctabtn2.active}
              linkto={ctabtn2.linkto}
            >
              {ctabtn2.btnText}
            </CTAButton>
          </div>
        </div>
      </div>

      {/* CODE SECTION */}
      <div className="relative w-full min-w-0 lg:w-[55%]">

        <div className="absolute -inset-5 -z-10 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-3xl" />

        <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-950 shadow-2xl shadow-blue-500/10">

          {/* top bar */}
          <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>

          {/* code */}
          <div className="flex min-w-0 p-4">

            {/* line numbers */}
            <div className="w-8 shrink-0 text-center font-mono text-xs leading-6 text-slate-600">
              {Array.from({ length: 11 }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* actual code */}
            <div
              className={`min-w-0 flex-1 overflow-x-auto font-mono text-xs leading-6 sm:text-sm ${codeColor}`}
            >
              <TypeAnimation
                sequence={[codeblocks, 5000, ""]}
                repeat={Infinity}
                cursor={true}
                omitDeletionAnimation={true}
                style={{
                  whiteSpace: "pre-line",
                  display: "block",
                }}
              />
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default CodeBlocks;