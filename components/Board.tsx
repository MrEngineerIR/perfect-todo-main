"use client";
import { useContext, useLayoutEffect, useState } from "react";
import { Board_Context } from "@/store/user-context";
import { FaTrash } from "react-icons/fa";
import React from "react";
import { deleteBoard, editBoard, getBoard } from "@/actions/actions";
import DialogModal from "./DialogModal";
import { useRef } from "react";
import { RefType } from "./DialogModal";
import Input from "./Input";
import { useRouter } from "next/navigation";
import Category from "./Category";
import { revalidatePath } from "next/cache";
import { SyncLoader } from "react-spinners";
import { useTheme } from "next-themes";

export type BoardType = {
  _id: string;
  userId: string;
  label: string;
};

const BoardComponent = () => {
  const BoardContext = useContext(Board_Context);
  const boardDeleteDialogRef = useRef<RefType>(null);
  const [currentBoard, setCurrentBoard] = useState<BoardType | undefined>();
  const [isFormSubmiting, setIsFormSubmiting] = useState<boolean>(false);
  const rout = useRouter();
  useLayoutEffect(() => {
    async function getData() {
      const res = await getBoard(BoardContext.boardId);
      setCurrentBoard(res as BoardType);
    }
    getData();
  }, [BoardContext.boardId]);
  async function handleBoardDelete() {
    if (isFormSubmiting) return;
    setIsFormSubmiting((prev) => !prev);
    await deleteBoard(currentBoard!._id);
    BoardContext.addBoardId("");
    boardDeleteDialogRef.current?.closeModel();
    rout.refresh();
    console.log("is");
    setIsFormSubmiting((prev) => !prev);
  }

  async function handleEditeBoard(data: FormData) {
    if (isFormSubmiting) return;
    setIsFormSubmiting((prev) => !prev);
    const boardLabel = data.get("input") as string;
    if (!boardLabel) {
      return;
    }
    const res = await editBoard(currentBoard!._id, boardLabel);
    rout.refresh();
    setCurrentBoard(res);
    setIsFormSubmiting((prev) => !prev);
  }

  return (
    <div>
      <header className="fixed top-20 left-64 flex-row-reverse w-full ml-auto gap-x-4 h-20">
        <nav className="h-full font-bold w-full pl-2 text-3xl dark:bg-gray-800 bg-gray-100 pt-4 justify-start">
          {isFormSubmiting ? (
            <SyncLoader
              color={useTheme().theme === "dark" ? "White" : "Black"}
            />
          ) : currentBoard?._id ? (
            <Input
              hasButton={true}
              maxLength={73}
              submitFunction={handleEditeBoard}
              buttonStyle="font-bold text-3xl hover:bg-gray-300 rounded-xl px-2 dark:hover:bg-gray-700 w-max text-start  text-black dark:text-white cursor-pointer  items-center"
              inputStyle="dark:bg-gray-800 pl-1 bg-gray-100 ml-2 h-9 w-min"
            >
              {currentBoard?.label}
            </Input>
          ) : (
            "First create or select a board"
          )}

          <button
            className={`${
              currentBoard?.label ? undefined : "hidden"
            } block p-2 ml-1 mt-1 hover:bg-red-500 dark:hover:bg-red-500 bg-gray-100 dark:bg-gray-800 rounded-full`}
            onClick={() => {
              boardDeleteDialogRef.current?.showModel();
            }}
          >
            <FaTrash size={15} className="text-black dark:text-white" />
          </button>
        </nav>
        <DialogModal
          DialogYesAction={handleBoardDelete}
          board={currentBoard}
          ref={boardDeleteDialogRef}
        />
      </header>
      <main className="flex mt-40 ml-80 gap-x-10 flex-row ">
        {currentBoard?._id && <Category boardId={currentBoard?._id} />}
      </main>
    </div>
  );
};

export default BoardComponent;
