import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { IoMdArrowRoundBack } from "react-icons/io";
import {
    FaChevronDown,
    FaChevronUp,
} from "react-icons/fa";

const VideoDetailsSideBar = ({ setReviewModal }) => {
    const [activeSectionId, setActiveSectionId] =
        useState(null);

    const [mobileExpanded, setMobileExpanded] =
        useState(false);

    const navigate = useNavigate();

    const {
        courseId,
        sectionId,
        subSectionId,
    } = useParams();

    const {
        courseSectionData = [],
        entireCourseData,
        completedLectures = [],
        totalNoOfLectures = 0,
    } = useSelector((state) => state.viewCourse);

    // Automatically open the current section.
    useEffect(() => {
        if (!courseSectionData.length) {
            setActiveSectionId(null);
            return;
        }

        if (sectionId) {
            const sectionExists =
                courseSectionData.some(
                    (section) =>
                        section._id === sectionId
                );

            if (sectionExists) {
                setActiveSectionId(sectionId);
                return;
            }
        }

        setActiveSectionId(
            courseSectionData[0]?._id || null
        );
    }, [courseSectionData, sectionId]);

    const handleSectionToggle = (sectionIdToToggle) => {
        setActiveSectionId((currentId) =>
            currentId === sectionIdToToggle
                ? null
                : sectionIdToToggle
        );
    };

    const handleMobileToggle = () => {
        setMobileExpanded((previous) => !previous);
    };

    return (
        <aside className="w-full shrink-0 border-b border-gray-800 bg-gray-900 text-white lg:w-[320px] lg:border-b-0 lg:border-r">

            <div className="flex items-center justify-between border-b border-gray-800 p-4">

                {/* Back */}
                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            "/dashboard/enrolled-courses"
                        )
                    }
                    className="flex items-center gap-2 text-xs font-medium text-gray-300 transition hover:text-white sm:text-sm"
                >
                    <IoMdArrowRoundBack />

                    <span>
                        Back to Courses
                    </span>
                </button>

                <div className="flex items-center gap-2">

                    {/* Review */}
                    <button
                        type="button"
                        onClick={() =>
                            setReviewModal(true)
                        }
                        className="rounded-lg border border-yellow-400 px-3 py-1.5 text-xs font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
                    >
                        Add Review
                    </button>

                    {/* Mobile curriculum toggle */}
                    <button
                        type="button"
                        onClick={handleMobileToggle}
                        className="rounded-lg p-2 text-gray-300 transition hover:bg-gray-800 hover:text-white lg:hidden"
                        aria-label={
                            mobileExpanded
                                ? "Collapse curriculum"
                                : "Expand curriculum"
                        }
                        aria-expanded={
                            mobileExpanded
                        }
                    >
                        {mobileExpanded ? (
                            <FaChevronUp />
                        ) : (
                            <FaChevronDown />
                        )}
                    </button>
                </div>
            </div>

            <div className="border-b border-gray-800 p-4">

                <p className="font-bold text-base">
                    {entireCourseData?.courseName ||
                        "Course"}
                </p>

                <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                    Instructor:{" "}
                    {entireCourseData?.instructor
                        ?.firstName || ""}{" "}
                    {entireCourseData?.instructor
                        ?.lastName || ""}
                </p>

                <div className="mt-3">
                    <span className="text-xs font-medium text-yellow-400">
                        Progress:{" "}
                        {completedLectures.length}/
                        {totalNoOfLectures} lectures
                        completed
                    </span>
                </div>
            </div>

            <div
                className={`
                    overflow-y-auto
                    max-h-[55vh]
                    lg:block
                    lg:max-h-[calc(100vh-190px)]
                    ${mobileExpanded
                        ? "block"
                        : "hidden"
                    }
                `}
            >
                {!courseSectionData.length ? (
                    <div className="p-5 text-sm text-gray-400">
                        No lectures available.
                    </div>
                ) : (
                    courseSectionData.map(
                        (section, sectionIndex) => {
                            const isSectionOpen =
                                activeSectionId ===
                                section._id;

                            return (
                                <div
                                    key={
                                        section._id ||
                                        sectionIndex
                                    }
                                    className="border-b border-gray-800"
                                >
                                    {/* Section Header */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleSectionToggle(
                                                section._id
                                            )
                                        }
                                        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-xs font-semibold transition hover:bg-gray-800/70 sm:text-sm"
                                        aria-expanded={
                                            isSectionOpen
                                        }
                                    >
                                        <div className="flex min-w-0 items-center gap-2">
                                            <span className="shrink-0 text-gray-500">
                                                {sectionIndex +
                                                    1}
                                                .
                                            </span>

                                            <span className="truncate">
                                                {
                                                    section.sectionName
                                                }
                                            </span>
                                        </div>

                                        <div className="flex shrink-0 items-center gap-2">
                                            <span className="text-xs font-normal text-gray-500">
                                                (
                                                {section
                                                    .subSection
                                                    ?.length ||
                                                    0}{" "}
                                                lectures)
                                            </span>

                                            {isSectionOpen ? (
                                                <FaChevronUp className="text-xs text-gray-400" />
                                            ) : (
                                                <FaChevronDown className="text-xs text-gray-400" />
                                            )}
                                        </div>
                                    </button>

                                    {/* Lectures */}
                                    {isSectionOpen && (
                                        <div className="bg-gray-950/60 pb-2">
                                            {section.subSection
                                                ?.length ? (
                                                section.subSection.map(
                                                    (
                                                        subSection
                                                    ) => {
                                                        const isActive =
                                                            subSection._id ===
                                                            subSectionId;

                                                        const isCompleted =
                                                            completedLectures.some(
                                                                (
                                                                    completedId
                                                                ) =>
                                                                    completedId?.toString() ===
                                                                    subSection._id?.toString()
                                                            );

                                                        return (
                                                            <Link
                                                                key={
                                                                    subSection._id
                                                                }
                                                                to={`/dashboard/view-course/${courseId}/section/${section._id}/sub-section/${subSection._id}`}
                                                                className={`
                                                                    flex
                                                                    items-center
                                                                    justify-between
                                                                    gap-3
                                                                    px-6
                                                                    py-2.5
                                                                    text-xs
                                                                    transition
                                                                    sm:text-sm
                                                                    ${
                                                                        isActive
                                                                            ? "bg-yellow-400 font-bold text-black"
                                                                            : "text-gray-300 hover:bg-gray-800"
                                                                    }
                                                                `}
                                                            >
                                                                <span className="min-w-0 truncate">
                                                                    {
                                                                        subSection.title
                                                                    }
                                                                </span>

                                                                {isCompleted && (
                                                                    <span
                                                                        className={`
                                                                            shrink-0
                                                                            text-xs
                                                                            font-bold
                                                                            ${
                                                                                isActive
                                                                                    ? "text-black"
                                                                                    : "text-green-400"
                                                                            }
                                                                        `}
                                                                    >
                                                                        ✓
                                                                    </span>
                                                                )}
                                                            </Link>
                                                        );
                                                    }
                                                )
                                            ) : (
                                                <p className="px-6 py-3 text-xs text-gray-500">
                                                    No lectures in this section.
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        }
                    )
                )}
            </div>
        </aside>
    );
};

export default VideoDetailsSideBar;

