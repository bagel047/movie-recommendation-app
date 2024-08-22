import { useState } from "react";

export default function Review(props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const imageUrl = props.data.author_details.avatar_path
    ? `https://image.tmdb.org/t/p/w500/${props.data.author_details.avatar_path}`
    : `https://static.vecteezy.com/system/resources/thumbnails/020/911/746/small/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png`;

  const contentLimit = 200;
  const content = props.data.content;

  return (
    <div className="w-full mb-3 p-3 border-b border-zinc-700">
      <div className="flex items-center mb-2">
        <img
          src={imageUrl}
          className="rounded-full w-8 h-8 border-1 border-black"
          alt="Author"
        />
        <span className="pl-3 font-semibold text-sm">{props.data.author}</span>
      </div>

      <div className="text-justify text-xs text-zinc-300 text-wrap">
        {isExpanded
          ? content
          : content.slice(0, contentLimit) +
            (content.length > contentLimit ? "..." : "")}
        {content.length > contentLimit && (
          <span
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-block text-white hover:underline hover:cursor-pointer pl-1"
          >
            {isExpanded ? "read less" : "read more"}
          </span>
        )}
      </div>
    </div>
  );
}
