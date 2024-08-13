"use client";
import React, { useState } from "react";

type UserId = {
  boardId: string;
  addBoardId: Function;
};
export const Board_Context = React.createContext<UserId>({
  boardId: "",
  addBoardId: function name(params: string) {},
});

export const ContextProvider = ({ children }: { children: JSX.Element }) => {
  const [boardId, setBoardId] = useState<string>("");

  function addBoardId(id: string) {
    setBoardId(id);
  }
  const ctxValue: UserId = {
    boardId: boardId,
    addBoardId: addBoardId,
  };
  return (
    <Board_Context.Provider value={ctxValue}>{children}</Board_Context.Provider>
  );
};
