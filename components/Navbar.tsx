"use client";
import Image from "next/image";
import logo from "@/public/todo-icon-2048x2048-pij2pwiy.png";
import DarkModeToggle from "./DarkModeToggle";
import { logOut } from "@/actions/actions";
import { Suspense } from "react";
import Link from "next/link";

const Navbar = () => {
  async function handleLogout() {
    await logOut();
  }
  return (
    <nav className=" fixed top-0 left-0 w-full z-50 bg-white border-b border-blue-500 dark:bg-black">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              type="button"
              id="mobile-dropdown-button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="inline-flex flex-1 items-center justify-center md:items-stretch md:justify-start ">
            {/* <!-- Logo --> */}
            <Link className="flex flex-shrink-0 items-center" href="/">
              <Image className="h-10 w-auto" src={logo} alt="PropertyPulse" />

              <span className="hidden md:block text-black text-2xl font-bold ml-2 dark:text-white ">
                Semi Perfect Todo
              </span>
            </Link>
            {/* <!-- Desktop Menu Hidden below md screens --> */}
            <DarkModeToggle></DarkModeToggle>
          </div>

          {/* <!-- Right Side Menu (Logged Out) --> */}
          <div className="hidden md:block md:ml-6">
            <div className="flex items-center">
              <Suspense fallback={<p>Processing...</p>}>
                <button
                  type="submit"
                  onClick={handleLogout}
                  className="flex items-center text-blck bg-gray-100 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 dark:bg-black dark:text-white dark:border-2"
                >
                  <span>Logout</span>
                </button>
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      <div className="hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <a
            href="/"
            className="bg-gray-100 dark:bg-gray-900 dark:text-white text-black block rounded-md px-3 py-2 text-base font-medium"
          >
            Auth page
          </a>

          <button
            onClick={handleLogout}
            className="flex items-center text-black bg-gray-100 dark:bg-gray-900 dark:text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-4"
          >
            <i className="fa-brands fa-google mr-2"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
