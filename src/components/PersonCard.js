import { useEffect, useState } from "react";
import logo1 from "../assets/images/logo1.png";

export default function PersonCard(props) {
  const imageUrl = props.data.profile_path
    ? `https://image.tmdb.org/t/p/w500/${props.data.profile_path}`
    : `https://static.vecteezy.com/system/resources/thumbnails/020/911/746/small/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png`;

  return (
    <div className="min-w-44 max-h-64 flex flex-col items-center justify-content-start gap-y-4 inline-block mr-2.5">
      <div className="min-w-40 h-1/2 px-3">
        <img
          src={imageUrl}
          alt={`${props.data.name} Image`}
          className="object-cover w-full h-full rounded-full border-2 border-black"
        ></img>
      </div>
      <div className="min-w-40">
        <h3 className="text-sm font-bold text-center">{props.data.name}</h3>
        <h4 className="text-sm text-center text-wrap">
          <span className="text-zinc-300">as </span>
          {props.data.character}
        </h4>
      </div>
    </div>
  );
}
