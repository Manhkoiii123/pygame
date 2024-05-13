"use client";
import { Button } from "antd";
import "./globals.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center ">
      <div className=" sm:w-[700px] w-[300px] flex items-center justify-center flex-col">
        <Image src={"/loi.png"} alt="loi" width={400} height={400} />
        <div className="flex items-center justify-center flex-col gap-4">
          <span className="font-semibold text-2xl">
            Oops! Somethings went wrong
          </span>
          <span className="font-normal text-base text-center gap-4">
            This page is currently unavailable. Don’t worry, we are working on
            the problem. Thank you for your patience!
          </span>
        </div>
        <Button
          className="mt-4 w-[30%] py-4 flex items-center justify-center"
          type="primary"
          onClick={() => {
            router.back();
          }}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default Page;
