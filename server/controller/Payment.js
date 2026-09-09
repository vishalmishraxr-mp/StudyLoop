const crypto = require("crypto");
const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const courseEnrollmentEmail = require("../mail/templates/courseEnrollmentEmail");
const {default: mongoose} = require("mongoose");
const paymentSuccessEmail = require("../mail/templates/paymentSuccessEmail");


// initiate the razorpay order
exports.capturePayment = async (req, res) => {
    const { courses } = req.body;
    const userId = req.user.id;

    // validation
    if (!courses || courses.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Courses not found",
        });
    }

    let totalAmount = 0;

    for (const course_id of courses) {

        try {
            const course = await Course.findById(course_id);

            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: "Course not found",
                });
            }

            const uid = new mongoose.Types.ObjectId(userId);

            // Check if already enrolled
            if (course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({
                    success: false,
                    message: "Student already enrolled",
                });
            }

            totalAmount += course.price;

        } catch (error) {

            console.log("capturePayment error:", error);

            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    const options = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
    };

    try {

        const paymentResponse = await instance.orders.create(options);

        return res.status(200).json({
            success: true,
            message: paymentResponse,
        });

    } catch (error) {

        console.log(" Razorpay order error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to initiate the order",
        });
    }
};

// verify the payment 
exports.verifySignature = async (req,res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature 
        || !courses || !userId){
            return res.status(200).json({
                success: false,
                message: "payment failde, please try again!" 
            })
        }
        let body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString()).digest("hex");

        if(expectedSignature === razorpay_signature){
            // enrolled the student in the course
            await enrollStudent(courses, userId, res);

            // return the response
            return res.status(200).json({
                success: true,
                message: "Payment Verified successfully!",
            })
        }
        return res.status(500).json({
             success: false,
             message: "Payment failed!",
        })
}

const enrollStudent = async (courses, userId, res) => {

    if(!courses || !userId) {
        return res.status(500).json({
             success: false,
             message: "Please provide the course Data and userid",
        })
    }
    for(const courseId of courses) {
        try{
            const enrolledCourse = await Course.findOneAndUpdate(
            {_id: courseId},
            {$push: {studentsEnrolled: userId}},
            {new: true},
        )

    if(!enrolledCourse){
        return res.status(500).json({
             success: false,
             message: "Course not found",
        })
    }

    const enrollStudent = await User.findByIdAndUpdate(userId,
        {$push: {courses: courseId

            }},
            {new: true})

            //send mail to the student 
        const emailResponse = await mailSender(
            enrollStudent.email,
            `successfully Enrolled into the ${enrolledCourse.courseName}`,
            courseEnrollmentEmail(enrolledCourse.courseName, `${enrollStudent.firstName}`)
        )
        console.log("Email sent successfully!", emailResponse.response);
        } catch(error){
            console.log(error);
             return res.status(500).json({
                success: false,
                message: "fialde to sent the mail", 
             })
       }
    } 
}

exports.sendPaymentSuccessEmail = async (req, res) => {
    try {
        const { orderId, paymentId, amount } = req.body;

        // Auth middleware se user ID
        const userId = req.user.id;

        // Validation
        if (!userId || !orderId || !amount || !paymentId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Find student
        const enrollStudent = await User.findById(userId);

        if (!enrollStudent) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        // Send email
        await mailSender(
            enrollStudent.email,
            "Payment Received - StudyLoop",
            paymentSuccessEmail(
                enrollStudent.firstName,
                amount / 100,
                orderId,
                paymentId
            )
        );


        return res.status(200).json({
            success: true,
            message: "Payment success email sent successfully",
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Failed to send payment success email",
            error: error.message,
        });
    }
}


// exports.capturePayment = async (req, res) => {
//     try {
//         const { course_id } = req.body;
//         const userId = req.user.id;

//         if (!course_id) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please provide a valid course ID",
//             });
//         }

//         const course = await Course.findById(course_id);
//         if (!course) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Course not found",
//             });
//         }

//         const alreadyEnrolled = course.studentsEnrolled.some(
//             (id) => id.toString() === userId.toString()
//         );

//         if (alreadyEnrolled) {
//             return res.status(409).json({
//                 success: false,
//                 message: "Student is already enrolled",
//             });
//         }

//         const options = {
//             amount: Math.round(course.price * 100),
//             currency: "INR",
//             receipt: `course_${course_id}_${Date.now()}`,
//             notes: {
//                 courseId: course_id.toString(),
//                 userId: userId.toString(),
//             },
//         };

//         const paymentResponse = await instance.orders.create(options);

//         return res.status(200).json({
//             success: true,
//             courseName: course.courseName,
//             courseDescription: course.courseDescription,
//             thumbnail: course.thumbnail,
//             orderId: paymentResponse.id,
//             amount: paymentResponse.amount,
//             currency: paymentResponse.currency,
//         });
//     } catch (error) {
//         console.error("capturePayment:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Could not initiate the payment",
//         });
//     }
// };

// exports.verifySignature = async (req, res) => {
//     try {
//         const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

//         if (!webhookSecret) {
//             return res.status(500).json({
//                 success: false,
//                 message: "Razorpay webhook secret is not configured",
//             });
//         }

//         const signature = req.headers["x-razorpay-signature"];
//         const rawBody = req.rawBody || JSON.stringify(req.body);

//         const digest = crypto
//             .createHmac("sha256", webhookSecret)
//             .update(rawBody)
//             .digest("hex");

//         if (signature !== digest) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid webhook signature",
//             });
//         }

//         const notes =
//             req.body?.payload?.payment?.entity?.notes ||
//             req.body?.payload?.order?.entity?.notes ||
//             {};

//         const { courseId, userId } = notes;

//         if (!courseId || !userId) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Course or user information is missing",
//             });
//         }

//         const enrolledCourse = await Course.findByIdAndUpdate(
//             courseId,
//             { $addToSet: { studentsEnrolled: userId } },
//             { new: true }
//         );

//         if (!enrolledCourse) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Course not found",
//             });
//         }

//         const enrolledStudent = await User.findByIdAndUpdate(
//             userId,
//             { $addToSet: { courses: courseId } },
//             { new: true }
//         );

//         if (!enrolledStudent) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Student not found",
//             });
//         }

//         await mailSender(
//             enrolledStudent.email,
//             "Course Enrollment Successful",
//             courseEnrollmentEmail(
//                 enrolledCourse.courseName,
//                 `${enrolledStudent.firstName} ${enrolledStudent.lastName}`.trim()
//             )
//         );

//         return res.status(200).json({
//             success: true,
//             message: "Payment verified and course enrollment completed",
//         });
//     } catch (error) {
//         console.error("verifySignature:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Payment verification failed",
//         });
//     }
// };
