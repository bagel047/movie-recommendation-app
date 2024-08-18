import React from "react";

const StarRating = ({ rating }) => {
  const clampedRating = Math.min(Math.max(rating / 2, 0), 5); // Scale rating to 5 stars
  const filledStars = Math.floor(clampedRating);
  const hasHalfStar = clampedRating % 1 >= 0.5;

  return (
    <div className="flex items-center space-x-1 rtl:space-x-reverse">
      {Array.from({ length: 5 }).map((_, index) => {
        if (index < filledStars) {
          return (
            <svg
              key={index}
              className="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          );
        } else if (index === filledStars && hasHalfStar) {
          return (
            <svg
              key={index}
              className="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M10 15.273l-2.176 1.143.496-2.164L6.065 11.2l2.197-.153L10 9.273l1.738 1.774 2.198.153-1.579 1.738.496 2.164L10 15.273zM10 0l3.246 6.483L20 7.29l-4.818 4.605 1.134 6.607L10 13.774 3.684 18.502l1.134-6.607L0 7.29l6.754-1.807L10 0z" />
            </svg>
          );
        } else {
          return (
            <svg
              key={index}
              className="w-4 h-4 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          );
        }
      })}
    </div>
  );
};

export default StarRating;
