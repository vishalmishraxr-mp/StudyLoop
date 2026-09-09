import React from 'react'
import { homepageExplore } from '../../data/explore-data'
import {useState} from 'react';
import Highlight from './Highlight';
import CourseCard from "./CourseCard";

const tabsName = [
    "Free Explore", "New to Coding", "Most Popular", "Skill Paths", "Carrer Paths",
]

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(homepageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(homepageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = homepageExplore.filter((courses) => courses.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);

    }
  return (
    <div className="bg-black text-white py-16">

        {/* Heading */}
        <div className="text-4xl font-semibold text-center">
            <p>Unlock The</p>
            <Highlight text={"Power Of Code"} />
        </div>

        {/* Subheading */}
        <p className="
            flex
            items-center
            justify-center
            mt-5
            text-gray-400
            text-center
            px-4
        ">
            Learn to Build Anything You Can Imagine
        </p>


        {/* Tabs */}
        <div className="
            w-fit
            mx-auto
            flex flex-wrap
            justify-center
            items-center
            gap-3
            mt-8
            px-3 py-2
            bg-gray-800
            rounded-full
            ">
            {
                tabsName.map((element, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => setMyCards(element)}
                            className={`
                                text-[16px]
                                flex items-center justify-center
                                gap-2
                                px-4 py-2
                                rounded-full
                                transition-all duration-200
                                cursor-pointer
                                ${
                                    currentTab === element
                                        ? "bg-black text-white font-medium"
                                        : "text-white"
                                }
                                hover:bg-black
                                hover:text-white
                            `}
                        >
                            {element}
                        </div>
                    )
                })
            }
        </div>

        {/* card-components */}
        <div>
            <div className='lg:h-[150px]'></div>
            {/* card group */}
            <div className='relative
        md:absolute
        md:left-1/2
        md:-translate-x-1/2
        md:-translate-y-[85px]

        w-full
        md:w-[95%]
        lg:w-full
        max-w-[1000px]

        flex
        flex-col
        md:flex-row

        items-center
        justify-center

        gap-6
        md:gap-5
        mt-5'>
                {
                    courses.map( (element, index) => {
                        return (
                            <CourseCard
                            key={index}
                            course={element}
                            currentCard={currentCard}
                        />
                        )
                    })
                }
            </div>
        </div>
</div>
  )
}

export default ExploreMore
