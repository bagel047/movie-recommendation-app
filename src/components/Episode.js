import { useState } from "react";

export default function Episode(props) {
  const [data, setData] = useState(props.data);
  const img =
    data && data.still_path
      ? `https://image.tmdb.org/t/p/w500${data.still_path}`
      : "";

  return (
    <div className="w-full mt-3 bg-zinc-900 p-8 rounded-md flex gap-3 items-start">
      <img
        src={img}
        alt={`Episode ${data.episode_number} Image`}
        className="aspect-video object-cover h-36 w-64 rounded-md"
      ></img>
      <div className="">
        <h4 className="text-sm text-zinc-400 inline-block pr-2">
          Episode {data?.episode_number}
        </h4>
        <span className="text-sm text-zinc-400 inline-block">
          &middot; {data?.runtime}m
        </span>
        <h3 className="text-2xl font-bold">{data?.name}</h3>
        <p className="mt-2.5 text-sm text-zinc-200">{data?.overview}</p>
      </div>
    </div>
  );
}
