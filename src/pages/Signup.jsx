// import React from "react";
// import logoImage from "../asset/images/logo.png";
// import { Link } from "react-router-dom";
// import Highlight from "../components/core/HomePage/Highlight";
// import { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import CTAButton from "../components/core/HomePage/Button"
// import signupImage from "../asset/images/signup.png";

// const Signup = () => {

//     const [accountType, setAccountType] = useState("student");
//     const [showPassword, setShowPassword] = useState(false);
//   return (
//     <div className="min-h-screen bg-[#111927]">


//       {/* Signup Content */}
//        <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-24">
//     <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

//         <div className="w-full lg:w-1/2 pt-12 sm:pt-16 lg:pt-20">

//             {/* Heading */}
//             <p className="text-white font-semibold text-2xl sm:text-3xl md:text-4xl leading-tight">
//                 Join the Millions Learning to Code With StudyLoop For Free
//             </p>

//             <p className="text-gray-400 text-lg sm:text-xl mt-6">
//                 Build Skills for Today, Tomorrow And Beyond

//                 <span className="block font-[cursive] text-lg sm:text-xl mt-1">
//                     <Highlight
//                         text={"Education to Future-Proof Your Career."}
//                         className="italic"
//                     />
//                 </span>
//             </p>

//             {/* Student / Instructor */}
//             <div className="inline-flex gap-2 border border-gray-500 rounded-full p-1 mt-8 sm:mt-10">

//                 <button
//                     onClick={() => setAccountType("student")}
//                     className={`px-4 sm:px-5 py-2 rounded-full text-white transition ${
//                         accountType === "student"
//                             ? "bg-gray-700"
//                             : "hover:bg-gray-700"
//                     }`}
//                 >
//                     Student
//                 </button>

//                 <button
//                     onClick={() => setAccountType("instructor")}
//                     className={`px-4 sm:px-5 py-2 rounded-full text-white transition ${
//                         accountType === "instructor"
//                             ? "bg-gray-700"
//                             : "hover:bg-gray-700"
//                     }`}
//                 >
//                     Instructor
//                 </button>

//             </div>

//             <div className="flex flex-col sm:flex-row gap-5 mt-10">

//                 <div className="w-full">
//                     <p className="text-white text-lg sm:text-xl mb-3">
//                         First Name <span className="text-red-800">*</span>
//                     </p>

//                     <input
//                         placeholder="Enter first Name.."
//                         className="bg-gray-700 h-[50px] w-full rounded-lg px-3 border-b-2 border-gray-400 text-white text-lg sm:text-xl outline-none"
//                     />
//                 </div>

//                 <div className="w-full">
//                     <p className="text-white text-lg sm:text-xl mb-3">
//                         Last Name <span className="text-red-800">*</span>
//                     </p>

//                     <input
//                         placeholder="Enter Last Name.."
//                         className="bg-gray-700 h-[50px] w-full rounded-lg px-3 border-b-2 border-gray-400 text-white text-lg sm:text-xl outline-none"
//                     />
//                 </div>

//             </div>

//             <div className="mt-8 sm:mt-10">

//                 <p className="text-white text-lg sm:text-xl mb-3">
//                     Email Address <span className="text-red-800">*</span>
//                 </p>

//                 <input
//                     type="email"
//                     placeholder="Enter email Address.."
//                     className="bg-gray-700 h-[50px] w-full rounded-lg px-3 border-b-2 border-gray-400 text-white text-lg sm:text-xl outline-none"
//                 />

//             </div>

//             <div className="flex flex-col sm:flex-row gap-5 mt-8 sm:mt-10">

//                 {/* Create Password */}
//                 <div className="w-full">

//                     <p className="text-white text-lg sm:text-xl mb-3">
//                         Create Password <span className="text-red-800">*</span>
//                     </p>

//                     <div className="relative">

//                         <input
//                             type={showPassword ? "text" : "password"}
//                             placeholder="Enter Password"
//                             className="bg-gray-700 h-[50px] w-full rounded-lg px-3 pr-10 border-b-2 border-gray-400 text-white text-lg sm:text-xl outline-none"
//                         />

//                         <button
//                             type="button"
//                             onClick={() => setShowPassword(!showPassword)}
//                             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
//                         >
//                             {showPassword ? (
//                                 <EyeOff size={20} />
//                             ) : (
//                                 <Eye size={20} />
//                             )}
//                         </button>

//                     </div>

//                 </div>

//                 {/* Confirm Password */}
//                 <div className="w-full">

//                     <p className="text-white text-lg sm:text-xl mb-3">
//                         Confirm Password <span className="text-red-800">*</span>
//                     </p>

//                     <div className="relative">

//                         <input
//                             type={showPassword ? "text" : "password"}
//                             placeholder="Confirm Password"
//                             className="bg-gray-700 h-[50px] w-full rounded-lg px-3 pr-10 border-b-2 border-gray-400 text-white text-lg sm:text-xl outline-none"
//                         />

//                         <button
//                             type="button"
//                             onClick={() =>
//                                 setShowPassword(!showPassword)
//                             }
//                             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
//                         >
//                             {showPassword ? (
//                                 <EyeOff size={20} />
//                             ) : (
//                                 <Eye size={20} />
//                             )}
//                         </button>

