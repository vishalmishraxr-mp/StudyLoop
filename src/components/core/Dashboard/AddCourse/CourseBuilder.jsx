import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import {
    addSection,
    deleteSection,
    addSubSection,
    deleteSubSection,
} from "../../../../services/operations/courseCreateAPI";

const LectureForm = ({ sectionId, token, onAdded, onCancel }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [timeDuration, setTimeDuration] = useState("");
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!video) {
            toast.error("Please select a video file");
            return;
        }

        const formData = new FormData();
        formData.append("sectionId", sectionId);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("timeDuration", timeDuration);
        formData.append("videoFile", video);

        setLoading(true);
        const response = await addSubSection(formData, token);
        setLoading(false);

        if (response.success) {
            onAdded(response.subsection);
            setTitle("");
            setDescription("");
            setTimeDuration("");
            setVideo(null);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-3 rounded-lg border border-gray-600 bg-gray-900 p-4">
            <input
                type="text"
                required
                placeholder="Lecture title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mb-3 w-full rounded-lg bg-gray-700 px-3 py-2 text-sm text-white outline-none"
            />
            <textarea
                required
                rows="2"
                placeholder="Lecture description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mb-3 w-full rounded-lg bg-gray-700 px-3 py-2 text-sm text-white outline-none"
            ></textarea>
            <input
                type="text"
                required
                placeholder="Duration (e.g. 12:30)"
                value={timeDuration}
                onChange={(e) => setTimeDuration(e.target.value)}
                className="mb-3 w-full rounded-lg bg-gray-700 px-3 py-2 text-sm text-white outline-none"
            />
            <input
                type="file"
                accept="video/*"
                required
                onChange={(e) => setVideo(e.target.files[0])}
                className="mb-3 w-full rounded-lg bg-gray-700 px-3 py-2 text-sm text-white outline-none"
            />
            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-lg border border-gray-600 px-4 py-1.5 text-sm text-gray-300 hover:bg-gray-700"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-yellow-400 px-4 py-1.5 text-sm font-semibold text-black hover:bg-yellow-500 disabled:opacity-50"
                >
                    {loading ? "Uploading..." : "Add Lecture"}
                </button>
            </div>
        </form>
    );
};

const CourseBuilder = ({ course, setCourse, onNext, onBack }) => {
    const { token } = useSelector((state) => state.auth);

    const [sections, setSections] = useState(course?.courseContent || []);
    const [sectionName, setSectionName] = useState("");
    const [addingLectureFor, setAddingLectureFor] = useState(null);

    useEffect(() => {
        if (course?.courseContent) {
            setSections(course.courseContent);
        }
    }, [course]);

    const handleAddSection = async (e) => {
        e.preventDefault();

        const response = await addSection(sectionName, course._id, token);

        if (response.success) {
            setSections([...sections, { ...response.section, subSection: [] }]);
            setSectionName("");
        }
    };

    const handleDeleteSection = async (sectionId) => {
        const response = await deleteSection(sectionId, token);

        if (response.success) {
            setSections(sections.filter((section) => section._id !== sectionId));
        }
    };

    const handleDeleteLecture = async (sectionId, subSectionId) => {
        const response = await deleteSubSection(subSectionId, token);

        if (response.success) {
            setSections(
                sections.map((section) =>
                    section._id === sectionId
                        ? { ...section, subSection: (section.subSection || []).filter((s) => s._id !== subSectionId) }
                        : section
                )
            );
        }
    };

    const handleLectureAdded = (sectionId, newSubSection) => {
        setSections(
            sections.map((section) =>
                section._id === sectionId
                    ? { ...section, subSection: [...(section.subSection || []), newSubSection] }
                    : section
            )
        );
        setAddingLectureFor(null);
    };

    const handleNext = () => {
        const hasAtLeastOneLecture = sections.some((section) => (section.subSection || []).length > 0);

        if (sections.length === 0 || !hasAtLeastOneLecture) {
            toast.error("Add at least one section with one lecture before continuing");
            return;
        }

        setCourse({ ...course, courseContent: sections });
        onNext();
    };

    return (
        <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
            <form onSubmit={handleAddSection} className="mb-6 flex gap-3">
                <input
                    type="text"
                    required
                    placeholder="New section name"
                    value={sectionName}
                    onChange={(e) => setSectionName(e.target.value)}
                    className="flex-1 rounded-lg bg-gray-700 px-4 py-2 text-white outline-none"
                />
                <button
                    type="submit"
                    className="rounded-lg bg-yellow-400 px-5 py-2 font-semibold text-black hover:bg-yellow-500"
                >
                    Add Section
                </button>
            </form>

            {sections.length === 0 && (
                <p className="text-gray-400">No sections yet. Add your first section above.</p>
            )}

            <div className="space-y-4">
                {sections.map((section) => (
                    <div key={section._id} className="rounded-xl border border-gray-600 p-4">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold">{section.sectionName}</p>
                            <button
                                onClick={() => handleDeleteSection(section._id)}
                                className="text-sm text-red-400 hover:text-red-300"
                            >
                                Delete Section
                            </button>
                        </div>

                        <div className="mt-3 space-y-2">
                            {(section.subSection || []).map((lecture) => (
                                <div
                                    key={lecture._id}
                                    className="flex items-center justify-between rounded-lg bg-gray-900 px-4 py-2 text-sm"
                                >
                                    <span>{lecture.title} — {lecture.timeDuration}</span>
                                    <button
                                        onClick={() => handleDeleteLecture(section._id, lecture._id)}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>

                        {addingLectureFor === section._id ? (
                            <LectureForm
                                sectionId={section._id}
                                courseId={course._id}
                                token={token}
                                onAdded={(newSubSection) => handleLectureAdded(section._id, newSubSection)}
                                onCancel={() => setAddingLectureFor(null)}
                            />
                        ) : (
                            <button
                                onClick={() => setAddingLectureFor(section._id)}
                                className="mt-3 text-sm font-semibold text-yellow-400 hover:text-yellow-300"
                            >
                                + Add Lecture
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-6 flex gap-3">
                <button
                    onClick={onBack}
                    className="rounded-lg border border-gray-600 px-6 py-2.5 font-semibold text-gray-300 hover:bg-gray-700"
                >
                    Back
                </button>
                <button
                    onClick={handleNext}
                    className="rounded-lg bg-yellow-400 px-6 py-2.5 font-semibold text-black hover:bg-yellow-500"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CourseBuilder;
