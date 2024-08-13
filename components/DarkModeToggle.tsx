"use client";
import React from "react";
import { useTheme } from "next-themes";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const themeState = theme;
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className=" pl-5 text-gray-500 dark:text-gray-300 border-solid border-5 rounded "
    >
      {themeState === "dark" ? (
        <FaSun className="text-black dark:text-white my-4 " />
      ) : (
        <FaMoon className="text-black dark:text-white my-4" />
      )}
    </button>
  );
}
