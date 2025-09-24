import YouTubeEmbed from "@/helper/YouTubeEmbed";
import { Rating } from "@smastrom/react-rating";
import React from "react";

function ReviewVideos({ name, rating, img }) {
  return (
    <div className="cover">
      <div className="item bg-second p-5 rounded-md">
        <div className="bottom">
          <YouTubeEmbed
            url={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
            title="Teacher Introduction"
            className="w-full h-64 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default ReviewVideos;
