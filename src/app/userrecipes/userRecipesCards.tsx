"use client";
import { useQuery } from "@apollo/client";
import React from "react";
import { GET_USER_RECIPE } from "../api/graphql/queries";
import Card from "../components/card/card";
import Link from "next/link";

const UserRecipesCards = ({ userId }: { userId: string | null }) => {
  const { data, loading, error } = useQuery(GET_USER_RECIPE, {
    variables: { userId: userId },
  });
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (!loading) {
    console.log("16", data);
  }
  return (
    <div className="flex justify-around mt-8 mx-36 flex-wrap">
      {data.userRecipe.map(
        (recipe: {
          _id: string;
          title: string;
          image: string;
          cusineType: string;
          foodType: string;
        }) => {
          return (
            <Link href={`recipe/${recipe._id}`} key={recipe._id}>
              <Card
                _id={recipe._id}
                image={recipe.image}
                title={recipe.title}
                cusineType={recipe.cusineType}
                foodType={recipe.foodType}
                update={userId ? true : false}
              />
            </Link>
          );
        }
      )}
    </div>
  );
};

export default UserRecipesCards;
