import Image from "next/image";
import Link from "next/link";
import React from "react";

const RoundCards = (props: {
  imageSrc: string;
  foodTitle: string;
  foodId: string;
}) => {
  const { imageSrc, foodTitle, foodId } = props;
  return (
    <div className="flex flex-col items-center">
      <div className="overflow-hidden rounded-[50%] cursor-pointer">
        <Link href={`/recipe/${foodId}`}>
          <div className=" relative w-44 h-32 inline-block pt-3">
            <Image
              quality={100}
              className=" relative scale-110 hover:scale-125 duration-700 transition-transform h-52 object-cover mt-1"
              src={imageSrc}
              alt="Burger"
              sizes="33vh"
              fill
            />
          </div>
        </Link>
      </div>
      <div className="text-xl font-medium">{foodTitle}</div>
    </div>
  );
};

export default RoundCards;
