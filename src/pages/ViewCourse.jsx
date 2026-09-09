import React, { useEffect, useState } from "react";
import VideoDetailsSideBar from "../components/core/ViewCourse/VideoDetailsSideBar";
import VideoDetails from "../components/core/ViewCourse/VideoDetails";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { getFullDetailsOfCourse, createRating } from "../services/operations/courseDetailsAPI";
import {
    setCourseSectionData,
    setEntireCourseData,
    setCompletedLectures,
    setTotalNoOfLectures,
} from "../slices/viewCourseSlice";

const ViewCourse = () => {
    const [reviewModal, setReviewModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const setCourseSpecificDetails = async () => {
            setLoading(true);
            const courseData = await getFullDetailsOfCourse(courseId, token);

            if (!courseData?.success) {
                toast.error(courseData?.message || "Could not load this course");
                setLoading(false);
                return;
            }

            dispatch(setCourseSectionData(courseData.data.courseContent || []));
            dispatch(setEntireCourseData(courseData.data));
            dispatch(setCompletedLectures([]));

            let lecture = 0;
            courseData.data.courseContent?.forEach((sec) => {
                lecture += sec.subSection?.length || 0;
            });
            dispatch(setTotalNoOfLectures(lecture));

            setLoading(false);
        };

        setCourseSpecificDetails();
    }, [courseId, token]);

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center text-white">
                Loading course...
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col lg:flex-row min-h-[calc(100vh-56px)] bg-gray-950">
                <VideoDetailsSideBar setReviewModal={setReviewModal} />
                <div className="flex-1 overflow-y-auto">
                    <VideoDetails />
                </div>
            </div>
            {reviewModal && (
                <AddReviewModal courseId={courseId} setReviewModal={setReviewModal} />
            )}
        </>
    );
};

const AddReviewModal = ({ courseId, setReviewModal }) => {
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const { token } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!review.trim()) {
            toast.error("Please write a review before submitting");
            return;
        }

        setSubmitting(true);
        const result = await createRating({ courseId, rating, review }, token);
        setSubmitting(false);

        if (result?.success) {
            toast.success("Review submitted successfully");
            setReviewModal(false);
        } else {
            toast.error(result?.message || "Could not submit review");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 p-4">
            <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-xl w-full max-w-md border border-gray-700">
                <h2 className="text-xl font-bold mb-4">Submit Course Review</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="rating">
                            Rating
                        </label>
                        <select
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="w-full rounded-lg bg-gray-700 px-3 py-2 text-white outline-none"
                        >
                            {[5, 4, 3, 2, 1].map((value) => (
                                <option key={value} value={value}>{value} Star{value > 1 ? "s" : ""}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="review">
                            Review
                        </label>
                        <textarea
                            id="review"
                            rows="4"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            className="w-full rounded-lg bg-gray-700 px-3 py-2 text-white outline-none"
                            placeholder="Share your learning experience..."
                        ></textarea>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => setReviewModal(false)}
                            className="rounded-lg border border-gray-600 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="rounded-lg bg-yellow-400 px-5 py-2 text-sm font-semibold text-black hover:bg-yellow-500 disabled:opacity-50"
                        >
                            {submitting ? "Submitting..." : "Submit Review"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ViewCourse;
