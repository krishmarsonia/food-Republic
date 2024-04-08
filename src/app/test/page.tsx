"use client";

import VegIcon from "@/assets/icons/vegIcon/Veg";
import Image from "next/image";
import React, { useState } from "react";

const Test = () => {
  const [data, setData] = useState(
    "dsjbjkfvdskdksjvfkjvdksfvkvdkjbfvkdkjvkjdsbvkkbasaaaaaaaaa\ndkjfkjdskfjv kjdskjvkjdbvk"
  );
  return (
    <div className=" pt-32 m-10 p-6">
      <VegIcon />
    </div>
  );
};

export default Test;
