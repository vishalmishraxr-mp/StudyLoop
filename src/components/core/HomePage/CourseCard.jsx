import React from "react";
import { FaBookOpen, FaArrowRight } from "react-icons/fa";

const CourseCard = ({ course }) => {
    return (
        <div className="
            w-full
            max-w-[320px]
            bg-gray-800
            border border-gray-700
            rounded-xl
            p-5
            transition-all
            hover:bg-white text-black duration-300
            hover:border-gray-500
            hover:shadow-xl
            flex flex-col
            mb-5
        ">

            <h2 className="
                text-xl
                font-semibold
                text-gray-400
                mb-3
            ">
                {course.heading}
            </h2>

            <p className="
                text-sm
                text-gray-400
                leading-6
                line-clamp-3
            ">
                {course.description}
            </p>

            <div className="
                flex
                items-center
                justify-between
                mt-5
                text-sm
            ">

                <span className="
                    px-3
                    py-1
                    rounded-full
                    bg-gray-700
                    text-gray-300
                ">
                    {course.level}
                </span>

                <div className="
                    flex
                    items-center
                    gap-2
                    text-gray-400
                ">
                    <FaBookOpen />
                    <span>
                        {course.lessionNumber} Lessons
                    </span>
                </div>

            </div>

            <div className="
                mt-6
                pt-4
                border-t
                border-gray-700
                flex
                items-center
                justify-between
            ">
                <span className="text-gray-400 text-sm">
                    Start Learning
                </span>

                <FaArrowRight className="text-white" />
            </div>

        </div>
    );
};

export default CourseCard;