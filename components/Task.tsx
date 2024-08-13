import { useLayoutEffect, useState } from "react";
import TextAreaInput from "./TextAreaInput";
import {
  createTask,
  deleteTask,
  editTask,
  getAllTasks,
} from "@/actions/actions";
import { FaPlus, FaTrash } from "react-icons/fa";

const Task = ({ categoryId }: { categoryId: string }) => {
  type task = {
    _id: string;
    categoryId: string;
    text: string;
  };
  const [tasks, setTasks] = useState<task[]>();
  const [isFormSubmiting, setIsFormSubmiting] = useState<boolean>();
  useLayoutEffect(() => {
    async function getTasks() {
      const res = await getAllTasks(categoryId);
      setTasks(res);
    }
    getTasks();
  }, [categoryId, isFormSubmiting]);
  async function handleAddTask(data: FormData) {
    if (isFormSubmiting) return;
    setIsFormSubmiting((prev) => !prev);
    const taksText = data.get("input");
    if (!taksText) {
      setIsFormSubmiting((prev) => !prev);
      return;
    }
    await createTask(taksText as string, categoryId);
    setIsFormSubmiting((prev) => !prev);
  }
  async function handleDeleteTask(taskId: string) {
    if (isFormSubmiting) return;
    setIsFormSubmiting((prev) => !prev);
    await deleteTask(taskId);
    setIsFormSubmiting((prev) => !prev);
  }
  async function handleEditTask(taskId: string, data: FormData) {
    if (isFormSubmiting) return;
    setIsFormSubmiting((prev) => !prev);
    const taskText = data.get("input");
    if (!taskText) {
      setIsFormSubmiting((prev) => !prev);
      return;
    }

    await editTask(taskId, taskText as string);
    setIsFormSubmiting((prev) => !prev);
  }
  return (
    <div className=" gap-x-3 w-full p-5 ">
      {tasks?.map((task) => {
        return (
          <section
            key={task._id}
            className="flex h-full  rounded-2xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-900 hover:dark:bg-gray-700 mb-2"
          >
            <TextAreaInput
              hasButton={true}
              maxLength={101}
              submitFunction={handleEditTask.bind(null, task._id)}
              buttonStyle="rounded w-64 h-fit  break-words font-sm p-2 "
              inputStyle="w-64 pl-1 h-fit resize-none dark:bg-gray-900 overflow-hidden"
            >
              {task.text}
            </TextAreaInput>
            <button
              onClick={() => handleDeleteTask(task._id)}
              className={`${
                task.text ? undefined : "hidden"
              } flex h-fit p-3 hover:bg-red-500  dark:hover:bg-red-500  rounded-2xl`}
            >
              <FaTrash size={15} className={` text-black dark:text-white `} />
            </button>
          </section>
        );
      })}

      <TextAreaInput
        dontCloseAfterSubmit
        hasButton={true}
        maxLength={1000}
        submitFunction={handleAddTask}
        buttonStyle="flex w-60 hover:bg-gray-300 h-8 ml-4 dark:hover:bg-gray-700 hover:bg-gray-200 bg-gray-200 dark:bg-gray-900 rounded-2xl items-center  gap-x-1  pl-2"
        inputStyle=" resize-none pl-1  overflow-hidden w-full bg-gray-100 dark:bg-gray-800 h-20"
      >
        <>
          <FaPlus
            size={12}
            className="light-icon text-black dark:text-white  "
          />
          Add Task
        </>
      </TextAreaInput>
    </div>
  );
};

export default Task;
