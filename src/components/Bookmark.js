import { useState } from "react";
import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";

export default function BookmarkIcon() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div onClick={handleClick} className="hover:cursor-pointer">
      {isClicked ? (
        <BookmarkIconSolid className="size-6 text-white"></BookmarkIconSolid>
      ) : (
        <BookmarkIconOutline className="size-6 text-white"></BookmarkIconOutline>
      )}
    </div>
  );
}
