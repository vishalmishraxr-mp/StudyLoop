
import React from "react";

const RatingStars = ({ Review_Count = 0, Star_Size = 20 }) => {
  const rating = Math.round(Number(Review_Count) || 0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            fontSize: `${Star_Size}px`,
            lineHeight: 1,
          }}
          className={
            star <= rating
              ? "text-yellow-400"
              : "text-gray-600"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default RatingStars;