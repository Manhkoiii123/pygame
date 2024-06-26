import Image from "next/image";
import React from "react";

const CountDownStartGame = () => {
  return (
    <div className="h-[100%] flex items-center justify-center">
      <Image
        src={"/countdown321.gif"}
        width={600}
        height={600}
        alt="countdown"
        className="sm:w-[600px] sm:h-[600px] h-[200px] w-[200px] object-cover"
      />
    </div>
  );
};

export default CountDownStartGame;
