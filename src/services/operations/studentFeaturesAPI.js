import { apiConnector } from "../apiConnector";
import { studetnEndpoints } from "../apis";
import toast from "react-hot-toast";
import rzpLogo from "../../asset/logoImage/rzpLogo.png";
import { resetCart } from "../../slices/cartSlice";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_MAIL_API,
} = studetnEndpoints;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");

    script.src = src;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
}

export async function buyCourse(
  token,
  courses,
  userDetails,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Loading...");

  try {
    // Load Razorpay SDK
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.dismiss(toastId);
      toast.error(
        "Razorpay SDK failed to load. Check your internet connection."
      );
      return;
    }

    // Create Razorpay order
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    // Backend error handling
    if (!orderResponse.data.success) {
      toast.dismiss(toastId);

      if (
        orderResponse.data.message === "Student already enrolled"
      ) {
        toast.error("You are already enrolled in this course!");
        return;
      }

      toast.error(
        orderResponse.data.message || "Could not create payment order"
      );
      return;
    }

    // Remove loading toast
    toast.dismiss(toastId);

    // Razorpay options
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,

      currency: orderResponse.data.message.currency,

      amount: `${orderResponse.data.message.amount}`,

      order_id: orderResponse.data.message.id,

      name: "StudyLoop",

      description: "Thank You for purchasing the course",

      image: rzpLogo,

      prefill: {
        name: userDetails?.firstName || "Student",
        email: userDetails?.email || "",
      },

      handler: function (response) {
        console.log("RAZORPAY RESPONSE:", response);

        sendPaymentSuccessEmail(
          response,
          orderResponse.data.message.amount,
          token
        );

        verifySignature(
          {
            ...response,
            courses,
          },
          token,
          navigate,
          dispatch
        );
      },

      theme: {
        color: "#FACC15",
      },
    };

    // Open Razorpay
    const rzp = new window.Razorpay(options);

    rzp.open();

  } catch (error) {
    console.log("BUY COURSE ERROR:", error);

    toast.dismiss(toastId);

    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Could not make payment"
    );
  }
}



async function sendPaymentSuccessEmail(
  response,
  amount,
  token
) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_MAIL_API,
      {
        orderId: response.razorpay_order_id,

        paymentId: response.razorpay_payment_id,

        amount: amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("Payment success email sent");

  } catch (error) {
    console.log(
      "Error sending payment success email:",
      error
    );

    toast.error(
      "Failed to send payment confirmation email."
    );
  }
}


async function verifySignature(
  bodyData,
  token,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Verifying payment...");

  try {
    const response = await apiConnector(
      "POST",
      COURSE_VERIFY_API,
      bodyData,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log(
      "PAYMENT VERIFY RESPONSE:",
      response
    );

    if (!response.data.success) {
      throw new Error(
        response.data.message
      );
    }

    toast.dismiss(toastId);

    toast.success(
      "Payment successful! You are now enrolled."
    );

    localStorage.removeItem("totalItems");
    dispatch(resetCart());

    navigate(
      "/dashboard/enrolled-courses"
    );

  } catch (error) {
    console.log(
      "Payment verification error:",
      error
    );

    toast.dismiss(toastId);

    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Could not verify payment. Please contact support."
    );
  }
}