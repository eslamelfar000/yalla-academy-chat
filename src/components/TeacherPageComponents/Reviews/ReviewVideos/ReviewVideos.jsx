import YouTubeEmbed from "@/helper/YouTubeEmbed";
import React from "react";

function ReviewVideos({ url, title }) {
  return (
    <div className="cover">
      <div className="item bg-second p-5 rounded-md shadow-lg">
        <div className="top border-b border-gray-200 pb-5">
          <h2 className="text-md font-bold">{title}</h2>
        </div>
        <div className="bottom">
          <YouTubeEmbed
            url={url}
            title={title}
            className="w-full h-64 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default ReviewVideos;
