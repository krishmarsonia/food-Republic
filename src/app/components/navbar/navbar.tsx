import { UserButton, auth, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const { userId } = auth();
  const user = await currentUser();
  //   console.log(userId);
  console.log(user?.emailAddresses[0].emailAddress);
  return (
    <nav className="w-full flex justify-between px-24 font-sans font-medium py-6 fixed z-10 bg-lightPink flex-col lg:flex-row">
      <Link href={"/"}>
        <div className="lg:mr-[350px] font-bold">Food Republic</div>
      </Link>
      <div>
        <ul className="flex gap-16">
          <li>
            <div className="lg:w-[130%] h-7 flex items-center justify-center hover:bg-primepink rounded-md hover:text-white duration-500 hover:cursor-pointer">
              <Link href={"/"}>
                <center>Home</center>
              </Link>
            </div>
          </li>
          <li>
            <div className="lg:w-[130%] h-7 flex items-center justify-center hover:bg-primepink rounded-md hover:text-white duration-500 hover:cursor-pointer">
              <Link href={"/recipes"}>
                <center>Recipes</center>
              </Link>
            </div>
          </li>
          {userId ? (
            <li>
              <div className="lg:w-[130%] h-7 flex items-center justify-center hover:bg-primepink rounded-md hover:text-white duration-500 hover:cursor-pointer">
                <Link href={"/userrecipes"}>
                  <center>Your Recipes</center>
                </Link>
              </div>
            </li>
          ) : null}
          {userId ? (
            <li>
              <div className="lg:w-[130%] h-7 flex items-center justify-center hover:bg-primepink rounded-md hover:text-white duration-500 hover:cursor-pointer">
                <Link href={"/addrecipe"}>
                  <center>Add Recipes</center>
                </Link>
              </div>
            </li>
          ) : null}

          <li>
            {userId ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <Link href={"/sign-in"}>
                <div className="lg:w-[130%] h-7 flex items-center justify-center hover:bg-primepink rounded-md hover:text-white duration-500 hover:cursor-pointer">
                  <center>Login</center>
                </div>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
