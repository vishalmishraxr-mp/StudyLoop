import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CourseInformationForm from "./CourseInformationForm";
import CourseBuilder from "./CourseBuilder";
import PublishCourse from "./PublishCourse";
import { fetchCourseDetails } from "../../../../services/operations/courseDetailsAPI";

const steps = ["Course Information", "Course Builder", "Publish"];

const AddCourse = () => {
    const { courseId } = useParams();
    const [step, setStep] = useState(1);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(!!courseId);

    useEffect(() => {
        if (courseId) {
            const loadCourse = async () => {
                setLoading(true);
                const res = await fetchCourseDetails(courseId);
                if (res?.success && res?.data) {
                    setCourse(res.data);
                }
                setLoading(false);
            };
            loadCourse();
        }
    }, [courseId]);

    if (loading) {
        return <div className="p-8 text-white">Loading course data...</div>;
    }

    return (
        <div className="p-4 sm:p-8 text-white">
            <h1 className="text-2xl font-bold">
                {courseId ? "Edit Course" : "Create New Course"}
            </h1>

            <div className="mt-6 flex items-center gap-4">
                {steps.map((label, index) => {
                    const stepNumber = index + 1;
                    const isActive = step === stepNumber;
                    const isDone = step > stepNumber;

                    return (
                        <div key={label} className="flex items-center gap-2">
                            <div
                                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                                    isActive
                                        ? "bg-yellow-400 text-black"
                                        : isDone
                                            ? "bg-green-500 text-black"
                                            : "bg-gray-700 text-gray-300"
                                }`}
                            >
                                {isDone ? "✓" : stepNumber}
                            </div>
                            <span className={isActive ? "text-white" : "text-gray-400"}>{label}</span>
                            {stepNumber !== steps.length && <div className="mx-2 h-px w-8 bg-gray-700" />}
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 max-w-2xl">
                {step === 1 && (
                    <CourseInformationForm
                        course={course}
                        setCourse={setCourse}
                        onNext={() => setStep(2)}
                    />
                )}

                {step === 2 && (
                    <CourseBuilder
                        course={course}
                        setCourse={setCourse}
                        onNext={() => setStep(3)}
                        onBack={() => setStep(1)}
                    />
                )}

                {step === 3 && (
                    <PublishCourse
                        course={course}
                        onBack={() => setStep(2)}
                    />
                )}
            </div>
        </div>
    );
};

export default AddCourse;
