
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { apiConnector } from "../services/apiConnector";
import { categories } from "../services/apis";

const { CATEGORY_PAGE_DETAILS_API } = categories;

const Catalog = () => {

    const { categoryId } = useParams();
    const navigate = useNavigate();


    const [catalogData, setCatalogData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ================= FETCH CATALOG DATA =================
    useEffect(() => {
        const fetchCatalogData = async () => {
            setLoading(true);
            setError(null);

            try {
                console.log("Fetching categories for catalog");
                // Get all categories (includes courses)
                const result = await apiConnector(
                    "GET",
                    categories.CATEGORIES_API
                );

                if (!result?.data?.success) {
                    throw new Error(result?.data?.message || "Failed to load categories");
                }

                const allCategories = result.data.categories || [];
                // Find the selected category
                const selectedCategory = allCategories.find((cat) => cat._id === categoryId);
                // Other categories for exploration
                const differentCategories = allCategories.filter((cat) => cat._id !== categoryId);
                // Top selling courses could be derived; for now leave empty
                const topSellingCourses = [];

                setCatalogData({ selectedCategory, differentCategories, topSellingCourses });

            } catch (err) {
                console.error("Catalog fetch error:", err);
                setError("Could not load category data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        if (categoryId) {
            fetchCatalogData();
        }
    }, [categoryId]);


    // ================= LOADING =================
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-stone-950">
                <div className="flex flex-col items-center gap-4">

                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent" />

                    <p className="text-lg text-white">
                        Loading courses...
                    </p>

                </div>
            </div>
        );
    }


    // ================= ERROR =================
    if (error) {
        return (
            <div className="flex min-h-[80vh] items-center justify-center bg-stone-950">

                <div className="text-center">

                    <p className="text-xl font-semibold text-red-400">
                        {error}
                    </p>

                    <Link
                        to="/"
                        className="mt-4 inline-block text-yellow-400 underline hover:text-yellow-300"
                    >
                        Go back to Home
                    </Link>

                </div>

            </div>
        );
    }


    // ================= NO DATA =================
    if (!catalogData) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-stone-950 text-white">
                No catalog data found.
            </div>
        );
    }


    const {
        selectedCategory,
        differentCategories,
        topSellingCourses,
    } = catalogData;


    // ================= COURSE CLICK =================
    const handleCourseClick = (courseId) => {

        navigate(`/course/${courseId}`);
    };


    return (
        <div className="min-h-screen bg-stone-950 text-white">

            {/* ================= HERO ================= */}
            <div className="bg-stone-900 px-6 py-12">

                <div className="mx-auto max-w-5xl">

                    <p className="mb-2 text-sm font-medium text-yellow-400">
                        Home / Catalog /{" "}
                        <span className="text-white">
                            {selectedCategory?.name}
                        </span>
                    </p>

                    <h1 className="text-4xl font-bold">
                        {selectedCategory?.name}
                    </h1>

                    {selectedCategory?.description && (
                        <p className="mt-3 max-w-2xl leading-7 text-gray-400">
                            {selectedCategory.description}
                        </p>
                    )}

                </div>

            </div>


            <div className="mx-auto max-w-5xl space-y-14 px-6 py-10">


                <section>

                    <h2 className="mb-6 border-b border-stone-700 pb-3 text-2xl font-bold">

                        Courses in{" "}

                        <span className="text-yellow-400">
                            {selectedCategory?.name}
                        </span>

                    </h2>


                    {selectedCategory?.courses?.length > 0 ? (

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                            {selectedCategory.courses.map((course) => (

                                <div
                                    key={course._id}
                                    onClick={() =>
                                        handleCourseClick(course._id)
                                    }
                                    className="cursor-pointer overflow-hidden rounded-xl border border-stone-700 bg-stone-900 transition-all duration-200 hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-400/10"
                                >

                                    {/* Thumbnail */}

                                    {course.thumbnail ? (

                                        <img
                                            src={course.thumbnail}
                                            alt={course.courseName}
                                            className="h-40 w-full object-cover"
                                        />

                                    ) : (

                                        <div className="flex h-40 w-full items-center justify-center bg-stone-800 text-4xl text-stone-500">
                                            📚
                                        </div>

                                    )}


                                    {/* Course Information */}

                                    <div className="flex flex-col gap-2 p-4">

                                        <h3 className="text-lg font-semibold">
                                            {course.courseName}
                                        </h3>

                                        <p className="line-clamp-2 text-sm text-gray-400">
                                            {course.courseDescription}
                                        </p>

                                        <div className="mt-2 flex items-center justify-between border-t border-stone-700 pt-3">

                                            <span className="text-lg font-bold text-yellow-400">
                                                ₹{course.price}
                                            </span>

                                            <span className="text-xs text-gray-500">
                                                {course.studentsEnrolled?.length ?? 0}{" "}
                                                enrolled
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    ) : (

                        <p className="text-gray-400">
                            No courses available in this category yet.
                        </p>

                    )}

                </section>


        

                {topSellingCourses?.length > 0 && (

                    <section>

                        <h2 className="mb-6 border-b border-stone-700 pb-3 text-2xl font-bold">
                             Top Selling Courses
                        </h2>


                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                            {topSellingCourses.map((course) => (

                                <div
                                    key={course._id}
                                    onClick={() =>
                                        handleCourseClick(course._id)
                                    }
                                    className="cursor-pointer overflow-hidden rounded-xl border border-stone-700 bg-stone-900 transition-all duration-200 hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-400/10"
                                >

                                    {/* Thumbnail */}

                                    {course.thumbnail ? (

                                        <img
                                            src={course.thumbnail}
                                            alt={course.courseName}
                                            className="h-40 w-full object-cover"
                                        />

                                    ) : (

                                        <div className="flex h-40 w-full items-center justify-center bg-stone-800 text-4xl text-stone-500">
                                            🎓
                                        </div>

                                    )}


                                    {/* Course Information */}

                                    <div className="flex flex-1 flex-col gap-2 p-4">

                                        <h3 className="text-lg font-semibold leading-snug">
                                            {course.courseName}
                                        </h3>

                                        <p className="line-clamp-2 text-sm text-gray-400">
                                            {course.courseDescription}
                                        </p>

                                        <div className="mt-auto flex items-center justify-between border-t border-stone-700 pt-3">

                                            <span className="text-lg font-bold text-yellow-400">
                                                ₹{course.price}
                                            </span>

                                            <span className="text-xs text-gray-500">
                                                {course.studentsEnrolled?.length ?? 0}{" "}
                                                enrolled
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </section>

                )}



                {differentCategories?.length > 0 && (

                    <section>

                        <h2 className="mb-6 border-b border-stone-700 pb-3 text-2xl font-bold">
                            Explore Other Categories
                        </h2>


                        <div className="flex flex-wrap gap-3">

                            {differentCategories.map((cat) => (

                                <Link
                                    key={cat._id}
                                    to={`/catalog/${cat._id}`}
                                    className="rounded-full border border-stone-600 bg-stone-800 px-5 py-2 text-sm font-medium text-white transition-all duration-200 hover:border-yellow-400 hover:text-yellow-400"
                                >
                                    {cat.name}
                                </Link>

                            ))}

                        </div>

                    </section>

                )}

            </div>

        </div>
    );
};

export default Catalog;