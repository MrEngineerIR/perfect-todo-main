"use client";
import { KeyboardEvent, useState } from "react";
import "@/assets/styles/globals.css";

const TextAreaInput = ({
  hasButton: hasButton,
  submitFunction,
  maxLength,
  children,
  buttonStyle,
  inputStyle,
  dontCloseAfterSubmit = false,
}: {
  hasButton: boolean;
  submitFunction: Function;
  maxLength: number;
  children?: JSX.Element | string;
  buttonStyle?: string;
  inputStyle?: string;
  dontCloseAfterSubmit?: boolean;
}) => {
  const [isButton, setIsButton] = useState<boolean>(hasButton);
  const defalutInputValue = typeof children === "string" ? children : undefined;

  async function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      const data = new FormData(
        event.currentTarget.parentElement! as HTMLFormElement
      );
      await submitFunction(data);
      if (!dontCloseAfterSubmit) {
        setIsButton((prev) => !prev);
        return;
      }
      const inputElement = event.target as HTMLInputElement;
      inputElement.value = "";
    }
  }

  return !isButton ? (
    <form id="form" className="flex gap-x-1">
      <textarea
        onKeyDown={handleKeyDown}
        onBlur={() => setIsButton((prev) => !prev)}
        className={
          inputStyle ??
          "rounded pl-1 bg-white dark:bg-gray-800 ml-2 h-10 w-fit overflow-hidden resize-none "
        }
        autoFocus
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

export default TextAreaInput;
