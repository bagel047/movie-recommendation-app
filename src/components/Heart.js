import { useState } from "react";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

export default function HeartIcon() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div onClick={handleClick} className="hover:cursor-pointer">
      {isClicked ? (
        <HeartIconSolid
          title="Remove from Favorites"
          className="size-6 text-red-600 hover:text-red-800"
        ></HeartIconSolid>
      ) : (
        <HeartIconOutline
          title="Add to Favorites"
          className="size-6 text-white hover:text-red-600"
        ></HeartIconOutline>
      )}
    </div>
  );
}
