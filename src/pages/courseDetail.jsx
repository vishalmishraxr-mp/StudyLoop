
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { buyCourse } from "../services/operations/studentFeaturesAPI";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import getAvgRating from "../services/utils/avgRating";

import ConfirmationModal from "../components/common/ConfirmationModal";
import Error from "./Error";
import RatingStars from "../components/common/RatingStars";
import { formatDate } from "../services/formatDate";
import CardDetailCourse from "../components/core/course/CardDetailCourse"


const CourseDetail = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courseId } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [totalLectureCount, setTotalLectureCount] = useState(0);

  // Fetch course details
  useEffect(() => {
    const getCourseDetails = async () => {
      try {
        console.log("Course ID:", courseId);

        const result = await fetchCourseDetails(courseId);

        console.log("Course Details:", result);

        setCourseData(result);
      } catch (error) {
        console.log("Could not fetch course details:", error);
      }
    };

    if (courseId) {
      getCourseDetails();
    }
  }, [courseId]);

  // Calculate average rating
  useEffect(() => {
    if (courseData?.data?.courseDetail?.ratingAndReview) {
      try {
        const count = getAvgRating(
          courseData.data.courseDetail.ratingAndReview
        );

        setAvgReviewCount(count);
      } catch (error) {
        console.log("Error calculating average rating:", error);
      }
    }
  }, [courseData]);

  // Calculate total lectures
  useEffect(() => {
    const courseContent =
      courseData?.data?.courseContent || [];

    let lecture = 0;

    courseContent.forEach((section) => {
      lecture += section?.subSection?.length || 0;
    });

    setTotalLectureCount(lecture);
  }, [courseData]);

  // Buy course
  const handleBuyCourse = () => {
    if (!token || !user) {
        setConfirmationModal({
            text1: "You are not logged in",
            text2: "Please login to purchase the course",
            btn1Text: "Login",
            btn2Text: "Cancel",

            btn1Handler: () => navigate("/login"),

            btn2Handler: () => setConfirmationModal(null),
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
  if (loading || !courseData) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        Loading...
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
    courseContent,
    ratingAndReview,
    instructor,
    studentEnrolled,
    createdAt,
  } = courseDetail;

  return (
    <div className="min-h-screen bg-stone-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">

        <div className="relative flex flex-col justify-start">
          {/* Course Name */}
        <h1 className="text-4xl font-bold">
          {courseName}
        </h1>

        {/* Description */}
        <p className="mt-4 text-lg text-gray-300">
          {courseDescription}
        </p>

        {/* Rating */}
        <div className="mt-6 flex items-center gap-4">

          <span className="text-yellow-400 font-semibold">
            {avgReviewCount}
          </span>

          <RatingStars
            Review_Count={avgReviewCount}
            Star_Size={24}
          />
          <span className="text-gray-300">
            ({ratingAndReview?.length || 0} reviews)
          </span>

          <span className="text-gray-300">
            ({studentEnrolled?.length || 0} students enrolled)
          </span>
        </div>
        <div className="mt-9">
          <p>Created By {`${instructor.firstName}`}</p>
        </div>
        <div className="mt-4">
          <p>Created at {`${formatDate(createdAt)}`}</p>

          <p>
            {" "} English
          </p>
        </div>
    {/* card banayenge yaha  */}
            <div>
              <CardDetailCourse
              course={courseData?.data}
              setConfirmationModal = {setConfirmationModal}
              handleBuyCourse = {handleBuyCourse}
              />
            </div>
        </div>

        {/* Course Information */}
        <div className="mt-8">

          <p>
            Total Lectures:{" "}
            <span className="font-semibold">
              {totalLectureCount}
            </span>
          </p>
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