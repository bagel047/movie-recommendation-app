import { useContext, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import logo1 from "../assets/images/logo1.png";
import Search from "./Search";
import ProfileIcon from "./ProfileIcon";

const navigation = [
  { name: "HOME", href: "/home" },
  { name: "LIBRARY", href: "/library" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header(props) {
  const { userLoggedIn, currentUser } = useAuth();

  return (
    <>
      <Disclosure as="nav" className="bg-zinc-950 font-poppins">
        <div className="mx-auto max-w-screen-2xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-[4.5rem] items-center justify-end lg:justify-center">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-zinc-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
            <div className="flex items-center flex-1">
              {" "}
              {/* sm:items-stretch sm:justify-start */}
              {/* Logo Div */}
              {/* <div className="flex flex-shrink-0 items-center">
                <img src={logo1} className="w-[30px] h-[30px]"></img>
              </div> */}
              <div className="hidden ml-6 lg:ml-0 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) => {
                        return (
                          "rounded-md px-3 py-2 text-sm tracking-wider no-underline text-white font-medium " +
                          (isActive ? "bg-zinc-600" : "hover:bg-zinc-600")
                        );
                      }}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center flex-1">
              <Search />
              <ProfileIcon userLoggedIn={userLoggedIn} />
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                aria-current={item.current ? "page" : undefined}
                className={({ isActive }) => {
                  return (
                    "block rounded-md px-3 py-2 text-sm tracking-wider no-underline text-white font-medium " +
                    (isActive ? "bg-zinc-950" : "hover:bg-zinc-600")
                  );
                }}
              >
                {item.name}
              </NavLink>
            ))}

            {userLoggedIn ? (
              <NavLink
                to="/login"
                onClick={() => {
                  doSignOut();
                  // setLoggedIn(false);
                  // localStorage.clear();
                }}
                className={({ isActive }) => {
                  return (
                    "block rounded-md px-3 py-2 text-sm tracking-wider no-underline text-white font-medium " +
                    (isActive ? "bg-zinc-950" : "hover:bg-zinc-600")
                  );
                }}
              >
                LOGOUT
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) => {
                  return (
                    "block rounded-md px-3 py-2 text-sm tracking-wider no-underline text-white font-medium " +
                    (isActive ? "bg-zinc-950" : "hover:bg-zinc-600")
                  );
                }}
              >
                LOGIN
              </NavLink>
            )}
          </div>
        </DisclosurePanel>
      </Disclosure>
      <div className="bg-zinc-800 text-white">
        <div className="max-w-screen-2xl mx-auto min-h-screen px-3 py-2">
          {props.children}
        </div>
      </div>
    </>
  );
}
