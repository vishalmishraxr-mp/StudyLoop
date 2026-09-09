import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { buyCourse } from "../services/operations/studentFeaturesAPI";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import getAvgRating from "../services/utils/avgRating";

import ConfirmationModal from "../components/common/ConfirmationModal";
import Error from "./Error";
import RatingStars from "../components/common/RatingStars";
import { formatDate } from "../services/formatDate";
import CardDetailCourse from "../components/core/course/CardDetailCourse";
import { useDispatch, useSelector } from "react-redux";

const CourseDetail = () => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams();

    const [courseData, setCourseData] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch course details
    useEffect(() => {
        const getCourseDetails = async () => {
            try {
                setLoading(true);

                const result = await fetchCourseDetails(courseId);

                console.log("Course Details:", result);

                if (!result?.success) {
                    setCourseData(result);
                    return;
                }

                setCourseData(result);
            } catch (error) {
                console.error("Could not fetch course details:", error);

                setCourseData({
                    success: false,
                    message: "Could not load course details",
                });
            } finally {
                setLoading(false);
            }
        };

        if (courseId) {
            getCourseDetails();
        }
    }, [courseId]);

    // Buy course
const handleBuyCourse = () => {
    if (!token || !user) {
        setConfirmationModal({
            text1: "You are not logged in",
            text2: "Please login to purchase the course",
            btn1Text: "Login",
            btn2Text: "Cancel",

            btn1Handler: () => {
                setConfirmationModal(null);
                navigate("/login");
            },

            btn2Handler: () => {
                setConfirmationModal(null);
            },
        });

        return;
    }

    buyCourse(
        token,
        [courseId],
        user,
        navigate,
        dispatch
    );
};

    // Loading
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-stone-950 text-white">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-yellow-400" />
                    <p className="mt-4 text-gray-300">
                        Loading course...
                    </p>
                </div>
            </div>
        );
    }

    // Error
    if (!courseData?.success) {
        return <Error />;
    }

    const courseDetail = courseData?.data;

    if (!courseDetail) {
        return <Error />;
    }

    const {
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent = [],
        ratingAndReview = [],
        instructor,
        studentsEnrolled = [],
        createdAt,
    } = courseDetail;

    const avgReviewCount = getAvgRating(ratingAndReview);

    const totalLectureCount = courseContent.reduce(
        (total, section) =>
            total + (section?.subSection?.length || 0),
        0
    );

    return (
        <div className="min-h-screen bg-stone-950 px-4 py-8 text-white sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">

                <div className="relative">

                    <h1 className="text-3xl font-bold sm:text-4xl">
                        {courseName}
                    </h1>

                    <p className="mt-4 max-w-4xl text-base leading-7 text-gray-300 sm:text-lg">
                        {courseDescription}
                    </p>

                    {/* Rating + Students */}
                    <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">

                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-yellow-400">
                                {avgReviewCount.toFixed(1)}
                            </span>

                            <RatingStars
                                Review_Count={avgReviewCount}
                                Star_Size={22}
                            />
                        </div>

                        <span className="text-sm text-gray-400">
                            ({ratingAndReview.length}{" "}
                            {ratingAndReview.length === 1
                                ? "review"
                                : "reviews"})
                        </span>

                        <span className="text-sm text-gray-400">
                            {studentsEnrolled.length} students enrolled
                        </span>
                    </div>

                    {/* Instructor */}
                    <div className="mt-8">
                        <p className="text-gray-300">
                            Created by{" "}
                            <span className="font-semibold text-white">
                                {instructor?.firstName}{" "}
                                {instructor?.lastName}
                            </span>
                        </p>

                        <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-400">
                            <span>
                                Created at {formatDate(createdAt)}
                            </span>

                            <span>English</span>
                        </div>
                    </div>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_420px]">

                    {/* LEFT SIDE */}
                    <div className="min-w-0">

                        {/* What You Will Learn */}
                        {whatYouWillLearn && (
                            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                                <h2 className="text-2xl font-bold">
                                    What You Will Learn
                                </h2>

                                <p className="mt-4 whitespace-pre-line leading-7 text-gray-300">
                                    {whatYouWillLearn}
                                </p>
                            </div>
                        )}

                        {/* Course Content */}
                        <div className="mt-8 rounded-xl border border-gray-800 bg-gray-900 p-6">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <h2 className="text-2xl font-bold">
                                    Course Content
                                </h2>

                                <span className="text-sm text-gray-400">
                                    {courseContent.length} sections •{" "}
                                    {totalLectureCount} lectures
                                </span>
                            </div>

                            <div className="mt-5 space-y-3">
                                {courseContent.length === 0 ? (
                                    <p className="text-gray-400">
                                        No course content available yet.
                                    </p>
                                ) : (
                                    courseContent.map((section, index) => (
                                        <div
                                            key={section?._id || index}
                                            className="rounded-lg border border-gray-800 bg-gray-950/50 p-4"
                                        >
                                            <div className="flex items-center justify-between gap-4">
                                                <p className="font-semibold text-white">
                                                    {index + 1}.{" "}
                                                    {section?.sectionName}
                                                </p>

                                                <span className="shrink-0 text-xs text-gray-400">
                                                    {section?.subSection?.length || 0}{" "}
                                                    lectures
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                
                        <div className="mt-8 rounded-xl border border-gray-800 bg-gray-900 p-6">

                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <h2 className="text-2xl font-bold">
                                        Student Reviews
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-400">
                                        {ratingAndReview.length}{" "}
                                        {ratingAndReview.length === 1
                                            ? "student has"
                                            : "students have"}{" "}
                                        reviewed this course.
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-yellow-400">
                                        {avgReviewCount.toFixed(1)}
                                    </span>

                                    <RatingStars
                                        Review_Count={avgReviewCount}
                                        Star_Size={20}
                                    />
                                </div>
                            </div>

                            {ratingAndReview.length === 0 ? (
                                <div className="mt-6 rounded-lg border border-dashed border-gray-700 p-6 text-center">
                                    <p className="text-gray-400">
                                        No reviews yet.
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Be the first student to review this
                                        course.
                                    </p>
                                </div>
                            ) : (
                                <div className="mt-6 space-y-4">
                                    {ratingAndReview.map((review, index) => (
                                        <div
                                            key={review?._id || index}
                                            className="rounded-xl border border-gray-800 bg-gray-950/60 p-5"
                                        >
                                            <div className="flex items-start justify-between gap-4">

                                                <div className="flex min-w-0 items-center gap-3">
                                                    {review?.user?.image ? (
                                                        <img
                                                            src={review.user.image}
                                                            alt={`${review.user.firstName || "Student"} profile`}
                                                            className="h-10 w-10 shrink-0 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-400 font-bold text-black">
                                                            {review?.user?.firstName
                                                                ?.charAt(0)
                                                                ?.toUpperCase() || "S"}
                                                        </div>
                                                    )}

                                                    <div className="min-w-0">
                                                        <p className="truncate font-semibold text-white">
                                                            {review?.user?.firstName || "Student"}{" "}
                                                            {review?.user?.lastName || ""}
                                                        </p>

                                                        <p className="text-xs text-gray-500">
                                                            Student
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex shrink-0 items-center gap-2">
                                                    <RatingStars
                                                        Review_Count={
                                                            review?.rating
                                                        }
                                                        Star_Size={18}
                                                    />

                                                    <span className="hidden text-sm font-semibold text-yellow-400 sm:block">
                                                        {review?.rating}/5
                                                    </span>
                                                </div>
                                            </div>

                                            <p className="mt-4 leading-7 text-gray-300">
                                                {review?.review}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:sticky lg:top-24 lg:self-start">
                        <CardDetailCourse
                            course={courseDetail}
                            setConfirmationModal={setConfirmationModal}
                            handleBuyCourse={handleBuyCourse}
                        />
                    </div>
                </div>

                {/* Confirmation Modal */}
                {confirmationModal && (
                    <ConfirmationModal
                        modalData={confirmationModal}
                    />
                )}
            </div>
        </div>
    );
};

export default CourseDetail;

