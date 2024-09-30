import { UserCircleIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { doSignOut } from "../firebase/auth";
import { useAuth } from "../contexts/authContext";

export default function ProfileIcon() {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);
  const { currentUser, userLoggedIn } = useAuth();

  useEffect(() => {
    console.log("current user: ", currentUser);
    console.log("user logged in: ", userLoggedIn);
  });

  const toggleShow = () => {
    setShow(!show);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <UserCircleIcon
          onClick={toggleShow}
          width={26}
          height={26}
          color="white"
          className="hover:text-zinc-600"
        />

        {show ? (
          <div
            id="dropdown"
            className="absolute z-10 shadow dark:bg-zinc-950 dark:bg-opacity-90 right-0 top-9 w-56 py-2 px-1 rounded-md text-xs"
          >
            <ul className="pl-0 mb-0">
              {currentUser ? (
                <div className="">
                  <li className="py-2.5">
                    <div className="px-3 tracking-wider text-white bg-zinc-950">
                      {currentUser.email}
                    </div>
                  </li>
                </div>
              ) : null}
              <li className="py-2.5 border-t border-zinc-700">
                {userLoggedIn ? (
                  <NavLink
                    to="/login"
                    onClick={() => {
                      toggleShow();
                      doSignOut();
                    }}
                    className="rounded-xl px-3 py-1.5 text-xs tracking-wider no-underline text-white font-medium bg-zinc-950 hover:bg-zinc-600 "
                  >
                    Logout
                  </NavLink>
                ) : (
                  <NavLink
                    to="/login"
                    className="rounded-xl px-3 py-1.5 text-xs tracking-wider no-underline text-white font-medium bg-zinc-950 hover:bg-zinc-600 "
                  >
                    Login
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
}
