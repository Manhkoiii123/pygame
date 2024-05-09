import Image from "next/image";
import React from "react";

const Grading = ({ star }: { star: number }) => {
  return (
    <div className="flex items-center gap-2">
      {Array(star)
        .fill(0)
        .map((item, index) => (
          <Image
            key={index}
            src={"/Icon_Star.png"}
            alt="star"
            width={24}
            height={24}
          />
        ))}
      {Array(5 - star)
        .fill(0)
        .map((item, index) => (
          <Image
            key={index}
            src={"/star_fill.png"}
            alt="star"
            width={24}
            height={24}
          />
        ))}
    </div>
  );
};

export default Grading;
