import { useEffect, useState } from "react";

export default function Result(props) {
  const [data, setData] = useState(props.data);
  const media_type = props.data?.media_type;
  const [name, setName] = useState(
    media_type === "movie" ? props.data?.title : props.data?.name
  );
  const [info1, setInfo1] = useState(() => {
    if (media_type === "person") {
      return props.data?.known_for_department || "N/A";
    }
    if (media_type === "movie") {
      return props.data?.release_date
        ? props.data.release_date.substr(0, 4)
        : "N/A";
    }
    return props.data?.first_air_date
      ? props.data.first_air_date.substr(0, 4)
      : "N/A";
  });

  const [info2, setInfo2] = useState(
    media_type && media_type === "person"
      ? props.data?.known_for[0]?.title || props.data?.known_for[0]?.name
      : media_type
  );

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const img = data?.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : data?.profile_path
    ? `https://image.tmdb.org/t/p/w500${data.profile_path}`
    : `https://static.vecteezy.com/system/resources/thumbnails/020/911/746/small/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png`;

  return (
    <div className="flex gap-2.5 hover:bg-zinc-700 p-2 rounded-lg">
      <img
        src={img}
        alt={`${name} Image`}
        width="80"
        height="150"
        className="object-cover rounded-lg"
      ></img>
      <div>
        <h2 className="text-base font-bold">{name}</h2>
        <span className="inline-block text-sm text-zinc-300 pr-2">
          &middot; {info1 ? info1 : "N/A"}
          {", "}
        </span>
        <span className="inline-block capitalize text-sm text-zinc-300">
          {info2}
        </span>
      </div>
    </div>
  );
}
