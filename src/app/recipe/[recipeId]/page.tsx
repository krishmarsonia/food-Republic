"use client";
import React from "react";
import Image from "next/image";
import { useQuery } from "@apollo/client";

import { GET_RECIPE } from "../../api/graphql/queries";

const Recipe = ({ params }: { params: { recipeId: string } }) => {
  console.log(params);
  const { data, loading, error } = useQuery(GET_RECIPE, {
    variables: { recipeId: params.recipeId },
  });
  // console.log(data);

  if (loading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    console.log(error);
    return <h1>Error occured</h1>;
  }
  // if (!loading) {
  //   console.log("23",data.recipe.description[0].value.split("\n"));
  // }
  return (
    <div className="px-60 py-20 bg-lightPink whitespace-pre-line">
      <div className="flex justify-between">
        <div>
          <h1 className="text-5xl capitalize">{data.recipe.title}</h1>
          <p className="text-gray-500 text-md mt-3">
            {data.recipe.user.firstName} / March 28, 2024
          </p>
          <div className="flex mt-3 text-sm">
            <div>Prep Time: {data.recipe.preparationTime}</div>
            <div className="relative bottom-0.5 mx-3 border-l-2 h-7"></div>
            <div>Cook Time: {data.recipe.cookingTime}</div>
            <div className="relative bottom-0.5 mx-3 border-l-2 h-7"></div>
            <div>Serves: {data.recipe.servings} People</div>
          </div>
          <div className="mt-3">
            <h1 className="text-2xl text-primepink">Ingredients</h1>
            <div className="border-b-2 w-32"></div>
            <ul>
              {data.recipe.ingredients.map((ing: any) => {
                return (
                  <li className="mt-2" key={ing._id}>
                    <p className="font-medium capitalize">{ing.value}</p>
                    <div className="border-b-2 w-96 mt-1"></div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div>
          <Image
            src={`${data.recipe.image}`}
            alt="Burger"
            width={375}
            height={200}
            quality={100}
          />
        </div>
      </div>
      <div className=" mt-5">
        <h1 className="text-2xl text-primepink">Method</h1>
        <div className="border-b-2 w-24"></div>
        <ol className="list-decimal whitespace-pre-line">
          {data.recipe.description.map((des: {_id: string, value: string }) => {
            return (
              <div className="ml-4 mt-3 whitespace-pre-line" key={des._id}>
                <li className="whitespace-pre-line">
                  {des.value.split('\\n').map((dv, index) => {
                    return (
                      <div key={index}>
                        {dv} <br />
                      </div>
                    );
                  })}
                </li>
                {/* <div className="border-b-2 relative right-5 w-full mt-3"></div> */}
              </div>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Recipe;
