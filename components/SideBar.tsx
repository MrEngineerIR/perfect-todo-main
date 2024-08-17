"use client";
import { useContext, useEffect, useState } from "react";
import { Board_Context } from "@/store/user-context";
import { createBoard, getBoards } from "@/actions/actions";
import { useRouter } from "next/navigation";
import TextAreaInput from "./TextAreaInput";
import { SyncLoader } from "react-spinners";
import { BoardType } from "./Board";

const SideBar: React.FC<{ boards: any; userId: string }> = ({
  boards,
  userId,
}) => {
  const rout = useRouter();
  const boardContext = useContext(Board_Context);
  const [isFormSubmiting, setIsFormSubmiting] = useState<boolean>(false);
  const [currentBoards, setCurrentBoards] = useState<BoardType[]>(boards);
  useEffect(() => {
    setIsFormSubmiting((prev) => !prev);
    setCurrentBoards(boards);
    setIsFormSubmiting((prev) => !prev);
  }, [boards]);
  async function handleCreateBoard(data: FormData) {
    if (isFormSubmiting) return;
    setIsFormSubmiting((prev) => !prev);
    const boardLabel = data.get("input") as string;
    if (!boardLabel) {
      return;
    }
    await createBoard(boardLabel, userId);
    rout.refresh();
    const boards: BoardType[] | undefined = await getBoards(userId);
    setCurrentBoards(boards as BoardType[]);
    setIsFormSubmiting((prev) => !prev);
  }
  function handleOnBoardClick(id: string) {
    boardContext.addBoardId(id);
  }
  return (
    <div className="flex">
      <div className="w-64 h-screen fixed dark:bg-gray-800 text-black dark:text-white bg-gray-100 overflow-y-auto ">
        <div className="flex-col mt-24 ml-4 items-center justify-center gap-y-3">
          <h1 className="font-bold flex mt-2 mb-8 ">Your Boards </h1>
          {isFormSubmiting ? (
            <SyncLoader />
          ) : (
            <TextAreaInput
              hasButton={true}
              maxLength={73}
              submitFunction={handleCreateBoard}
              buttonStyle="font-semibold dark:bg-gray-800 rounded"
            >
              Add Board
            </TextAreaInput>
          )}
        </div>
        <ul className="mb-8 p-4">
          {currentBoards.map((board: BoardType) => {
            return (
              <button
                className={`${
                  board._id === boardContext.boardId ? `border-2` : undefined
                } block gb-gray-100 dark:bg-gray-900 dark:border-white break-words rounded mb-2 p-1 w-full text-left pl-2 bg-gray-200 border-black`}
                onClick={() => handleOnBoardClick(board._id)}
                key={board._id}
              >
                {board.label}
              </button>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
