"use client";
import {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategory,
} from "@/actions/actions";
import { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import TextAreaInput from "./TextAreaInput";
import Task from "./Task";
import { SyncLoader } from "react-spinners";
import { useTheme } from "next-themes";

export type CategoryType = {
  _id: string;
  BoardId: string;
  label: string;
};

export default function Category({ boardId }: { boardId: string | undefined }) {
  const [categories, setCategories] = useState<CategoryType[]>();
  const [isFormSubmiting, setIsFormSubmiting] = useState<boolean>();
  useEffect(() => {
    async function getCategories() {
      if (boardId) {
        const res = await getAllCategory(boardId);
        setCategories(res);
      }
    }
    getCategories();
  }, [isFormSubmiting, boardId]);

  async function handleCreateBoard(data: FormData) {
    if (isFormSubmiting) return;
    setIsFormSubmiting((prev) => !prev);
    const categoryLabel = data.get("input");
    if (!categoryLabel) {
      setIsFormSubmiting((prev) => !prev);
      return;
    }
    await createCategory(boardId!, categoryLabel as string);
    const allCategories: CategoryType[] | undefined = await getAllCategory(
      boardId!
    );
    setCategories(allCategories);
    setIsFormSubmiting((prev) => !prev);
  }
  async function handleEditCategory(categoryId: string, data: FormData) {
    if (isFormSubmiting) return;
    setIsFormSubmiting((prev) => !prev);
    const categoryLabel = data.get("input");
    if (!categoryLabel) {
      setIsFormSubmiting((prev) => !prev);
      return;
    }
    await editCategory(categoryId, categoryLabel as string);
    setIsFormSubmiting((prev) => !prev);
  }
  async function handleDeleteCategory(categoryId: string) {
    if (isFormSubmiting) return;
    setIsFormSubmiting((prev) => !prev);
    await deleteCategory(categoryId);
    const allCategories: CategoryType[] | undefined = await getAllCategory(
      boardId!
    );
    setCategories(allCategories);
    setIsFormSubmiting((prev) => !prev);
  }

  return isFormSubmiting ? (
    <div className="fixed top-1/2 left-1/2">
      <SyncLoader color={useTheme().theme === "dark" ? "White" : "Black"} />
    </div>
  ) : (
    <div className="flex gap-x-3 m-20 h-fit ">
      {categories?.map((category) => {
        return (
          <div
            key={category._id}
            className="bg-gray-100 dark:bg-gray-800 h-fit rounded-2xl"
          >
            <header className="flex justify-between p-3 rounded-br-2xl rounded-bl-2xl">
              <TextAreaInput
                hasButton={true}
                maxLength={101}
                submitFunction={handleEditCategory.bind(null, category._id)}
                buttonStyle="h-20 hover:bg-gray-200 rounded-xl hover:dark:bg-gray-700 pl-1 pt-1 h-fit w-64  break-words font-bold text-start "
                inputStyle="w-64 min-h-fit max-h-full pl-1 resize-none dark:bg-gray-900 overflow-hidden bg-gray-100"
              >
                {category.label}
              </TextAreaInput>
              <button
                onClick={() => handleDeleteCategory(category._id)}
                className={`${
                  category.label ? undefined : "hidden"
                } w-8 h-8 p-2 hover:bg-red-500 dark:hover:bg-red-500  rounded-full`}
              >
                <FaTrash size={15} className={` text-black dark:text-white `} />
              </button>
            </header>

            <main>
              <Task categoryId={category._id} />
            </main>
          </div>
        );
      })}

      <TextAreaInput
        dontCloseAfterSubmit
        hasButton={true}
        maxLength={1000}
        submitFunction={handleCreateBoard}
        buttonStyle="flex w-64 h-10 break-words dark:hover:bg-gray-700 hover:bg-gray-200 bg-gray-100 dark:bg-gray-800 rounded items-center text-center gap-x-1  pl-2"
        inputStyle="w-64 h-fit pl-1 resize-none dark:bg-gray-900 overflow-hidden"
      >
        <>
          <FaPlus size={12} className="light-icon text-black dark:text-white" />
          create category
        </>
      </TextAreaInput>
    </div>
  );
}
