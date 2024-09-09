import { useState } from "react";
import profile_placeholder from "../assets/images/profile-placeholder.png";

export default function Review(props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const imageUrl = props.data.author_details.avatar_path
    ? `https://image.tmdb.org/t/p/w500/${props.data.author_details.avatar_path}`
    : `${profile_placeholder}`;

  const contentLimit = 200;
  const content = props.data.content;

  return (
    <div className="w-full mb-2.5 p-4 bg-zinc-950 bg-opacity-50 rounded-md">
      <div className="flex gap-2 items-end mb-2.5">
        <img
          src={imageUrl}
          className="rounded-full w-6 h-6 border-1 border-black"
          alt="Author"
        />
        <span className="text-sm">{props.data.author}</span>
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
            {isExpanded ? "show less" : "show more"}
          </span>
        )}
      </div>
    </div>
  );
}
