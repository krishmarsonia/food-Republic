import React from "react";
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center pt-28">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
