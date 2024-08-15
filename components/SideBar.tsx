"use client";
import { useContext, useState } from "react";
import { Board_Context } from "@/store/user-context";
import { createBoard } from "@/actions/actions";
import { useRouter } from "next/navigation";
import TextAreaInput from "./TextAreaInput";
const SideBar: React.FC<{ boards: any; userId: string }> = ({
  boards,
  userId,
}) => {
  const boardContext = useContext(Board_Context);
  const [isFormSubmiting, setIsFormSubmiting] = useState<boolean>(false);
  const rout = useRouter();

  async function handleCreateBoard(data: FormData) {
    if (isFormSubmiting) return;
    setIsFormSubmiting((prev) => !prev);
    const boardLabel = data.get("input") as string;
    if (!boardLabel) {
      return;
    }
    await createBoard(boardLabel, userId);
    setIsFormSubmiting((prev) => !prev);
    rout.refresh();
  }
  function handleOnBoardClick(id: string) {
    boardContext.addBoardId(id);
  }
  return (
    <div className="flex">
      <aside className=" fixed p-4 top-20 left-0 h-screen w-64 dark:bg-gray-800 bg-white border-solid border-r-2 dark:border-gray-600">
        <header className="grid justify-center gap-y-3">
          <h1 className="font-bold flex mt-2 ">Your Boards </h1>
          <TextAreaInput
            hasButton={true}
            maxLength={73}
            submitFunction={handleCreateBoard}
            buttonStyle="font-semibold dark:bg-gray-800 rounded"
          >
            Add Board
          </TextAreaInput>
        </header>
        <main>
          <ul className="mx-2 mt-4 ">
            {boards.map((board: any) => {
              return (
                <button
                  className={`${
                    board._id === boardContext.boardId ? `border-2` : undefined
                  } block gb-gray-100 dark:bg-gray-900 dark:border-white break-words rounded mb-2 p-1 w-full text-left pl-2 bg-gray-100 border-black`}
                  onClick={() => handleOnBoardClick(board._id)}
                  key={board._id}
                >
                  {board.label}
                </button>
              );
            })}
          </ul>
        </main>
      </aside>
    </div>
  );
};

export default SideBar;
