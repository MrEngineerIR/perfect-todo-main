import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { validateSession } from "@/utilites/auth";
import SideBar from "@/components/SideBar";
import Board from "@/models/Board";
import BoardComponent from "@/components/Board";
import Session from "@/models/Session";
const AccountPage = async () => {
  const session = cookies().get("auth");
  if (!session?.value || !session.name) {
    redirect("/?mode=signin");
  }
  const user = await Session.findOne({ token: session.value });
  const isValid = await validateSession(session.value, user.userId);
  if (!isValid) {
    redirect("/?mode=signin");
  }
  if (!user.userId) {
    redirect("/?mode=signin?res=useridisempty");
  }
  const boards = await Board.find({ userId: user.userId });
  const formatedBoard = [];
  for (const board of boards) {
    const newboard = {
      _id: JSON.parse(JSON.stringify(board._id)),
      userId: board.userId,
      label: board.label,
    };
    formatedBoard.push(newboard);
  }
  return (
    <div className="flex">
      <SideBar boards={formatedBoard} userId={user.userId} />
      <BoardComponent />
    </div>
  );
};

export default AccountPage;