//                     </div>

//                 </div>

//             </div>

//             <Link
//                 to="/signup"
//                 className="mt-8 sm:mt-10 w-full flex justify-center items-center text-xl sm:text-2xl bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-200"
//             >
//                 Create Account
//             </Link>

//         </div>


     
//         <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-[50px]">

//             <img
//                 src={signupImage}
//                 alt="Signup"
//                 className="w-[70%] sm:w-[60%] md:w-[55%] lg:w-full max-w-[500px] h-[750px] object-cover object-top"
//             />

//         </div>

//     </div>
// </div>


//     </div>
//   );
// };

// export default Signup;


import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import Highlight from "../components/core/HomePage/Highlight";
import signupImage from "../asset/images/signup.png";

import { apiConnector } from "../services/apiConnector";
import { auth } from "../services/apis";
import axios from 'axios';


const Signup = () => {
    console.log("ENV:", import.meta.env);
console.log("BASE URL:", import.meta.env.VITE_BASE_URL);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Account type
    const roleParam = searchParams.get("role");
    const initialAccountType = (roleParam && roleParam.toLowerCase() === "instructor") ? "Instructor" : "Student";
    const [accountType, setAccountType] = useState(initialAccountType);

    useEffect(() => {
        const param = searchParams.get("role");
        if (param && param.toLowerCase() === "instructor") {
            setAccountType("Instructor");
        } else if (param && param.toLowerCase() === "student") {
            setAccountType("Student");
        }
    }, [searchParams]);

    // Password visibility
    const [showPassword, setShowPassword] = useState(false);

    // Form data
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // OTP
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);

    // Loading
    const [loading, setLoading] = useState(false);


    // =========================
    // SEND OTP
    // =========================
    const handleSendOTP = async () => {

        try {
            console.log("OTP URL:", auth.SENDOTP_API);

            if (!email) {
                alert("Please enter your email address");
                return;
            }

            setLoading(true);

            const response = await apiConnector(
                "POST",
                auth.SENDOTP_API,
                {
                    email: email,
                }
            );

            console.log("SEND OTP RESPONSE:", response.data);

            if (response.data.success) {

                setOtpSent(true);

                alert("OTP sent successfully to your email");

            } else {

                alert(
                    response.data.message ||
                    "Failed to send OTP"
                );
            }

        } catch (error) {

            console.error("SEND OTP ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Failed to send OTP"
            );

        } finally {

            setLoading(false);

        }
    };


    // =========================
    // SIGNUP
    // =========================
    const handleSignup = async () => {

        try {

            // Validate fields
            if (
                !firstName ||
                !lastName ||
                !email ||
                !password ||
                !confirmPassword
            ) {
                alert("Please fill all required fields");
                return;
            }


            // Check password
            if (password !== confirmPassword) {

                alert("Passwords do not match");

                return;
            }


            // OTP required
            if (!otpSent) {

                alert("Please send OTP first");

                return;
            }


            if (!otp) {

                alert("Please enter OTP");

                return;
            }


            setLoading(true);


            const response = await apiConnector(
                "POST",
                auth.SIGNUP_API,
                {
                    firstName,
                    lastName,
                    email,
                    password,
                    confirmPassword,
                    accountType,
                    otp,
                }
            );


            console.log("SIGNUP RESPONSE:", response.data);


            if (response.data.success) {

                alert("Account created successfully!");

                // Navigate to login
                navigate("/login");

            } else {

                alert(
                    response.data.message ||
                    "Signup failed"
                );

            }

        } catch (error) {

            console.error("SIGNUP ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Signup failed"
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="min-h-screen bg-[#111927]">

            <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-24">

                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">


                    {/* =========================
                        LEFT SIDE
                    ========================== */}

                    <div className="w-full lg:w-1/2 pt-12 sm:pt-16 lg:pt-20">

                        {/* Heading */}

                        <p className="text-white font-semibold text-2xl sm:text-3xl md:text-4xl leading-tight">

                            Join the Millions Learning to Code With StudyLoop For Free

                        </p>


                        <p className="text-gray-400 text-lg sm:text-xl mt-6">

                            Build Skills for Today, Tomorrow And Beyond

                            <span className="block font-[cursive] text-lg sm:text-xl mt-1">

                                <Highlight
                                    text={"Education to Future-Proof Your Career."}
                                    className="italic"
                                />

                            </span>

                        </p>


                        {/* =========================
                            STUDENT / INSTRUCTOR
                        ========================== */}

                        <div className="inline-flex gap-2 border border-gray-500 rounded-full p-1 mt-8 sm:mt-10">

                            <button
                                type="button"
                                onClick={() => setAccountType("Student")}
                                className={`px-4 sm:px-5 py-2 rounded-full text-white transition ${
                                    accountType === "Student"
                                        ? "bg-gray-700"
                                        : "hover:bg-gray-700"
                                }`}
                            >
                                Student
                            </button>


                            <button
                                type="button"
                                onClick={() => setAccountType("Instructor")}
                                className={`px-4 sm:px-5 py-2 rounded-full text-white transition ${
                                    accountType === "Instructor"
                                        ? "bg-gray-700"
                                        : "hover:bg-gray-700"
                                }`}
                            >
                                Instructor
                            </button>

                        </div>


                        {/* =========================
                            FIRST + LAST NAME
                        ========================== */}

                        <div className="flex flex-col sm:flex-row gap-5 mt-10">


                            {/* First Name */}

                            <div className="w-full">

                                <p className="text-white text-lg sm:text-xl mb-3">

                                    First Name
                                    <span className="text-red-800">*</span>

                                </p>


                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                    placeholder="Enter first Name.."
                                    className="bg-gray-700 h-[50px] w-full rounded-lg px-3 border-b-2 border-gray-400 text-white text-lg sm:text-xl outline-none"
                                />

                            </div>


                            {/* Last Name */}

                            <div className="w-full">

                                <p className="text-white text-lg sm:text-xl mb-3">

                                    Last Name
                                    <span className="text-red-800">*</span>

                                </p>


                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                    placeholder="Enter Last Name.."
                                    className="bg-gray-700 h-[50px] w-full rounded-lg px-3 border-b-2 border-gray-400 text-white text-lg sm:text-xl outline-none"
                                />

                            </div>

                        </div>


                        {/* =========================
                            EMAIL
                        ========================== */}

                        <div className="mt-8 sm:mt-10">

                            <p className="text-white text-lg sm:text-xl mb-3">

                                Email Address
                                <span className="text-red-800">*</span>

                            </p>


                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="Enter email Address.."
                                className="bg-gray-700 h-[50px] w-full rounded-lg px-3 border-b-2 border-gray-400 text-white text-lg sm:text-xl outline-none"
                            />

                        </div>


                        {/* =========================
                            PASSWORD
                        ========================== */}

                        <div className="flex flex-col sm:flex-row gap-5 mt-8 sm:mt-10">


                            {/* Create Password */}

                            <div className="w-full">

                                <p className="text-white text-lg sm:text-xl mb-3">

                                    Create Password
                                    <span className="text-red-800">*</span>

                                </p>


                                <div className="relative">

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="Enter Password"
                                        className="bg-gray-700 h-[50px] w-full rounded-lg px-3 pr-10 border-b-2 border-gray-400 text-white text-lg sm:text-xl outline-none"
                                    />


                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                    >

                                        {showPassword ? (
                                            <EyeOff size={20} />
                                        ) : (
                                            <Eye size={20} />
                                        )}

                                    </button>

                                </div>

                            </div>


                            {/* Confirm Password */}

                            <div className="w-full">

                                <p className="text-white text-lg sm:text-xl mb-3">

                                    Confirm Password
                                    <span className="text-red-800">*</span>

                                </p>


                                <div className="relative">

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Confirm Password"
                                        className="bg-gray-700 h-[50px] w-full rounded-lg px-3 pr-10 border-b-2 border-gray-400 text-white text-lg sm:text-xl outline-none"
                                    />


                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                    >

                                        {showPassword ? (
                                            <EyeOff size={20} />
                                        ) : (
                                            <Eye size={20} />
                                        )}

                                    </button>

                                </div>

                            </div>

                        </div>


                        {/* =========================
                            SEND OTP
                        ========================== */}

                        <button
                            type="button"
                            onClick={handleSendOTP}
                            disabled={loading}
                            className="mt-8 sm:mt-10 w-full flex justify-center items-center text-xl sm:text-2xl bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >

                            {loading
                                ? "Sending OTP..."
                                : "Send OTP"
                            }

                        </button>


                        {/* =========================
                            OTP INPUT
                        ========================== */}

                        {otpSent && (

                            <div className="mt-8">

                                <p className="text-white text-lg sm:text-xl mb-3">

                                    Enter OTP
                                    <span className="text-red-800">*</span>

                                </p>


                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) =>
                                        setOtp(
                                            e.target.value.replace(
                                                /\D/g,
                                                ""
                                            )
                                        )
                                    }
                                    placeholder="Enter 6 digit OTP"
                                    maxLength={6}
                                    className="bg-gray-700 h-[50px] w-full rounded-lg px-3 border-b-2 border-gray-400 text-white text-lg sm:text-xl outline-none tracking-[8px]"
                                />

                            </div>

                        )}


                        {/* =========================
                            CREATE ACCOUNT
                        ========================== */}

                        <button
                            type="button"
                            onClick={handleSignup}
                            disabled={!otpSent || loading}
                            className="mt-8 sm:mt-10 w-full flex justify-center items-center text-xl sm:text-2xl bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >

                            {loading
                                ? "Creating Account..."
                                : "Create Account"
                            }

                        </button>

                    </div>


                    {/* =========================
                        RIGHT SIDE IMAGE
                    ========================== */}

                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-[50px]">

                        <img
                            src={signupImage}
                            alt="Signup"
                            className="w-[70%] sm:w-[60%] md:w-[55%] lg:w-full max-w-[500px] h-[750px] object-cover object-top"
                        />

                    </div>

                </div>

            </div>

        </div>

    );
};


export default Signup;