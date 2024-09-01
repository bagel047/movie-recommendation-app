import { UserCircleIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { doSignOut } from "../firebase/auth";

export default function ProfileIcon(props) {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);

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
          width={28}
          height={28}
          color="white"
          className="hover:text-zinc-600"
        />

        {show ? (
          <div
            id="dropdown"
            className="absolute z-10 shadow dark:bg-zinc-950 right-0 top-10 w-44 p-2 rounded-md text-sm text-right"
          >
            <ul className="divide-y divide-zinc-700 pl-0 mb-0">
              <li className="py-2.5">
                {props.userLoggedIn ? (
                  <NavLink
                    to="/login"
                    onClick={() => {
                      toggleShow();
                      doSignOut();
                    }}
                    className="rounded-md px-3 py-2 text-sm tracking-wider no-underline text-white font-medium bg-zinc-950 hover:bg-zinc-600 "
                  >
                    LOGOUT
                  </NavLink>
                ) : (
                  <NavLink
                    to="/login"
                    className="rounded-md px-3 py-2 text-sm tracking-wider no-underline text-white font-medium bg-zinc-950 hover:bg-zinc-600 "
                  >
                    LOGIN
                  </NavLink>
                )}
              </li>

              <li className="text-center text-xs">
                {/* <NavLink className="no-underline">
                  Change profile picture
                </NavLink> */}
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
}
