import { cookies } from "next/headers";
import { hashUserInput } from "./hash";
import Session from "@/models/Session";
import connectDB from "@/config/database";
export async function SetUserSession(userId: string) {
  const session = cookies().get("auth");
  if (session?.name) {
    return false;
  }

  try {
    const hashedId = hashUserInput(userId.toString());
    const token = hashUserInput(hashedId);
    const oneHour = new Date();
    oneHour.setHours(oneHour.getHours() + 1);
    const userSession = new Session({
      userId: userId.toString(),
      token: token,
    });
    await userSession.save();

    cookies().set("auth", `${token}`, {
      httpOnly: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
    });
    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
export async function validateSession(cookieValue: string, userId: string) {
  await connectDB();
  const session = await Session.findOne({ token: cookieValue });
  if (session.userId === JSON.parse(JSON.stringify(userId))) {
    return true;
  }
  return false;
}
