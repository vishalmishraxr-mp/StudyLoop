export const formatDate = (dateString) => {
    if (!dateString) {
        return "Date not available";
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const formattedDate = date.toLocaleDateString("en-US", options);

    const hour = date.getHours();
    const minute = date.getMinutes();
    const period = hour >= 12 ? "PM" : "AM";

    const formattedTime = `${hour % 12 || 12}:${minute
        .toString()
        .padStart(2, "0")} ${period}`;

    return `${formattedDate} | ${formattedTime}`;
};