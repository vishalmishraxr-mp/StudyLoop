import React from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Highlight from '../components/core/HomePage/Highlight';
import CTAButton from '../components/core/HomePage/Button';
import banner from '../asset/images/banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import { TypeAnimation } from 'react-type-animation';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LeaningSection from '../components/core/HomePage/LeaningSection';
import know_your_progress from "../asset/images/knowyourprogress.png";
import compare_others from "../asset/images/compare_others.png";
import plan_your_issue from "../asset/images/plan_your_issue.png";
import instructor_image from "../asset/images/instructor.png";
import ExploreMore from '../components/core/HomePage/ExploreMore';
import Footer from '../components/core/HomePage/Footer';


const Home = () => {
  return (
    <div>
      {/* section-1 */}
      <div className='relative mx-auto flex flex-col w-11/12 items-center
       text-white justify-between'>

        <Link to={"/signup?role=instructor"}>
            <div className='group mt-16 p-1 mx-auto rounded-full bg-slate-900 font-bold text-slate-600 
            transition-all duration-200 hover: scale-95 w-fit '>
                <div className='flex flex-row items-center gap-2 rounded-full
                 px-5 py-[4px] transition-all duration-200 group-hover:bg-black'>
                    <p>Become an instructor</p>
                    <FaArrowRightLong />

                </div>
            </div>

        </Link>
        <div className='flex flex-row text-center text-4xl font-semibold mt-6'>
            Empower Your Future With  <Highlight text= " Coding Skills" />
        </div>

        <div className='mt-4 w-[90%] text-center  text-base font-bold
         text-gray-500 [text-wrap:balance]'>
            StudyLoop is an online learning platform designed to
             help students learn, grow, and build job-ready skills through 
             high-quality courses, 
            expert guidance, and a seamless learning experience.
        </div>
        
        <div className='flex flex-row gap-7 mt-8'>
            <CTAButton active={true} linkto={"/signup"}> Learn More    </CTAButton>
            <CTAButton active={false} linkto={"/login "}>  Book a Demo   </CTAButton>
        </div>

       <div className="relative mx-auto mt-10 w-11/12 max-w-5xl">
  <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-70 blur-sm" />

  <div className="relative rounded-2xl bg-slate-950 p-2 shadow-2xl">
    <video
      src={banner}
      autoPlay
      loop
      muted
      playsInline
      className="w-full rounded-xl object-cover"
    />
  </div>
        </div>

    {/* code section-1 */}
    <div>
            
            <CodeBlocks
            position={"lg:flex-row"} 
            heading={
                <div className='text-4xl font-semibold '>
                    Unlock Your 
                    <Highlight text="Coding Potential" />
                    With Our Online Courses
                </div>
            }
            subheading={
                "Learn in-demand programming skills through expertly designed courses, practical projects, and hands-on learning. Build your knowledge, sharpen your coding skills, and take the next step toward your dream career."
            }
            ctabtn1={
                {
                    btnText: "Try It Youself",
                    linkto: "/signup",
                    active: true,

                }
            }
            ctabtn2={
                {
                    btnText: "Learn More",
                    linkto: "/login",
                    active: false,

                }
            }
            codeblocks={
                 `<!DOCTYPE html>\n<html lang="en"><head>\n <meta charset="UTF-8">\n<title>My First HTML Page</title>\n<a href="https://www.example.com">Example</a>\n <img src="image.jpg"\n alt="Image" width="400">\n <ul><li>HTML</li>\n<li>CSS</li>\n<li>JavaScript</li>\n </ul>\n</body>\n</html>`
            }
            codeColor="text-yellow-400">

            </CodeBlocks>
        </div>
    </div>

     {/* code section-2 */}
    <div>
            
            <CodeBlocks
            position={"lg:flex-row-reverse"} 
            heading={
                <div className='text-4xl font-semibold text-white'>
                    Start{" "}
                    <Highlight text="Coding In Second" />
                </div>
            }
            subheading={
                "Turn your ideas into real projects with hands-on coding practice. Learn by building, solve real-world problems, and develop the skills you need to become a confident and job-ready developer."
            }
            ctabtn1={
                {
                    btnText: "Continue Lesson",
                    linkto: "/signup",
                    active: true,

                }
            }
            ctabtn2={
                {
                    btnText: "Learn More",
                    linkto: "/login",
                    active: false,

                }
            }
            codeblocks={
                 `<!DOCTYPE html>\n<html lang="en"><head>\n <meta charset="UTF-8">\n<title>My First HTML Page</title>\n<a href="https://www.example.com">Example</a>\n <img src="image.jpg"\n alt="Image" width="400">\n <ul><li>HTML</li>\n<li>CSS</li>\n<li>JavaScript</li>\n </ul>\n</body>\n</html>`
            }
            codeColor="text-yellow-400">

            </CodeBlocks>
        </div>

            {/* explore more section */}
            <ExploreMore/>

      {/* section-2 */}
        <div className="bg-white text-black">

            {/* Hero Section */}
            <div className="homepage_bg h-[300px] sm:h-[320px] md:h-[300px]">
                <div className="w-11/12 max-w-maxContent mx-auto flex flex-col items-center gap-5">

                <div className="h-[80px] sm:h-[100px]"></div>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 items-center justify-center text-white">

                    <CTAButton active={true} linkto={"/signup"}>
                        <div className="flex items-center gap-2">
                            <span>Explore Full Catalog</span>
                            <FaArrowRightLong />
                        </div>
                    </CTAButton>

                    <CTAButton active={false} linkto={"/signup"}>
                        <div>Learn More</div>
                    </CTAButton>

                </div>
            </div>
            </div>


            <div className="bg-white text-black">

    {/* Main Content */}
    <div className="
        w-11/12
        lg:w-3/4
        mx-auto
        flex flex-col
        gap-7
    ">

        {/* Heading + Description */}
        <div className="
    w-11/12 lg:w-3/4
    mx-auto
    flex flex-col md:flex-row
    items-start md:items-center
    gap-4 md:gap-6
    mt-12 md:mt-[75px]
">

    {/* Heading */}
    <div className="
        w-full
        md:w-[52%]
        text-3xl
        sm:text-4xl
        font-semibold
    ">
        <p>
            Get a Link You Need For a
        </p>

        <Highlight text={"Job That Is In Demand"} />
    </div>


    {/* Description */}
    <div className="
        w-full
        md:w-[43%]
        flex flex-col
        items-start
    ">

        <p className="
            text-sm
            sm:text-[16px]
            leading-6
            sm:leading-7
            mb-8
        ">
            StudyLoop is an online learning platform where students
            can explore and purchase courses, learn through practical
            content, and build job-ready skills.
        </p>

        <CTAButton active={true} linkto={"/signup"}>
            Learn More
        </CTAButton>

    </div>

</div>


        {/* Timeline */}
        <TimelineSection />


        {/* Learning Section */}
        <LeaningSection />

    </div>

</div>


        </div>

      {/* section-3 */}

      <div className="bg-white text-4xl font-semibold ">

            {/* Heading */}
            <div className="pt-24 sm:pt-28 md:pt-[150px] 
                            flex flex-col sm:flex-row 
                            items-center justify-center 
                            gap-2 px-4 text-center">

                <p>Your Swiss Knife For</p>

                <Highlight text={"Learning Any Language"} />

            </div>


            {/* Description */}
            <div>
                <p className="mx-auto mt-5 
                            max-w-xl 
                            px-5 
                            text-center 
                            text-sm 
                            leading-6 
                            text-gray-600">
                    Learn 20+ programming languages with voice-over lessons,
                    progress tracking, custom schedules, and powerful tools—all
                    in one place.
                </p>
            </div>


            {/* Cards */}
            <div className="flex flex-col md:flex-row 
                            items-center justify-center 
                            gap-8 md:gap-4 
                            mt-16 md:mt-[75px] 
                            px-6">

                {/* First */}
                <img
                    src={know_your_progress}
                    className="w-64 sm:w-72 md:w-80
                            rotate-[-8deg] md:rotate-[-12deg]
                            md:-translate-x-2 
                            translate-y-2 md:translate-y-5
                            origin-top"
                />

                {/* Second */}
                <img
                    src={compare_others}
                    className="w-64 sm:w-72 md:w-80
                            rotate-[3deg] md:rotate-[5deg]
                            origin-top"
                />

                {/* Third */}
                <img
                    src={plan_your_issue}
                    className="w-64 sm:w-72 md:w-80
                            rotate-[-5deg] md:rotate-[-6deg]
                            md:-translate-x-3
                            translate-y-1
                            origin-top"
                />

            </div>


            {/* Button */}
            <div className="mt-16 md:mt-[100px] 
                            pb-16
                            flex justify-center">

                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>

            </div>

        </div>

      {/* section-4 */}

      <div className="w-11/12 md:w-3/4 mx-auto 
                flex flex-col md:flex-row 
                items-center justify-between 
                gap-10 md:gap-12">


    <div className="w-full md:w-1/2 flex justify-center relative mt-12 md:mt-[100px]">

        <div className="absolute 
                        w-full h-[320px] sm:h-[380px] md:h-[450px]
                        bg-white 
                        -top-3 -left-3 md:-top-4 md:-left-4">
        </div>

        {/* Main Image */}
        <img
            src={instructor_image}
            alt="instructorImage"
            className="relative z-10 
                       w-full 
                       h-[320px] sm:h-[380px] md:h-[450px]
                       object-cover object-top"
        />

    </div>


    {/* Content */}
    <div className="w-full md:w-1/2 flex flex-col items-start">

        <div>
            <p className="font-semibold text-white 
                          text-3xl sm:text-4xl">
                Become An
            </p>

            <Highlight text={"Instructor"} />
        </div>

        <div className="mt-5">
            <p className="text-gray-300 
                          text-sm sm:text-base 
                          leading-6 sm:leading-7">
                Share your knowledge, inspire learners, and grow your impact.
                Become an instructor and create engaging courses that help
                students build real-world skills and achieve their goals.
            </p>
        </div>

        <div className="mt-8">
            <CTAButton active={true} linkto={"/signup?role=instructor"}>
                <div className="flex items-center gap-2">
                    <span>Start Teaching Today</span>
                    <FaArrowRightLong />
                </div>
            </CTAButton>
        </div>

    </div>

      </div>

        {/* section-5 */}
        <div className="mt-20">

    {/* Heading */}
    <div className="flex items-center justify-center px-4 text-center">
        <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
            Review From Other Learners
        </p>
    </div>


    {/* Reviews */}
    <div className="w-11/12 lg:w-3/4 mx-auto mt-12 md:mt-16">

        <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-10
            lg:gap-8
        ">

            {/* Review 1 */}
            <div className="flex flex-col">

                <div className="flex items-center gap-3">
                    <img
                        src="https://i.pravatar.cc/150?img=12"
                        alt="Vishal Mishra"
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover"
                    />

                    <p className="font-semibold text-white">
                        Vishal Mishra
                    </p>
                </div>

                {/* Descriptionon  */}
                <p className="
                    mt-4
                    block
                    w-full
                    text-xs
                    sm:text-sm
                    text-gray-300
                    leading-5
                    sm:leading-6
                ">
                    This platform made learning programming much easier.
                    Lessons are simple and well structured.
                </p>

                {/* Rating */}
                <div className="
                    mt-4
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    gap-1
                    sm:gap-3
                ">
                    <div className="flex gap-1 text-yellow-400">
                        ★ ★ ★ ★ ★
                    </div>

                    <p className="text-white font-semibold text-sm">
                        5★ Rating
                    </p>
                </div>

            </div>


            {/* Review 2 */}
            <div className="flex flex-col">

                <div className="flex items-center gap-3">
                    <img
                        src="https://i.pravatar.cc/150?img=33"
                        alt="Aditya Singh"
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover"
                    />

                    <p className="font-semibold text-white">
                        Aditya Singh
                    </p>
                </div>

                <p className="
                    mt-4
                    block
                    w-full
                    text-xs
                    sm:text-sm
                    text-gray-300
                    leading-5
                    sm:leading-6
                ">
                    Amazing experience! The progress tracking and
                    personalized schedule are really helpful.
                </p>

                <div className="
                    mt-4
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    gap-1
                    sm:gap-3
                ">
                    <div className="flex gap-1 text-yellow-400">
                        ★ ★ ★ ★
                        <span className="relative text-gray-400">
                            ★
                            <span className="
                                absolute
                                left-0
                                top-0
                                w-1/2
                                overflow-hidden
                                text-yellow-400
                            ">
                                ★
                            </span>
                        </span>
                    </div>

                    <p className="text-white font-semibold text-sm">
                        4.5★ Rating
                    </p>
                </div>

            </div>


            {/* Review 3 */}
            <div className="flex flex-col">

                <div className="flex items-center gap-3">
                    <img
                        src="https://i.pravatar.cc/150?img=45"
                        alt="Akansha Tiwari"
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover"
                    />

                    <p className="font-semibold text-white">
                        Akansha Tiwari
                    </p>
                </div>

                <p className="
                    mt-4
                    block
                    w-full
                    text-xs
                    sm:text-sm
                    text-gray-300
                    leading-5
                    sm:leading-6
                ">
                    I really liked the way courses are organized.
                    It helped me stay consistent with my learning.
                </p>

                <div className="
                    mt-4
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    gap-1
                    sm:gap-3
                ">
                    <div className="flex gap-1 text-yellow-400">
                        ★ ★ ★ ★
                    </div>

                    <p className="text-white font-semibold text-sm">
                        4★ Rating
                    </p>
                </div>

            </div>


            {/* Review 4 */}
            <div className="flex flex-col">

                <div className="flex items-center gap-3">
                    <img
                        src="https://i.pravatar.cc/150?img=47"
                        alt="Monika Pandey"
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover"
                    />

                    <p className="font-semibold text-white">
                        Monika Pandey
                    </p>
                </div>

                <p className="
                    mt-4
                    block
                    w-full
                    text-xs
                    sm:text-sm
                    text-gray-300
                    leading-5
                    sm:leading-6
                ">
                    A great place for beginners. The content is easy
                    to understand and the learning tools are useful.
                </p>

                <div className="
                    mt-4
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    gap-1
                    sm:gap-3
                ">
                    <div className="flex gap-1 text-yellow-400">
                        ★ ★ ★ ★ ★
                    </div>

                    <p className="text-white font-semibold text-sm">
                        5★ Rating
                    </p>
                </div>

            </div>

        </div>
    </div>

</div>

      {/* footer */}
      <div className='mt-[50px]'>
            <Footer/>
      </div>

    </div>
  )
}

export default Home
