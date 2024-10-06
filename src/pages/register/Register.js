import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
import { Navigate } from "react-router-dom";
import GoogleSignIn from "../../components/GoogleSignIn";

export default function Register() {
  const { userLoggedIn } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState([]);

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
      } catch (err) {
        console.log(err.message);
        if (err.message.includes("missing-password"))
          addError("Please enter a password.");
        if (err.message.includes("weak-password"))
          addError("Password must contain at least 6 characters.");
        if (err.message.includes("invalid-email"))
          addError("Please enter a valid email address.");
        if (err.message.includes("email-already-in-use"))
          addError("Email is already registered.");
        setIsRegistering(false);
      }
      console.log(userLoggedIn);
    }
  };

  useEffect(() => {
    let errors = [];

    if (email.length > 0 && !email.includes("@")) {
      errors.push("Please enter a valid email address.");
    }
    if (password.length > 0 && password.length < 6) {
      errors.push("Password must contain at least 6 characters.");
    }

    if (errors.length > 0) {
      setError(errors);
    } else {
      setError([]);
    }
  }, [email, password]);

  const addError = (newError) => {
    setError((prevErrors) => {
      if (!prevErrors.includes(newError)) {
        return [...error, newError];
      }
      return prevErrors;
    });
  };

  return (
    <div className="sm:w-full lg:w-fit mx-auto mt-4">
      {userLoggedIn ? (
        <Navigate to={"/home"} replace={true} />
      ) : (
        <>
          {error.length > 0 &&
            error.map((err, idx) => {
              return (
                <div
                  key={idx}
                  className="mb-2 bg-red-950 bg-opacity-30 mx-auto text-center p-2.5 rounded border-1 border-red-600 text-sm"
                >
                  {err}
                  {err === "Email is already registered." ? (
                    <a href="/login" className="pl-2">
                      Login
                    </a>
                  ) : null}
                </div>
              );
            })}
          <div className="border-1 border-zinc-950 bg-zinc-700 p-6 rounded">
            <form onSubmit={onSubmit}>
              <h3 className="text-lg font-semibold">Register</h3>

              <div className="flex flex-col lg:flex-row justify-between items-start gap-2 lg:items-center mt-6 mb-2 pb-2">
                <label
                  htmlFor="email"
                  className="mr-2 text-sm block lg:inline-block"
                >
                  Email:
                </label>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  id="email"
                  placeholder="name.surname@gmail.com"
                  value={email}
                  className="h-10 rounded min-w-full lg:min-w-[210px] px-2 bg-zinc-800 text-sm block lg:inline-block"
                ></input>
              </div>
              <div className="flex flex-col lg:flex-row justify-between items-start gap-2 lg:items-center mt-6 mb-2 pb-3">
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
                  className="h-10 rounded min-w-full lg:min-w-[210px] px-2 bg-zinc-800 text-sm"
                ></input>
              </div>
              <div className="border-t border-zinc-800">
                <button className="mt-4 mb-2 text-white bg-[#050708] hover:bg-[#050708]/70 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 rounded-lg text-xs w-full py-2.5 px-4 text-center items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/70 me-2 mb-2 font-semibold">
                  Register
                </button>
              </div>
            </form>
            <GoogleSignIn></GoogleSignIn>
          </div>
        </>
      )}
    </div>
  );
}
