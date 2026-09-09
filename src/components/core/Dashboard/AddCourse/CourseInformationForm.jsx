import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { getAllCategories, getAllTags, createCourse, updateCourse } from "../../../../services/operations/courseCreateAPI";

const CourseInformationForm = ({ course, setCourse, onNext }) => {
    const { token } = useSelector((state) => state.auth);

    const [categoriesList, setCategoriesList] = useState([]);
    const [tagsList, setTagsList] = useState([]);
    const [loading, setLoading] = useState(false);

    const [courseName, setCourseName] = useState(course?.courseName || "");
    const [courseDescription, setCourseDescription] = useState(course?.courseDescription || "");
    const [whatYouWillLearn, setWhatYouWillLearn] = useState(course?.whatYouWillLearn || "");
    const [price, setPrice] = useState(course?.price !== undefined ? course.price : "");
    const [category, setCategory] = useState(course?.category?._id || course?.category || "");
    const [tag, setTag] = useState(course?.tag?._id || course?.tag || "");
    const [thumbnail, setThumbnail] = useState(null);

    useEffect(() => {
        if (course) {
            setCourseName(course.courseName || "");
            setCourseDescription(course.courseDescription || "");
            setWhatYouWillLearn(course.whatYouWillLearn || "");
            setPrice(course.price !== undefined ? course.price : "");
            setCategory(course.category?._id || course.category || "");
            setTag(course.tag?._id || course.tag || "");
        }
    }, [course]);

    useEffect(() => {
        const loadOptions = async () => {
            const categoriesResponse = await getAllCategories();
            setCategoriesList(categoriesResponse.categories || []);

            const tagsResponse = await getAllTags();
            setTagsList(tagsResponse.data || []);
        };

        loadOptions();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("courseName", courseName);
        formData.append("courseDescription", courseDescription);
        formData.append("whatYouWillLearn", whatYouWillLearn);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("tag", tag);

        if (thumbnail) {
            formData.append("thumbnailImage", thumbnail);
        }

        setLoading(true);

        if (course?._id) {
            formData.append("courseId", course._id);
            const response = await updateCourse(formData, token);
            setLoading(false);

            if (response.success) {
                setCourse({ ...course, ...response.data });
                onNext();
            }
        } else {
            if (!thumbnail) {
                toast.error("Please upload a course thumbnail");
                setLoading(false);
                return;
            }

            const response = await createCourse(formData, token);
            setLoading(false);

            if (response.success) {
                setCourse(response.data);
                onNext();
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
            <div className="mb-5">
                <label className="mb-2 block text-sm text-gray-300">Course Name</label>
                <input
                    type="text"
                    required
                    placeholder="Enter course name"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white outline-none"
                />
            </div>

            <div className="mb-5">
                <label className="mb-2 block text-sm text-gray-300">Course Description</label>
                <textarea
                    required
                    rows="4"
                    placeholder="Enter course overview"
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                    className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white outline-none"
                ></textarea>
            </div>

            <div className="mb-5">
                <label className="mb-2 block text-sm text-gray-300">What Will Students Learn?</label>
                <textarea
                    rows="3"
                    placeholder="Key outcomes & benefits"
                    value={whatYouWillLearn}
                    onChange={(e) => setWhatYouWillLearn(e.target.value)}
                    className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white outline-none"
                ></textarea>
            </div>

            <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="mb-2 block text-sm text-gray-300">Price (₹)</label>
                    <input
                        type="number"
                        min="0"
                        required
                        placeholder="e.g. 499"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white outline-none"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm text-gray-300">Category</label>
                    <select
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white outline-none"
                    >
                        <option value="">Select category</option>
                        {categoriesList.map((cat) => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mb-5">
                <label className="mb-2 block text-sm text-gray-300">Tag (Created by Admin)</label>
                <select
                    required
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white outline-none"
                >
                    <option value="">Select tag</option>
                    {tagsList.map((t) => (
                        <option key={t._id} value={t._id}>#{t.name}</option>
                    ))}
                </select>
                {tagsList.length === 0 && (
                    <p className="mt-2 text-xs text-yellow-400/80">
                        No tags exist yet. An Admin can create tags from the Admin Panel.
                    </p>
                )}
            </div>

            <div className="mb-6">
                <label className="mb-2 block text-sm text-gray-300">
                    Thumbnail {course?._id && "(Leave blank to keep existing thumbnail)"}
                </label>
                {course?.thumbnail && !thumbnail && (
                    <div className="mb-3">
                        <img src={course.thumbnail} alt="Thumbnail preview" className="h-24 rounded-lg object-cover" />
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    required={!course?._id}
                    onChange={(e) => setThumbnail(e.target.files[0])}
                    className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white outline-none"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-yellow-400 px-6 py-2.5 font-semibold text-black hover:bg-yellow-500 disabled:opacity-50"
            >
                {loading ? "Saving..." : "Next"}
            </button>
        </form>
    );
};

export default CourseInformationForm;
