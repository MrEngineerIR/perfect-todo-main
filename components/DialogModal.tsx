"use client";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useRef } from "react";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { BoardType } from "./Board";
import { addNewlines } from "@/utilites/formatText";
export interface RefType {
  showModel: () => void;
  closeModel: () => void;
}
interface PropType {
  board: BoardType | undefined;
  DialogYesAction: () => void;
}
const DialogModal = forwardRef<RefType, PropType>((currentBoard, ref) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  useImperativeHandle(ref, () => ({
    showModel: () => {
      openDialog();
    },
    closeModel: () => {
      closeDialog();
    },
  }));

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
      setIsModelOpen((prev) => !prev);
    }
  };

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
      setIsModelOpen((prev) => !prev);
    }
  };

  return (
    <dialog
      open={false}
      id="dialog"
      className={`${
        isModelOpen ? undefined : "hidden"
      } w-1/3 h-1/3 min-[320px]:w-96 min-[320px]:h-60 dark:bg-gray-800 rounded-lg flex break-words justify-between flex-col  backdrop:backdrop-blur-xl backdrop:backdrop-opacity-75 overflow-x-hidden`}
      ref={dialogRef}
    >
      <h1 className="font-bold flex m-3 ">
        <div className="bg-red-100 p-2 dark:bg-gray-900 inline-block rounded-full">
          <BsExclamationTriangleFill className="text-red-500 text-2xl " />
        </div>
        <div className="mt-2 ml-2">
          You are permanently delete "
          <span className="text-red-800 font-bold dark:text-red-500  ">
            {addNewlines(currentBoard?.board?.label, 40)}
          </span>
          "Board?
        </div>
      </h1>
      <div className="px-10 break-words">
        you lose all of "{currentBoard?.board?.label}" data and you cant retrive
        them,just if you are pretty sure delete your board
      </div>
      <div className="flex items-center justify-end h-1/4 w-full bg-gray-100 dark:bg-gray-700 pr-4 space-x-3">
        <button
          onClick={() => {
            closeDialog();
          }}
          className=" w-1/6 rounded h-1/2 hover:bg-gray-200 dark:hover:bg-black border-2 flex justify-center items-center"
        >
          {" "}
          Cancel
        </button>
        <button
          onClick={currentBoard.DialogYesAction}
          className="flex h-1/2 hover:bg-red-600 w-1/6 bg-red-500 rounded justify-center items-center "
        >
          {" "}
          Yes
        </button>
      </div>
    </dialog>
  );
});
export default DialogModal;
