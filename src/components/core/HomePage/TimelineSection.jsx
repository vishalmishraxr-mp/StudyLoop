import React from 'react'

import Logo1 from "../../../asset/logoImage/Logo1.png"
import Logo2 from "../../../asset/logoImage/Logo2.png"
import Logo3 from "../../../asset/logoImage/Logo3.png"
import Logo4 from "../../../asset/logoImage/Logo4.png"
import timelineImage from "../../../asset/images/Timeline.png"

const timeline = [
    {
        logo: Logo1,
        heading: "Leadership",
        description: "Full Commited to The Success Company",
    },
    {
        logo: Logo2,
        heading: "Flexibility",
        description: "The Ability To Switch Is an Important Skill",
    },
    {
        logo: Logo3,
        heading: "Responsibility",
        description: "Student Will Be Always Our First Priority",
    },
    {
        logo: Logo4,
        heading: "Solve The Problem",
        description: "Code Your Way To a Solutions",
    },
]

const TimelineSection = () => {
    return (
        <div className=" w-3/4 mx-auto">

            <div className="
                flex flex-col
                lg:flex-row
                items-center
                justify-between
                gap-12
                mt-10
            ">

                {/* Timeline Points */}
                <div className="
                    flex flex-col
                    w-full
                    lg:w-1/2
                    gap-6
                ">

                    {
                        timeline.map((element, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex flex-row items-center gap-5"
                                >

                                    {/* Logo */}
                                    <div className="
                                        flex
                                        h-14 w-14
                                        sm:h-16 sm:w-16
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-white
                                        shadow-md
                                        p-2
                                    ">
                                        <img
                                            src={element.logo}
                                            alt={element.heading}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <h2 className="
                                            text-base
                                            sm:text-[18px]
                                            font-semibold
                                        ">
                                            {element.heading}
                                        </h2>

                                        <p className="
                                            text-sm
                                            sm:text-base
                                            text-gray-600
                                            leading-6
                                        ">
                                            {element.description}
                                        </p>
                                    </div>

                                </div>
                            )
                        })
                    }

                </div>

                <div className="
                    relative
                    w-full
                    lg:w-1/2
                    max-w-xl
                    mx-auto
                    lg:ml-10
                ">

                    <img
                        src={timelineImage}
                        alt="Timeline"
                        className="
                            mt-5
                            h-auto
                            w-full
                            object-contain
                            rounded-md
                            shadow-lg
                            shadow-blue-200/20
                        "
                    />


                    {/* Stats */}
                    <div className="
                        absolute
                        left-1/2
                        bottom-0
                        translate-x-[-50%]
                        translate-y-[50%]
                        bg-green-800
                        text-white
                        uppercase
                        flex flex-row
                        w-[90%]
                        sm:w-auto
                    ">

                        {/* Experience */}
                        <div className="
                            flex
                            flex-row
                            items-center
                            gap-3
                            sm:gap-5
                            border-r
                            border-green-200
                            px-4
                            sm:px-7
                            py-5
                            sm:py-7
                        ">
                            <h1 className="
                                text-2xl
                                sm:text-3xl
                                font-bold
                            ">
                                10
                            </h1>

                            <p className="
                                text-[10px]
                                sm:text-sm
                                text-green-400
                            ">
                                Years of Experience
                            </p>
                        </div>


                        {/* Courses */}
                        <div className="
                            flex
                            items-center
                            gap-3
                            sm:gap-5
                            px-4
                            sm:px-7
                            py-5
                            sm:py-7
                        ">
                            <h1 className="
                                text-2xl
                                sm:text-3xl
                                font-bold
                            ">
                                90+
                            </h1>

                            <p className="
                                text-[10px]
                                sm:text-sm
                                text-green-400
                            ">
                                Type of Courses
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default TimelineSection
