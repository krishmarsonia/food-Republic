import Image from "next/image";
import React from "react";

const VegIcon = () => {
  return (
    <div className="border-2 border-green-500 w-6">
      <Image
        src={"/greenDotPng.png"}
        alt="green dot"
        width={25}
        height={25}
      ></Image>
    </div>
  );
};

export default VegIcon;
