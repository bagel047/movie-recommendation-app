import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, Link } from "react-router-dom";
import Search from "./Search";
import ProfileIcon from "./ProfileIcon";
import popcorn_img from "../assets/images/popcorn.png";

const navigation = [
  { name: "Home", href: "/home" },
  { name: "Library", href: "/library" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header(props) {
  const { userLoggedIn, currentUser } = useAuth();

  return (
    <>
      <Disclosure
        as="nav"
        className="bg-zinc-950 bg-opacity-95 fixed w-full z-50"
      >
        <div className="mx-auto max-w-screen-2xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-[4.5rem] items-center justify-between">
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
            <div className="flex items-center gap-12">
              <Link to="/" className="hidden lg:block">
                <div className="flex flex-shrink-0 items-end text-5xl inline-flex">
                  <span>
                    <img src={popcorn_img} className="inline-block h-10" />
                  </span>
                  <span className="tracking-widest text-sm text-white">
                    CineRec
                  </span>
                </div>
              </Link>
              <div className="hidden ml-6 lg:ml-0 sm:block">
                <div className="flex gap-1 items-center">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) => {
                        return (
                          "rounded-xl px-3 py-1.5 text-xs tracking-wider no-underline text-white " +
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

            <div className="flex items-center sm:w-2/12 lg:w-4/12 gap-3">
              <div className="sm:w-full lg:w-full">
                <Search />
              </div>
              <div className="">
                <ProfileIcon />
              </div>
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
                    "block rounded-xl px-3 py-1.5 text-xs tracking-wider no-underline text-white " +
                    (isActive ? "bg-zinc-600" : "hover:bg-zinc-600")
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
                    "block rounded-xl px-3 py-1.5 text-xs tracking-wider no-underline text-white " +
                    (isActive ? "bg-zinc-950" : "hover:bg-zinc-600")
                  );
                }}
              >
                Logout
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) => {
                  return (
                    "block rounded-xl px-3 py-1.5 text-xs tracking-wider no-underline text-white " +
                    (isActive ? "bg-zinc-950" : "hover:bg-zinc-600")
                  );
                }}
              >
                Login
              </NavLink>
            )}
          </div>
        </DisclosurePanel>
      </Disclosure>
      <div className="bg-zinc-800 text-white">
        <div className="max-w-screen-2xl mx-auto min-h-screen px-3 pt-[5rem] pb-2">
          {props.children}
        </div>
      </div>
    </>
  );
}
