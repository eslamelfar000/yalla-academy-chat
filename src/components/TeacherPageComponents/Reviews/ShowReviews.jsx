import React from "react";
import Reviews from "./Reviews";
import ReviewVideos from "./ReviewVideos/ReviewVideos";

function ShowReviews({ teacher }) {
  // Handle case where teacher is undefined
  if (!teacher) {
    return (
      <div className="cover">
        <div className="sec-head mb-5 w-full">
          <h1 className="text-xl font-bold">Reviews</h1>
        </div>
        <div className="text-center py-8 text-gray-500">
          No teacher data available
        </div>
      </div>
    );
  }

  // Ensure reviews is an array and handle different data structures
  const reviews = Array.isArray(teacher?.reviews) ? teacher.reviews : [];

  const reviewVideos = Array.isArray(teacher?.video_reviews)
    ? teacher.video_reviews
    : [];


  // Calculate average rating safely
  // const averageRating =
  //   reviews.length > 0
  //     ? (
  //         reviews.reduce((acc, review) => acc + (review.rating || 0), 0) /
  //         reviews.length
  //       ).toFixed(1)
  //     : 0;

  return (
    <div className="space-y-16">
      <div className="cover w-full">
        <div className="sec-head mb-5 w-full">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <span className="text-main">({reviews.length})</span> Reviews
          </h1>
        </div>
        <div className="cards w-full max-h-[350px] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <Reviews
                  key={review.id || index}
                  name={review.review_by?.name || "Anonymous"}
                  rating={review.rate || 0}
                  img={
                    review.review_by?.image ||
                    "https://randomuser.me/api/portraits/men/1.jpg"
                  }
                  comment={
                    review.comment || review.text || "No comment provided"
                  }
                />
              ))
            ) : (
              <div className="col-span-2 text-center py-8 text-gray-500">
                No reviews yet. Be the first to review this teacher!
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="cover w-full">
        <div className="sec-head mb-5 w-full">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <span className="text-main">({reviews.length})</span>Students Review
            Videos
          </h1>
        </div>
        <div className="cards w-full max-h-[350px] overflow-y-auto">
          {reviewVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
              {reviewVideos.map((reviewVideo, index) => (
                <ReviewVideos
                  key={reviewVideo.id || index}
                  url={reviewVideo.url}
                  title={reviewVideo.title}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 flex items-center justify-center h-60 bg-gray-100 rounded-lg shadow-lg">
              <p className="text-main text-lg">No student review videos yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowReviews;
