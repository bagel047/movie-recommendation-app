import { useEffect, useState } from "react";
import { doSignInWithEmailAndPassword } from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext";
import { Navigate, Link } from "react-router-dom";
import GoogleSignIn from "../../components/GoogleSignIn";

export default function Login() {
  const { userLoggedIn } = useAuth();

  useEffect(() => {
    console.log(userLoggedIn);
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setSigningIn] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("onsubmit with email nad password");
    if (!isSigningIn) {
      setSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (err) {
        setError("Incorrect username or password.");
        setSigningIn(false);
      }
      console.log(userLoggedIn);
    }
  };

  useEffect(() => {
    if (email === "" || password === "") {
      setError("");
    }
  }, [email, password]);

  return (
    <div className="w-fit mx-auto mt-4">
      {userLoggedIn ? (
        <Navigate to={"/home"} replace={true} />
      ) : (
        <>
          {error && (
            <div className="mb-2 bg-red-950 bg-opacity-30 mx-auto text-center p-2.5 rounded border-1 border-red-600 text-sm">
              {error}
            </div>
          )}
          <div className="border-1 border-zinc-950 bg-zinc-700 p-6 rounded">
            <form onSubmit={onSubmit}>
              <h3 className="font-bold text-lg">Login</h3>

              <div className="flex justify-between items-center mt-6 mb-2 pb-2">
                <label htmlFor="email" className="mr-2 text-sm">
                  Email:
                </label>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  id="email"
                  placeholder="name.surname@gmail.com"
                  value={email}
                  className="h-10 rounded min-w-[210px] px-2 bg-zinc-800 text-sm"
                ></input>
              </div>
              <div className="flex justify-between items-center pb-3">
                <label htmlFor="password" className="mr-2 text-sm">
                  Password:
                </label>
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  id="password"
                  type="password"
                  placeholder="&middot; &middot; &middot; &middot; &middot; &middot; &middot; &middot; &middot; &middot;"
                  value={password}
                  className="h-10 rounded min-w-[210px] px-2 bg-zinc-800 text-sm"
                ></input>
              </div>
              <div className="border-t border-zinc-800">
                <button className="mt-4 mb-2 text-white bg-[#050708] hover:bg-[#050708]/70 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 rounded-lg text-sm w-full py-2.5 px-4 text-center items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/70 me-2 mb-2 font-bold">
                  Login
                </button>
              </div>
            </form>
            <GoogleSignIn></GoogleSignIn>
            <div className="mt-3 text-xs text-center">
              <span className="">Don't have an account? </span>
              <Link to={"/register"}>Register</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
