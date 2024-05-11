import Image from "next/image";

const DoneAllTest = () => {
  return (
    <div className="flex ml-40">
      <div className="flex flex-col gap-4">
        <span className="font-semibold text-[40px] leading-[56px] text-primary">
          Thank You
        </span>
        <div className="flex flex-col gap-2 font-medium text-xl text-primary">
          <span>You have completed this assessment.</span>
          <span>Thank you & hope you had fun!</span>
        </div>
        <span className="font-medium text-xl text-primary">
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
