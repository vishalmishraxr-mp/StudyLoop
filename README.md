# StudyLoop

StudyLoop is a full-stack online learning platform where students can explore and purchase courses, while instructors can create and manage their own courses.

The platform provides separate experiences for students, instructors, and administrators, along with authentication, course management, payments, and learning progress features.

## Live Demo

https://study-loop-rosy.vercel.app/

## Features

### Authentication

* User registration and login
* Student and instructor account types
* OTP-based email verification
* Password reset through email
* Change password functionality
* Protected routes based on authentication
* Role-based access for students, instructors, and administrators

### Student Features

* Browse available courses
* View detailed course information
* Add courses to cart
* Remove courses from cart
* Purchase courses
* Access enrolled courses
* Watch course lectures
* Track learning progress
* Rate and review courses
* Manage profile and account settings

### Instructor Features

* Instructor dashboard
* Create courses
* Add sections and subsections
* Upload course content
* Update courses
* Delete courses
* Change course status
* Manage instructor profile

### Admin Features

* Admin dashboard
* View platform statistics
* Manage users
* Update user roles
* Delete users
* View courses

### Payment

* Course purchase through Razorpay
* Payment verification on the backend
* Payment success email

### Media and Email

* Cloudinary integration for media uploads
* Email functionality for OTP verification
* Password reset emails
* Course enrollment/payment related emails

## Tech Stack

### Frontend

* React
* Vite
* React Router
* Redux Toolkit
* Axios
* Tailwind CSS
* React Hot Toast
* Lucide React
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt
* Nodemailer
* Cloudinary
* Razorpay
* CORS

## Project Structure

```text
StudyLoop/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── slices/
│   ├── hooks/
│   ├── reducer/
│   ├── asset/
│   ├── App.jsx
│   └── main.jsx
│
├── server/
│   ├── config/
│   ├── controller/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.js
│
├── public/
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* MongoDB or a MongoDB Atlas database

You will also need accounts/configuration for the external services used by the application, such as Cloudinary, Razorpay, and an email service.

### Clone the Repository

```bash
git clone <your-github-repository-url>
cd StudyLoop
```

### Install Frontend Dependencies

```bash
npm install
```

### Install Backend Dependencies

```bash
cd server
npm install
```

### Environment Variables

Create a `.env` file in the frontend and backend directories as required by the application.

Do not commit `.env` files or any API keys, database credentials, payment keys, or other secrets to GitHub.

Typical backend configuration includes values for:

```text
PORT
MONGO_URL
JWT_SECRET
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
RAZORPAY_KEY
RAZORPAY_SECRET
FRONTEND_URL
```

Use the variable names required by the current project configuration and keep their values private.

### Run the Backend

From the `server` directory:

```bash
npm run dev
```

### Run the Frontend

From the project root:

```bash
npm run dev
```

The Vite development server will provide the local frontend URL in the terminal.

## API Structure

The backend API is organized into separate route groups:

```text
/api/v1/auth
/api/v1/profile
/api/v1/payment
/api/v1/course
/api/v1/category
/api/v1/tag
/api/v1/cart
/api/v1/admin
```

Authentication and role-based middleware are used to protect restricted operations.

## Deployment

The frontend is deployed on Vercel.

Live application:

https://study-loop-rosy.vercel.app/

The backend can be deployed separately using a Node.js compatible hosting platform, with the required environment variables configured in the deployment environment.

## Learning and Development

StudyLoop was built as a full-stack learning project to understand how a modern web application works across the frontend, backend, database, authentication, payments, media storage, and deployment layers.

The project provided practical experience with React, Redux, Node.js, Express, MongoDB, REST APIs, authentication, third-party service integration, and deployment.

## Future Improvements

Some possible improvements include:

* Course search and advanced filtering
* Better course recommendation system
* Improved analytics for instructors
* More detailed student learning analytics
* Wishlist functionality
* Course certificates
* Improved mobile experience
* More payment options
* Real-time notifications

## ----------------

GitHub: <https://github.com/vishalmishraxr-mp>

LinkedIn: <https://www.linkedin.com/in/vishal-mishra-a49638385/>
