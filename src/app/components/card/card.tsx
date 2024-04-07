"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_RECIPE } from "@/app/api/graphql/mutations";
import { GET_RECIPES, GET_USER_RECIPE } from "@/app/api/graphql/queries";

const Card = (da: {
  _id: string;
  image: string;
  title: string;
  cusineType: string;
  foodType:string;
  update?: boolean;
}) => {
  const [deleteRecipe] = useMutation(DELETE_RECIPE);
  return (
    <div
      className={`flex flex-col ${
        da.update ? `h-72` : `h-64`
      }  w-72 rounded-md shadow-2xl mx-4 mt-2 mb-14 hover:cursor-pointer`}
    >
      <div className="overflow-hidden rounded-t-md rounded-b-sm">
        <div className=" relative w-72 h-48 inline-block my-auto">
          <Image
            quality={100}
            className=" relative hover:scale-110 duration-700 transition-transform h-52 object-cover"
            src={da.image}
            alt="Burger"
            fill={true}
            sizes="33vh"
            priority={true}
            // objectFit="cover"
            // width={300}
            // height={100}
          />
        </div>
      </div>
      <div className="h-[30%] pt-1 pl-2">
        <div className="flex justify-between">
          <div className="text-sm font-medium text-magicgreen">{da.title}</div>
          <div className="flex">
            <div className={`text-xs font-extralight ${da.foodType === "Veg" ? `text-green-400` : `text-red-500`} mr-3  p-0.5 border-2 ${da.foodType === "Veg" ? `border-green-400` : `border-red-500`} `}>
              {da.foodType}
            </div>
            <div className="text-xs font-extralight text-gray-400 mr-3 p-0.5 border-2 border-gray-400">
              {da.cusineType}
            </div>
          </div>
        </div>
        <div className="text-gray-400 text-xs pt-0.5">
          Amazing burger with a delight of coke.
        </div>
        {da.update ? (
          <div className="pt-1 float-end">
            <Link
              href={{
                pathname: "/updaterecipe",
                query: {
                  recipeId: da._id,
                },
              }}
            >
              <button className="p-1 mx-2 border-green-400 border-2 text-green-400 rounded-md hover:bg-green-400 hover:text-white duration-75">
                Update
              </button>
            </Link>
            <button
              className="p-1 mx-2 border-red-600 border-2 text-red-600 rounded-md hover:bg-red-600 hover:text-white duration-75"
              onClick={() => {
                deleteRecipe({
                  variables: {
                    deleteRecipeParams: {
                      _id: da._id,
                    },
                  },
                  refetchQueries: [{ query: GET_USER_RECIPE }],
                });
              }}
            >
              Delete
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Card;
