import React from "react";

function convertToEmbedUrl(url) {
  if (!url) return "";

  if (url.includes("youtube.com/embed/")) {
    return url;
  }

  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }

  if (url.includes("youtube.com/watch")) {
    const urlParams = new URLSearchParams(url.split("?")[1]);
    const videoId = urlParams.get("v");
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }

  return url;
}

function YouTubeEmbed({
  url,
  title = "YouTube video",
  className = "w-full h-64 rounded-lg",
  onError = null,
}) {
  const embedUrl = convertToEmbedUrl(url);
  const [hasError, setHasError] = React.useState(false);

  if (!embedUrl) return null;

  const handleError = (error) => {
    console.warn("YouTube embed error:", error);
    setHasError(true);
    if (onError) onError(error);
  };

  const handleLoad = (event) => {
    setHasError(false);
  };

  if (hasError) {
    return (
      <div
        className={`${className} bg-gray-100 flex items-center justify-center`}
      >
        <p className="text-gray-500">Unable to load YouTube video</p>
      </div>
    );
  }

  return (
    <iframe
      src={embedUrl}
      title={title}
      className={className}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      onError={handleError}
      onLoad={handleLoad}
    ></iframe>
  );
}

export default YouTubeEmbed;
