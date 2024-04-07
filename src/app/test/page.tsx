"use client";
import React, { useState } from "react";

const Test = () => {
  const [data, setData] = useState(
    "dsjbjkfvdskdksjvfkjvdksfvkvdkjbfvkdkjvkjdsbvkkbasaaaaaaaaa\ndkjfkjdskfjv kjdskjvkjdbvk"
  );
  return (
    <div className="whitespace-pre-wrap pt-32">
      <ol>
        <li>{data}</li>
      </ol>
    </div>
  );
};

export default Test;
