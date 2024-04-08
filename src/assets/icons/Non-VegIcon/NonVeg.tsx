import Image from "next/image";
import React from "react";

const NonVegIcon = () => {
  return (
    <div className="border-2 border-red-500 w-6">
      <Image
        src={"/redDot.png"}
        alt="green dot"
        width={25}
        height={25}
      ></Image>
    </div>
  );
};

export default NonVegIcon;
