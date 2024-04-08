import Image from "next/image";
import React from "react";

const Home = () => {
  return (
    <div className="flex items-center justify-between px-14">
      <div className="flex flex-col gap-2  text-primary w-[568px] pe-6">
        <span className="text-[72px] leading-[84px] font-semibold">
          Hire the best. No bias. No stress.
        </span>
        <span className="font-normal text-lg block w-[540px] pe-4">
          Our screening tests identify the best participantss and make your
          hiring decisions faster, easier, and bias-free.
        </span>
      </div>
      <div>
        <Image
          src={"/pyhomepage.png"}
          alt="home banner"
          width={600}
          height={600}
        />
      </div>
    </div>
  );
};

export default Home;
