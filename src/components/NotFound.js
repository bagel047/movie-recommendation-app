import error_img from "../assets/images/error404transparent.png";

export default function NotFound() {
  return (
    <>
      <img src={error_img} className="mt-24 mx-auto"></img>
      <div className="mt-10 w-fit mx-auto">Page not found.</div>
    </>
  );
}
