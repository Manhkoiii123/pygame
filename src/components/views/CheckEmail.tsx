import Link from "next/link";
import React from "react";

const CheckEmail = () => {
  return (
    <>
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
    </>
  );
};

export default CheckEmail;
