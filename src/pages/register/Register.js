import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
import { Navigate } from "react-router-dom";
import GoogleSignIn from "../../components/GoogleSignIn";

export default function Register() {
  const { userLoggedIn } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    console.log(userLoggedIn);
    console.log(isRegistering);
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("in onSubmit register");
    if (!isRegistering) {
      setIsRegistering(true);
      try {
        await doCreateUserWithEmailAndPassword(email, password);
        setIsRegistering(false);
      } catch (error) {
        setIsRegistering(false);
      }
      console.log(userLoggedIn);
    }
  };

  return (
    <div className="w-fit mx-auto mt-4">
      {userLoggedIn ? (
        <Navigate to={"/home"} replace={true} />
      ) : (
        <div className="border-1 border-zinc-950 bg-zinc-700 p-6 rounded">
          <form onSubmit={onSubmit}>
            <h3 className="text-lg font-semibold">Register</h3>

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
                Register
              </button>
            </div>
          </form>
          <GoogleSignIn></GoogleSignIn>
        </div>
      )}
    </div>
  );
}
