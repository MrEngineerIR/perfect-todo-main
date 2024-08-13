import Login from "@/components/Login";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import React from "react";

const AuthPage = ({ searchParams }: { searchParams: any }) => {
  const session = cookies().get("auth");
  if (session?.name || session?.value) {
    redirect("/account");
  }
  return <Login mode={searchParams.mode} />;
};

export default AuthPage;
