"use client";
import { Button } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <div className="flex sm:w-[700px] w-[300px] items-center justify-center flex-col">
      <Image src={"/loi.png"} alt="loi" width={400} height={400} />
      <div className="flex items-center justify-center flex-col">
        <span className="font-semibold text-2xl">
          Oops! Somethings went wrong
        </span>
        <span className="font-normal text-base">
          This page is currently unavailable. Don’t worry, we are working on the
          problem. Thank you for your patience!
        </span>
      </div>
      <Button
        type="primary"
        onClick={() => {
          router.back();
        }}
      >
        Back
      </Button>
    </div>
  );
};

export default Page;
