import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const VideoDetailsSideBar = ({ setReviewModal }) => {
    const [activeSectionId, setActiveSectionId] = useState(null);
    const [mobileExpanded, setMobileExpanded] = useState(false);
    const navigate = useNavigate();
    const { courseId, sectionId, subSectionId } = useParams();
    const {
        courseSectionData,
        entireCourseData,
        completedLectures,
        totalNoOfLectures,
    } = useSelector((state) => state.viewCourse);

    useEffect(() => {
        if (!courseSectionData || !courseSectionData.length) return;

        if (sectionId) {
            setActiveSectionId(sectionId);
            return;
        }

        setActiveSectionId(courseSectionData[0]._id);
    }, [courseSectionData, sectionId]);

    return (
        <div className="w-full lg:w-[320px] lg:shrink-0 border-b lg:border-b-0 lg:border-r border-gray-800 bg-gray-900 text-white">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-gray-800 p-4">
                <button
                    onClick={() => navigate("/dashboard/enrolled-courses")}
                    className="flex items-center gap-2 text-xs sm:text-sm text-gray-300 hover:text-white font-medium"
                >
                    <IoMdArrowRoundBack /> Back to Courses
                </button>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setReviewModal(true)}
                        className="rounded-lg border border-yellow-400 px-3 py-1 text-xs font-semibold text-yellow-400 hover:bg-yellow-400 hover:text-black transition"
                    >
                        Add Review
                    </button>

                    {/* Mobile Toggle Button */}
                    <button
                        onClick={() => setMobileExpanded(!mobileExpanded)}
                        className="rounded-lg p-1.5 text-gray-300 hover:bg-gray-800 lg:hidden"
                        aria-label="Toggle curriculum menu"
                    >
                        {mobileExpanded ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                </div>
            </div>

            {/* Course Summary Header */}
            <div className="border-b border-gray-800 p-4">
                <p className="font-bold text-base">{entireCourseData?.courseName}</p>
                <p className="mt-1 text-xs sm:text-sm text-gray-400">
                    Instructor: {entireCourseData?.instructor?.firstName} {entireCourseData?.instructor?.lastName}
                </p>
                <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-yellow-400 font-medium">
                        Progress: {completedLectures.length}/{totalNoOfLectures} lectures completed
                    </span>
                </div>
            </div>

            {/* Curriculum Sections & Lectures List */}
            <div className={`lg:block overflow-y-auto max-h-[50vh] lg:max-h-[calc(100vh-200px)] ${mobileExpanded ? "block" : "hidden"}`}>
                {courseSectionData.map((section) => (
                    <div key={section._id} className="border-b border-gray-800">
                        <button
                            onClick={() =>
                                setActiveSectionId(
                                    activeSectionId === section._id ? null : section._id
                                )
                            }
                            className="w-full px-4 py-3 text-left text-xs sm:text-sm font-semibold flex items-center justify-between hover:bg-gray-800/50"
                        >
                            <span>{section.sectionName}</span>
                            <span className="text-xs text-gray-400 font-normal">
                                ({section.subSection?.length || 0} lectures)
                            </span>
                        </button>

                        {activeSectionId === section._id && (
                            <div className="pb-2 bg-gray-950/40">
                                {section.subSection?.map((subSection) => {
                                    const isActive = subSection._id === subSectionId;
                                    const isCompleted = completedLectures.includes(subSection._id);

                                    return (
                                        <Link
                                            key={subSection._id}
                                            to={`/dashboard/view-course/${courseId}/section/${section._id}/sub-section/${subSection._id}`}
                                            onClick={() => setMobileExpanded(false)}
                                            className={`flex items-center justify-between px-6 py-2.5 text-xs sm:text-sm transition ${
                                                isActive
                                                    ? "bg-yellow-400 text-black font-bold"
                                                    : "text-gray-300 hover:bg-gray-800"
                                            }`}
                                        >
                                            <span className="truncate">{subSection.title}</span>
                                            {isCompleted && <span className="ml-2 text-xs text-green-400 font-bold">✓</span>}
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoDetailsSideBar;
