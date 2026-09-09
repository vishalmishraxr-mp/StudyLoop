import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { changeCourseStatus } from "../../../../services/operations/courseCreateAPI";
import { COURSE_STATUS } from "../../../../services/utils/constants";

const PublishCourse = ({ course, onBack }) => {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const totalLectures = (course?.courseContent || []).reduce(
        (total, section) => total + (section.subSection || []).length,
        0
    );

    const handlePublish = async (status) => {
        setLoading(true);
        const response = await changeCourseStatus(course._id, status, token);
        setLoading(false);

        if (response.success) {
            navigate("/dashboard/instructor");
        }
    };

    return (
        <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
            <h2 className="text-xl font-semibold">{course?.courseName}</h2>
            <p className="mt-2 text-gray-400">{course?.courseDescription}</p>

            <div className="mt-4 flex gap-6 text-sm text-gray-300">
                <p>{course?.courseContent?.length || 0} sections</p>
                <p>{totalLectures} lectures</p>
                <p>₹{course?.price}</p>
            </div>

            <p className="mt-6 text-gray-300">
                Your course is currently saved as a <span className="font-semibold text-yellow-400">Draft</span>.
                Publish it to make it visible to students, or keep it as a draft to keep editing later.
            </p>

            <div className="mt-6 flex gap-3">
                <button
                    onClick={onBack}
                    className="rounded-lg border border-gray-600 px-6 py-2.5 font-semibold text-gray-300 hover:bg-gray-700"
                >
                    Back
                </button>
                <button
                    onClick={() => handlePublish(COURSE_STATUS.DRAFT)}
                    disabled={loading}
                    className="rounded-lg border border-gray-600 px-6 py-2.5 font-semibold text-gray-300 hover:bg-gray-700 disabled:opacity-50"
                >
                    Save as Draft
                </button>
                <button
                    onClick={() => handlePublish(COURSE_STATUS.PUBLISHED)}
                    disabled={loading}
                    className="rounded-lg bg-yellow-400 px-6 py-2.5 font-semibold text-black hover:bg-yellow-500 disabled:opacity-50"
                >
                    {loading ? "Publishing..." : "Publish Course"}
                </button>
            </div>
        </div>
    );
};

export default PublishCourse;
