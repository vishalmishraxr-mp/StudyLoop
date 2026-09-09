const Cart = require("../models/Cart");
const Course = require("../models/Course");

exports.addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { courseId } = req.body;

        // Validate courseId
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required",
            });
        }

        // Check whether course exists
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        // Find user's cart
        let cart = await Cart.findOne({
            user: userId,
        });

        // If cart doesn't exist, create one
        if (!cart) {
            cart = await Cart.create({
                user: userId,
                courses: [courseId],
            });

            return res.status(201).json({
                success: true,
                message: "Course added to cart",
                cart,
                totalItems: cart.courses.length,
            });
        }

        // Check if course is already in cart
        if (
            cart.courses.some(
                (id) => id.toString() === courseId.toString()
            )
        ) {
            return res.status(400).json({
                success: false,
                message: "Course is already in cart",
                totalItems: cart.courses.length,
            });
        }

        // Add course
        cart.courses.push(courseId);

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Course added to cart",
            cart,
            totalItems: cart.courses.length,
        });

    } catch (error) {
        console.error(
            "Error while adding course to cart:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Unable to add course to cart",
            error: error.message,
        });
    }
};


exports.getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({
            user: userId,
        }).populate("courses");

        // Cart doesn't exist
        if (!cart) {
            return res.status(200).json({
                success: true,
                message: "Cart is empty",
                courses: [],
                totalItems: 0,
            });
        }

        return res.status(200).json({
            success: true,
            courses: cart.courses,
            totalItems: cart.courses.length,
        });

    } catch (error) {
        console.error(
            "Error while getting cart:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Unable to get cart",
            error: error.message,
        });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { courseId } = req.body;

        // Validate courseId
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required",
            });
        }

        // Find user's cart
        const cart = await Cart.findOne({
            user: userId,
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        // Remove course
        cart.courses = cart.courses.filter(
            (id) =>
                id.toString() !== courseId.toString()
        );

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Course removed from cart",
            totalItems: cart.courses.length,
        });

    } catch (error) {
        console.error(
            "Error while removing course from cart:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Unable to remove course from cart",
            error: error.message,
        });
    }
};