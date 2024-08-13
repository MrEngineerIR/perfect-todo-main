"use server";
import connectDB from "@/config/database";
import Board from "@/models/Board";
import Session from "@/models/Session";
import User from "@/models/User";
import { SetUserSession, validateSession } from "@/utilites/auth";
import { hashUserInput, verifyPassword } from "@/utilites/hash";
import { cookies } from "next/headers";
import { permanentRedirect, redirect } from "next/navigation";
import Category from "@/models/Category";
import Task from "@/models/Task";
import { ObjectId } from "mongodb";
import { ok } from "assert";

type reslut = {
  ok: boolean;
  message: string;
};
export async function signIn(formData: FormData) {
  const session = cookies().get("auth");
  const email = formData.get("email");
  const pass = formData.get("password");
  const res: reslut = { ok: false, message: "" };

  await connectDB();
  const user = await User.findOne({ email: email });

  if (session && user) {
    const isValid = await validateSession(
      session.value,
      JSON.parse(JSON.stringify(user._id))
    );

    if (!isValid) {
      res.ok = false;
      res.message = "pls first log out from your previous account";
      return res;
    }
  }
  if (!user) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    res.ok = false;
    res.message = "email or password is wrong or we dont have a such user";
    return res;
  }

  const hashSuppliedPass = hashUserInput(pass!.toString().trim());
  const isValidPass = verifyPassword(user.password, hashSuppliedPass);
  if (!isValidPass) {
    res.ok = false;
    res.message = "Email or password is wrong";
    return res;
  }
  if (session) {
    permanentRedirect(`/account?user=${user._id}`);
  }

  const successful = await SetUserSession(user._id);
  if (!successful) {
    res.ok = false;
    res.message = "access denied";
    return res;
  }
  if (successful) {
    redirect(`/account?user=${user._id}`);
  }
}

export async function signUp(FormData: FormData) {
  const email = FormData.get("email");
  const pass = FormData.get("password");
  const res: reslut = { ok: false, message: "" };
  await connectDB();
  if (!email || !email.toString().includes("@")) {
    res.ok = false;
    res.message = "Please enter a valid email";
    return res;
  }
  if (!pass) {
    res.ok = false;
    res.message = "Please enter a vaild password";
    return res;
  }
  const userExist = await User.find({ email: email.toString() });

  if (userExist.length > 0) {
    res.ok = false;
    res.message = "we already have an account whit this email";
    return res;
  }
  const hashedPassword = hashUserInput(pass!.toString().trim());
  const newUser = new User({
    email: email,
    password: hashedPassword,
  });
  try {
    const savedUser = await newUser.save();
    const sessionRes = await SetUserSession(savedUser._id);
    if (sessionRes) {
      redirect("/account");
    } else {
      res.ok = false;
      res.message = "if you are in different account pls first sign out";
    }
  } catch (error) {
    throw error;
  }
}

export async function logOut() {
  await connectDB();
  const session = cookies().get("auth");
  if (!session) {
    return false;
  }
  try {
    await Session.findOneAndDelete({ token: session.value });
    cookies().delete("auth");
    redirect("/?mode=signin");
  } catch (error) {
    throw error;
  }
}

export async function createBoard(label: string, userId: string) {
  const newBoard = await new Board({
    label: label,
    userId: userId,
  });
  try {
    await newBoard.save();
    return true;
  } catch (error) {
    throw error;
  }
}
export async function getBoard(id: string) {
  if (ObjectId.isValid(id)) {
    const board = await Board.findById(id);
    const newboard = {
      _id: JSON.parse(JSON.stringify(board._id)),
      userId: board.userId,
      label: board.label,
    };
    return newboard;
  }
}
export async function deleteBoard(id: string) {
  const board = await Board.findByIdAndDelete(id);
  const Allcategories = await Category.find({ BoardId: id });
  for (const category of Allcategories) {
    await Task.deleteMany({ categoryId: category._id });
  }
  try {
    await Category.deleteMany({ BoardId: id });
  } catch (error) {}
}
export async function editBoard(id: string, label: string) {
  if (ObjectId.isValid(id)) {
    try {
      const res = await Board.findOneAndUpdate(
        { _id: id },
        { label: label },
        { new: true }
      );
      const newboard = {
        _id: JSON.parse(JSON.stringify(res._id)),
        userId: res.userId,
        label: res.label,
      };
      return newboard;
    } catch (err) {
      throw err;
    }
  }
}
export async function getAllCategory(boardId: string) {
  if (ObjectId.isValid(boardId)) {
    try {
      const categories = await Category.find({ BoardId: boardId });

      const formatedCategories = [];
      for (const category of categories) {
        const newCategory = {
          _id: JSON.parse(JSON.stringify(category._id)),
          BoardId: category.BoardId,
          label: category.label,
        };
        formatedCategories.push(newCategory);
      }
      return formatedCategories;
    } catch (error) {
      throw error;
    }
  }
}
export async function createCategory(boardId: string, label: string) {
  if (ObjectId.isValid(boardId)) {
    try {
      const newCategory = await new Category({
        BoardId: boardId,
        label: label,
      });
      await newCategory.save();
    } catch (error) {
      throw error;
    }
  }
}
export async function editCategory(categoryId: string, label: string) {
  if (ObjectId.isValid(categoryId)) {
    try {
      await Category.findOneAndUpdate({ _id: categoryId }, { label: label });
    } catch (error) {
      throw error;
    }
  }
}
export async function deleteCategory(categoryId: string) {
  if (ObjectId.isValid(categoryId)) {
    try {
      await Category.findOneAndDelete({ _id: categoryId });
    } catch (error) {
      throw error;
    }
  }
}
export async function getAllTasks(categoryId: string) {
  if (ObjectId.isValid(categoryId)) {
    try {
      const res = await Task.find({ categoryId: categoryId });
      const formatedTasks = [];
      for (const task of res) {
        const newTask = {
          _id: JSON.parse(JSON.stringify(task._id)),
          categoryId: task.categoryId,
          text: task.text,
        };
        formatedTasks.push(newTask);
      }
      return formatedTasks;
    } catch (error) {}
  }
}
export async function createTask(text: string, categoryId: string) {
  if (ObjectId.isValid(categoryId)) {
    try {
      const newTask = await new Task({
        text: text,
        categoryId: categoryId,
      });
      await newTask.save();
    } catch (error) {
      throw error;
    }
  }
}
export async function deleteTask(taskId: string) {
  if (ObjectId.isValid(taskId)) {
    try {
      await Task.findByIdAndDelete(taskId);
    } catch (error) {
      throw error;
    }
  }
}
export async function editTask(taskId: string, taskText: string) {
  if (ObjectId.isValid(taskId)) {
    try {
      await Task.findByIdAndUpdate(taskId, { text: taskText });
    } catch (error) {
      throw error;
    }
  }
}
// export async function auth(mode: string, prevstate: any, FormData: FormData) {
//   if (mode === "signup") {
//     return signUp(prevstate, FormData);
//   }
//   return signIn(prevstate, FormData);
// }
