import { useEffect, useState } from "react";
import profile_placeholder from "../assets/images/profile-placeholder.png";
import movie_placeholder from "../assets/images/movie-placeholder.png";

export default function Result(props) {
  const media_type = props.data?.media_type;

  const [name, setName] = useState(() => {
    return props.data?.title || props.data?.name;
  });

  const [info1, setInfo1] = useState(() => {
    let type = props.filter === "multi" ? media_type : props.filter;
    if (type === "person") {
      return props.data?.known_for_department || "N/A";
    } else {
      return props.data?.release_date || props.data?.first_air_date
        ? props.data.release_date?.substr(0, 4) ||
            props.data.first_air_date?.substr(0, 4)
        : "N/A";
    }
  });

  const [info2, setInfo2] = useState(() => {
    if (media_type === "person") {
      return (
        props.data?.known_for?.[0]?.title ||
        props.data?.known_for?.[0]?.name ||
        "N/A"
      );
    }
    return props.filter === "multi" ? media_type : props.filter;
  });

  const [img, setImg] = useState("");
  useEffect(() => {
    let type = props.filter === "multi" ? media_type : props.filter;
    if (type === "person") {
      props.data.profile_path !== null
        ? setImg(`https://image.tmdb.org/t/p/w500/${props.data.profile_path}`)
        : setImg(profile_placeholder);
    } else {
      props.data.poster_path !== null
        ? setImg(`https://image.tmdb.org/t/p/w500/${props.data.poster_path}`)
        : setImg(movie_placeholder);
    }
  }, [props.data]);

  return (
    <div className="flex gap-2.5 hover:bg-zinc-700 p-1 rounded-lg">
      <img
        src={img}
        alt={`${name} Image`}
        className="object-cover rounded-lg"
        style={{ width: "90px", height: "130px" }}
      ></img>
      <div className="mt-1">
        <h2 className="text-base mb-1">{name}</h2>
        <span className="inline-block text-sm text-zinc-400 pr-2">
          &middot; {info1 ? info1 : "N/A"}
          {", "}
        </span>
        <span className="inline-block capitalize text-sm text-zinc-400">
          {info2}
        </span>
      </div>
    </div>
  );
}
