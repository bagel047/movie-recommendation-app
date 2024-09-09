import profile_placeholder from "../assets/images/profile-placeholder.png";

export default function PersonCard(props) {
  const imageUrl = props.data.profile_path
    ? `https://image.tmdb.org/t/p/w500/${props.data.profile_path}`
    : `${profile_placeholder}`;

  return (
    <div className="min-w-44 h-[220px] flex flex-col items-center justify-content-start gap-y-4 inline-block mr-2.5">
      <div className="min-w-40 px-3">
        <img
          src={imageUrl}
          alt={`${props.data.name} Image`}
          className="object-cover w-full h-32 rounded-full"
        ></img>
      </div>
      <div className="min-w-40">
        <h3 className="text-sm font-semibold text-center">{props.data.name}</h3>
        <h4 className="text-xs text-center text-wrap">
          <span className="text-zinc-300">as </span>
          {props.data.character}
        </h4>
      </div>
    </div>
  );
}
