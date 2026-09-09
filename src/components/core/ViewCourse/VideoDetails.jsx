import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setCompletedLectures } from "../../../slices/viewCourseSlice";
import { toast } from "react-hot-toast";
import { FaCheckCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const VideoDetails = () => {
    const { courseId, sectionId, subSectionId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { courseSectionData, completedLectures } = useSelector((state) => state.viewCourse);

    const [videoData, setVideoData] = useState(null);
    const [currentSectionId, setCurrentSectionId] = useState(null);

    useEffect(() => {
        if (!courseSectionData || courseSectionData.length === 0) return;

        // If specific section and subSection are in URL
        if (sectionId && subSectionId) {
            const sec = courseSectionData.find((s) => s._id === sectionId);
            const subSec = sec?.subSection?.find((s) => s._id === subSectionId);

            if (subSec) {
                setVideoData(subSec);
                setCurrentSectionId(sec._id);
                return;
            }
        }

        // Default: Load first lecture of first section if not specified in URL
        for (const sec of courseSectionData) {
            if (sec.subSection && sec.subSection.length > 0) {
                setVideoData(sec.subSection[0]);
                setCurrentSectionId(sec._id);
                // Optionally update URL to match first lecture
                navigate(`/dashboard/view-course/${courseId}/section/${sec._id}/sub-section/${sec.subSection[0]._id}`, { replace: true });
                break;
            }
        }
    }, [courseSectionData, sectionId, subSectionId, courseId]);

    // Find Previous & Next lectures
    const getNavLectures = () => {
        if (!courseSectionData || !videoData) return { prev: null, next: null };

        const allLectures = [];
        courseSectionData.forEach((sec) => {
            (sec.subSection || []).forEach((subSec) => {
                allLectures.push({ secId: sec._id, subSec });
            });
        });

        const currentIndex = allLectures.findIndex((item) => item.subSec._id === videoData._id);
        const prev = currentIndex > 0 ? allLectures[currentIndex - 1] : null;
        const next = currentIndex < allLectures.length - 1 ? allLectures[currentIndex + 1] : null;

        return { prev, next };
    };

    const { prev, next } = getNavLectures();
    const isCompleted = completedLectures.includes(videoData?._id);

    const handleToggleCompleted = () => {
        if (!videoData) return;

        if (isCompleted) {
            dispatch(setCompletedLectures(completedLectures.filter((id) => id !== videoData._id)));
            toast.success("Marked as incomplete");
        } else {
            dispatch(setCompletedLectures([...completedLectures, videoData._id]));
            toast.success("Lecture marked as completed! 🎉");
        }
    };

    if (!courseSectionData || courseSectionData.length === 0) {
        return (
            <div className="flex h-full min-h-[400px] flex-col items-center justify-center p-8 text-white">
                <p className="text-lg text-gray-400">No content or sections available for this course yet.</p>
            </div>
        );
    }

    if (!videoData) {
        return (
            <div className="flex h-full min-h-[400px] flex-col items-center justify-center p-8 text-white">
                <p className="text-lg text-gray-400">Select a lecture from the sidebar to start watching.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col p-6 text-white max-w-5xl mx-auto">
            {/* Video Player */}
            <div className="relative w-full overflow-hidden rounded-2xl bg-black border border-gray-800 shadow-2xl">
                {videoData.videoUrl ? (
                    <video
                        key={videoData.videoUrl}
                        controls
                        controlsList="nodownload"
                        playsInline
                        className="w-full aspect-video rounded-2xl object-contain bg-black"
                    >
                        <source src={videoData.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <div className="flex aspect-video items-center justify-center text-gray-400">
                        No video URL uploaded for this lecture.
                    </div>
                )}
            </div>

            {/* Lecture Header & Action Controls */}
            <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
                <div>
                    <h1 className="text-2xl font-bold">{videoData.title}</h1>
                    {videoData.timeDuration && (
                        <span className="mt-1 inline-block rounded bg-gray-800 px-2.5 py-0.5 text-xs text-gray-300">
                            ⏱️ Duration: {videoData.timeDuration}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleToggleCompleted}
                        className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                            isCompleted
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : "bg-yellow-400 text-black hover:bg-yellow-500"
                        }`}
                    >
                        <FaCheckCircle />
                        {isCompleted ? "Completed ✓" : "Mark as Completed"}
                    </button>
                </div>
            </div>

            {/* Navigation (Prev / Next) */}
            <div className="mt-6 flex items-center justify-between">
                <button
                    disabled={!prev}
                    onClick={() =>
                        prev &&
                        navigate(
                            `/dashboard/view-course/${courseId}/section/${prev.secId}/sub-section/${prev.subSec._id}`
                        )
                    }
                    className="flex items-center gap-2 rounded-xl border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <FaChevronLeft /> Previous Lecture
                </button>

                <button
                    disabled={!next}
                    onClick={() =>
                        next &&
                        navigate(
                            `/dashboard/view-course/${courseId}/section/${next.secId}/sub-section/${next.subSec._id}`
                        )
                    }
                    className="flex items-center gap-2 rounded-xl bg-yellow-400 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-500 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    Next Lecture <FaChevronRight />
                </button>
            </div>

            {/* Description */}
            <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
                <h3 className="text-lg font-bold mb-2">About this Lecture</h3>
                <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                    {videoData.description || "No description provided for this lecture."}
                </p>
            </div>
        </div>
    );
};

export default VideoDetails;

