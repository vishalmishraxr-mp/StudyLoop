import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { getUserDetails } from "../../../services/operations/profileAPI";
import { deleteCourse, changeCourseStatus } from "../../../services/operations/courseCreateAPI";

const InstructorDashboard = () => {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadCourses = async () => {
        setLoading(true);
        const response = await getUserDetails(token);

        if (response.success) {
            setCourses(response.userDetails.courses || []);
        }

        setLoading(false);
    };

    useEffect(() => {
        loadCourses();
    }, [token]);

    const handleDelete = async (courseId) => {
        if (!window.confirm("Delete this course? This cannot be undone.")) return;

        const response = await deleteCourse(courseId, token);

        if (response.success) {
            setCourses(courses.filter((course) => course._id !== courseId));
        }
    };

    const handleToggleStatus = async (courseId, currentStatus) => {
        const newStatus = currentStatus === "Published" ? "Draft" : "Published";
        const response = await changeCourseStatus(courseId, newStatus, token);

        if (response.success) {
            setCourses(
                courses.map((course) =>
                    course._id === courseId ? { ...course, status: newStatus } : course
                )
            );
        }
    };

    // Calculate Instructor Metrics
    const totalCourses = courses.length;
    const totalStudents = courses.reduce(
        (acc, course) => acc + (course.studentsEnrolled?.length || 0),
        0
    );
    const totalEarnings = courses.reduce(
        (acc, course) => acc + (course.price * (course.studentsEnrolled?.length || 0)),
        0
    );

    if (loading) {
        return <div className="p-8 text-white">Loading your courses...</div>;
    }

    return (
        <div className="p-4 sm:p-8 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Instructor Dashboard</h1>
                    <p className="text-sm text-gray-400">Manage your created courses, track earnings, and add new courses.</p>
                </div>
                <Link
                    to="/dashboard/add-course"
                    className="rounded-lg bg-yellow-400 px-5 py-2.5 font-semibold text-black hover:bg-yellow-500 text-center"
                >
                    + Create New Course
                </Link>
            </div>

            {/* Metrics Widget */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="rounded-2xl border border-gray-700 bg-gray-800 p-5">
                    <p className="text-sm text-gray-400 font-medium">Total Courses</p>
                    <h3 className="text-3xl font-bold text-white mt-1">{totalCourses}</h3>
                </div>
                <div className="rounded-2xl border border-gray-700 bg-gray-800 p-5">
                    <p className="text-sm text-gray-400 font-medium">Total Students Enrolled</p>
                    <h3 className="text-3xl font-bold text-yellow-400 mt-1">{totalStudents}</h3>
                </div>
                <div className="rounded-2xl border border-gray-700 bg-gray-800 p-5">
                    <p className="text-sm text-gray-400 font-medium">Total Earnings</p>
                    <h3 className="text-3xl font-bold text-green-400 mt-1">₹{totalEarnings.toLocaleString()}</h3>
                </div>
            </div>

            {/* Course List */}
            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">My Courses</h2>

                {courses.length === 0 ? (
                    <div className="rounded-2xl border border-gray-700 bg-gray-800 p-10 text-center text-gray-400">
                        <p className="text-lg font-semibold">You haven't created any courses yet.</p>
                        <p className="text-sm text-gray-500 mt-1">Click "Create New Course" above to add your first course!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {courses.map((course) => (
                            <div
                                key={course._id}
                                className="flex flex-col gap-4 rounded-2xl border border-gray-700 bg-gray-800 p-5 sm:flex-row sm:items-center"
                            >
                                <img
                                    src={course.thumbnail}
                                    alt={course.courseName}
                                    className="h-32 w-full rounded-xl object-cover sm:h-24 sm:w-40"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <p className="text-lg font-semibold">{course.courseName}</p>
                                        <span
                                            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                                course.status === "Published"
                                                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                                    : "bg-gray-600/40 text-gray-300 border border-gray-500/30"
                                            }`}
                                        >
                                            {course.status}
                                        </span>
                                    </div>
                                    <p className="mt-1 line-clamp-2 text-sm text-gray-400">
                                        {course.courseDescription}
                                    </p>
                                </div>
                                <div className="text-sm text-gray-300 min-w-[120px]">
                                    <p className="text-base font-bold text-yellow-400">₹{course.price}</p>
                                    <p className="mt-1 text-xs text-gray-400">
                                        {course.studentsEnrolled?.length || 0} students
                                    </p>
                                </div>
                                <div className="flex flex-wrap sm:flex-col gap-2">
                                    <button
                                        onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                                        className="rounded-lg border border-yellow-400 px-3 py-1.5 text-xs font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleToggleStatus(course._id, course.status)}
                                        className="rounded-lg border border-gray-600 px-3 py-1.5 text-xs font-semibold text-gray-300 transition hover:bg-gray-700"
                                    >
                                        {course.status === "Published" ? "Draft" : "Publish"}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(course._id)}
                                        className="rounded-lg border border-red-500/50 px-3 py-1.5 text-xs font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InstructorDashboard;
