import LoginForm from "@/components/authComponents/LoginForm";
import React from "react";

const Auth = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-mainBackground px-4">
      <div className="w-full max-w-lg bg-secondBackground p-8 rounded-2xl shadow-lg">
        <LoginForm />
      </div>
    </div>
  );
};

export default Auth;
