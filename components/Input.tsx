"use client";
import { FormEvent, KeyboardEvent, useState } from "react";
import "@/assets/styles/globals.css";

const Input = ({
  hasButton,
  submitFunction,
  maxLength,
  children,
  buttonStyle,
  inputStyle,
  dontCloseAfterSumbit = false,
}: {
  hasButton: boolean;
  submitFunction: Function;
  maxLength: number;
  children?: JSX.Element | string;
  buttonStyle?: string;
  inputStyle?: string;
  dontCloseAfterSumbit?: boolean;
}) => {
  const [isButton, setIsButton] = useState<boolean>(hasButton);
  const defalutInputValue = typeof children === "string" ? children : undefined;

  async function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      const data = new FormData(
        event.currentTarget.parentElement! as HTMLFormElement
      );
      await submitFunction(data);
      if (!dontCloseAfterSumbit) {
        setIsButton((prev) => !prev);
        return;
      }
      const inputElement = event.target as HTMLInputElement;
      inputElement.value = "";
    }
  }
  function handleInputHeight(event: FormEvent<HTMLInputElement>) {
    if (maxLength <= 100) {
      event.currentTarget.style.width = "auto";
      event.currentTarget.style.width = event.currentTarget.scrollWidth + "px";
    }
  }
  return !isButton ? (
    <form id="form" className="flex gap-x-1">
      <input
        onInput={handleInputHeight}
        onKeyDown={handleKeyDown}
        onBlur={() => setIsButton((prev) => !prev)}
        className={
          inputStyle ??
          "rounded pl-1 bg-white dark:bg-gray-800 ml-2 h-fit w-min"
        }
        autoFocus
        type="text"
        name="input"
        maxLength={maxLength}
        defaultValue={defalutInputValue}
        onFocus={(e) => e.currentTarget.select()}
      />
    </form>
  ) : (
    <button
      onClick={() => setIsButton((prev) => !prev)}
      className={buttonStyle}
    >
      {children}
    </button>
  );
};

export default Input;
