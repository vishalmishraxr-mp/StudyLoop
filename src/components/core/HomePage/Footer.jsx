import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#111927] text-white">

      {/* Main Footer */}
      <div className="w-[92%] max-w-[1450px] mx-auto pt-14 pb-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.1fr_1.3fr_1.1fr_1.1fr_1.1fr_1.3fr] gap-x-10">

          {/* ================= LEFT SECTION ================= */}
          <div>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 mb-7">
              <div className="w-11 h-11 rounded-full bg-white text-[#111927] flex items-center justify-center text-2xl font-bold">
                S
              </div>

              <span className="text-2xl font-bold tracking-tight">
                Study<span className="text-yellow-400">Loop</span>
              </span>
            </Link>

            {/* Company */}
            <h3 className="text-lg font-semibold text-gray-200 mb-5">
              Company
            </h3>

            <ul className="space-y-4 text-[16px] text-gray-500">
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition duration-200"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition duration-200"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="/careers"
                  className="hover:text-white transition duration-200"
                >
                  Careers
                </Link>
              </li>

              <li>
                <Link
                  to="/signup?role=instructor"
                  className="hover:text-white transition duration-200"
                >
                  Become an Instructor
                </Link>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-7 text-gray-500">

              <a
                href="#"
                className="hover:text-white transition duration-200"
              >
                <FaGithub size={20} />
              </a>

              <a
                href="#"
                className="hover:text-white transition duration-200"
              >
                <FaLinkedin size={20} />
              </a>

              <a
                href="#"
                className="hover:text-white transition duration-200"
              >
                <FaTwitter size={20} />
              </a>

              <a
                href="#"
                className="hover:text-white transition duration-200"
              >
                <FaYoutube size={21} />
              </a>

            </div>
          </div>


          {/* ================= RESOURCES ================= */}
          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-5">
              Resources
            </h3>

            <ul className="space-y-4 text-[16px] text-gray-500">

              <li>
                <Link to="/courses" className="hover:text-white transition">
                  Courses
                </Link>
              </li>

              <li>
                <Link to="/learning-paths" className="hover:text-white transition">
                  Learning Paths
                </Link>
              </li>

              <li>
                <Link to="/practice" className="hover:text-white transition">
                  Coding Practice
                </Link>
              </li>

              <li>
                <Link to="/projects" className="hover:text-white transition">
                  Projects
                </Link>
              </li>

              <li>
                <Link to="/blog" className="hover:text-white transition">
                  Blog
                </Link>
              </li>

              <li>
                <Link to="/docs" className="hover:text-white transition">
                  Documentation
                </Link>
              </li>

              <li>
                <Link to="/videos" className="hover:text-white transition">
                  Videos
                </Link>
              </li>

              <li>
                <Link to="/challenges" className="hover:text-white transition">
                  Code Challenges
                </Link>
              </li>

            </ul>
          </div>


          {/* ================= PLANS + COMMUNITY ================= */}
          <div>

            <h3 className="text-lg font-semibold text-gray-200 mb-5">
              Plans
            </h3>

            <ul className="space-y-4 text-[16px] text-gray-500">

              <li>
                <Link to="/plans" className="hover:text-white transition">
                  Premium Membership
                </Link>
              </li>

              <li>
                <Link to="/plans" className="hover:text-white transition">
                  For Students
                </Link>
              </li>

              <li>
                <Link to="/business" className="hover:text-white transition">
                  Business Solutions
                </Link>
              </li>

            </ul>


            {/* Community */}
            <h3 className="text-lg font-semibold text-gray-200 mt-10 mb-5">
              Community
            </h3>

            <ul className="space-y-4 text-[16px] text-gray-500">

              <li>
                <Link to="/community" className="hover:text-white transition">
                  Community
                </Link>
              </li>

              <li>
                <Link to="/discussion" className="hover:text-white transition">
                  Discussions
                </Link>
              </li>

              <li>
                <Link to="/events" className="hover:text-white transition">
                  Events
                </Link>
              </li>

            </ul>


            {/* Support */}
            <h3 className="text-lg font-semibold text-gray-200 mt-10 mb-5">
              Support
            </h3>

            <ul className="space-y-4 text-[16px] text-gray-500">

              <li>
                <Link to="/help" className="hover:text-white transition">
                  Help Center
                </Link>
              </li>

              <li>
                <Link to="/faq" className="hover:text-white transition">
                  FAQs
                </Link>
              </li>

            </ul>

          </div>


          {/* ================= DIVIDER ================= */}
          <div className="hidden lg:block border-l border-white/10 h-full">
          </div>


          {/* ================= SUBJECTS ================= */}
          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-5">
              Subjects
            </h3>

            <ul className="space-y-4 text-[16px] text-gray-500">

              <li>
                <Link to="#" className="hover:text-white transition">
                  Web Development
                </Link>
              </li>

              <li>
                <Link to="#" className="hover:text-white transition">
                  Data Structures & Algorithms
                </Link>
              </li>

              <li>
                <Link to="#" className="hover:text-white transition">
                  Computer Science
                </Link>
              </li>

              <li>
                <Link to="#" className="hover:text-white transition">
                  Artificial Intelligence
                </Link>
              </li>

              <li>
                <Link to="#" className="hover:text-white transition">
                  Machine Learning
                </Link>
              </li>

              <li>
                <Link to="#" className="hover:text-white transition">
                  Data Science
                </Link>
              </li>

              <li>
                <Link to="#" className="hover:text-white transition">
                  Database
                </Link>
              </li>

              <li>
                <Link to="#" className="hover:text-white transition">
                  Cloud Computing
                </Link>
              </li>

              <li>
                <Link to="#" className="hover:text-white transition">
                  Cybersecurity
                </Link>
              </li>

              <li>
                <Link to="#" className="hover:text-white transition">
                  DevOps
                </Link>
              </li>

            </ul>
          </div>


          {/* ================= LANGUAGES ================= */}
          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-5">
              Languages
            </h3>

            <ul className="space-y-4 text-[16px] text-gray-500">

              <li>HTML & CSS</li>
              <li>JavaScript</li>
              <li>TypeScript</li>
              <li>React</li>
              <li>Node.js</li>
              <li>Python</li>
              <li>Java</li>
              <li>C++</li>
              <li>C</li>
              <li>C#</li>
              <li>Go</li>
              <li>Rust</li>
              <li>SQL</li>
              <li>PHP</li>

            </ul>
          </div>


          {/* ================= CAREER ================= */}
          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-5">
              Career Building
            </h3>

            <ul className="space-y-4 text-[16px] text-gray-500">

              <li>
                <Link to="#" className="hover:text-white transition">
                  Career Paths
                </Link>
              </li>

              <li>
                <Link to="#" className="hover:text-white transition">
                  Interview Preparation
                </Link>
              </li>

              <li>
                <Link to="#" className="hover:text-white transition">
                  Resume Building
                </Link>
              </li>

              <li>
                <Link to="#" className="hover:text-white transition">
                  Job Preparation
                </Link>
              </li>

              <li>
                <Link to="#" className="hover:text-white transition">
                  Skill Assessment
                </Link>
              </li>

              <li>
                <Link to="#" className="hover:text-white transition">
                  Full Course Catalog
                </Link>
              </li>

            </ul>
          </div>

        </div>


        {/* ================= BOTTOM DIVIDER ================= */}
        <div className="border-t border-white/10 mt-16">
        </div>


        {/* ================= BOTTOM BAR ================= */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-7 text-[15px] text-gray-500">

          {/* Left */}
          <div className="flex items-center gap-3">

            <Link
              to="/privacy"
              className="hover:text-white transition"
            >
              Privacy Policy
            </Link>

            <span className="text-gray-700">|</span>

            <Link
              to="/terms"
              className="hover:text-white transition"
            >
              Terms
            </Link>

            <span className="text-gray-700">|</span>

            <Link
              to="/cookies"
              className="hover:text-white transition"
            >
              Cookie Policy
            </Link>

          </div>


          {/* Right */}
          <p>
            Made with <span className="text-red-500">❤️</span> by StudyLoop ©{" "}
            {new Date().getFullYear()}
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;