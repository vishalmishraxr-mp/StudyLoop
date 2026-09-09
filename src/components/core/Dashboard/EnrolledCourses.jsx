import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getUserDetails } from "../../../services/operations/profileAPI";

const EnrolledCourses = () => {
    const { token } = useSelector((state) => state.auth);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCourses = async () => {
            setLoading(true);
            const response = await getUserDetails(token);

            if (response.success) {
                setCourses(response.userDetails.courses || []);
            }

            setLoading(false);
        };

        loadCourses();
    }, [token]);

    if (loading) {
        return <div className="p-8 text-white">Loading your courses...</div>;
    }

    return (
        <div className="p-4 sm:p-8 text-white">
            <h1 className="text-2xl font-bold">Enrolled Courses</h1>

            {courses.length === 0 ? (
                <div className="mt-6 flex flex-col items-center rounded-2xl border border-gray-700 bg-gray-800 p-10 text-center">
                    <p className="text-gray-400">You haven't enrolled in any courses yet.</p>
                    <Link
                        to="/"
                        className="mt-4 rounded-lg bg-yellow-400 px-5 py-2 font-semibold text-black hover:bg-yellow-500"
                    >
                        Browse Courses
                    </Link>
                </div>
            ) : (
                <div className="mt-6 space-y-4">
                    {courses.map((course) => (
                        <div
                            key={course._id}
                            className="flex flex-col gap-4 rounded-2xl border border-gray-700 bg-gray-800 p-5 sm:flex-row sm:items-center"
                        >
                            <img
                                src={course.thumbnail}
                                alt={course.courseName}
                                className="h-32 w-full rounded-xl object-cover sm:h-20 sm:w-32"
                            />
                            <div className="flex-1">
                                <p className="text-lg font-semibold">{course.courseName}</p>
                                <p className="mt-1 line-clamp-2 text-sm text-gray-400">
                                    {course.courseDescription}
                                </p>
                                <p className="mt-2 text-sm text-yellow-400">
                                    Purchased for ₹{course.price}
                                </p>
                            </div>
                            <Link
                                to={`/dashboard/view-course/${course._id}`}
                                className="rounded-lg bg-yellow-400 px-5 py-2 text-center font-semibold text-black hover:bg-yellow-500"
                            >
                                Continue Learning
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EnrolledCourses;
