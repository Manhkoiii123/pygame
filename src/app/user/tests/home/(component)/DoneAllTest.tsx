import Image from "next/image";

const DoneAllTest = () => {
  return (
    <div className="flex sm:ml-40 ml-0 sm:flex-row flex-col">
      <div className="flex flex-col gap-4">
        <span className="font-semibold sm:text-[40px] sm:leading-[56px] text-xl text-primary">
          Thank You
        </span>
        <div className="flex flex-col gap-2 font-medium sm:text-xl text-sm text-primary">
          <span>You have completed this assessment.</span>
          <span>Thank you & hope you had fun!</span>
        </div>
        <span className="font-medium sm:text-xl text-sm text-primary">
          You can close the assessment window now.
        </span>
      </div>
      <Image
        src={"/thankYout.png"}
        alt="thank you"
        width={700}
        height={700}
        className=" object-cover ml-auto"
      ></Image>
    </div>
  );
};

export default DoneAllTest;
