import Image from "next/image";

const Page = () => {
  return (
    <div className="flex items-center justify-center">
      <Image src={"/loi.png"} alt="loi" width={400} height={400} />
      <span className="font-semibold text-2xl">
        Oops! Somethings went wrong
      </span>
      <span className="font-normal text-base">
        This page is currently unavailable. Don’t worry, we are working on the
        problem. Thank you for your patience!
      </span>
    </div>
  );
};

export default Page;
