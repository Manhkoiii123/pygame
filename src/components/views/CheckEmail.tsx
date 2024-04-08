import Link from "next/link";
import React from "react";

const CheckEmail = () => {
  return (
    <>
      <span className="font-semibold text-[40px] leading-[56px] flex items-center justify-center gap-2">
        <span className="text-primary">Check your email </span>
      </span>
      <div className="w-[70%] flex flex-col gap-8">
        <span>
          We have sent an email to limdim@gmail.com. Follow the instructions to
          reset your password. The email will expire in 30 minutes.{" "}
        </span>
        <Link href={"/login"} className="mr-auto">
          <span>
            Take me back to{" "}
            <span className="text-secondary text-lg font-normal text-left underline">
              Login
            </span>
          </span>
        </Link>
        <Link href={"/login"} className="mr-auto">
          <span>
            Did not receive our email?{" "}
            <span className="text-secondary text-lg font-normal text-left underline">
              Resend
            </span>
          </span>
        </Link>
      </div>
    </>
  );
};

export default CheckEmail;
