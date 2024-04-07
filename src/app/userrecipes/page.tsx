import { useQuery } from "@apollo/client";
import React from "react";
import { GET_USER_RECIPE } from "../api/graphql/queries";
import Card from "../components/card/card";
import {auth} from "@clerk/nextjs"
import UserRecipesCards from "./userRecipesCards";

const UserRecipes = () => {
    const {userId} = auth()
  return (
    <div className="p-4 pt-20">
      <h1 className="text-5xl text-center">
        Your Delicious <span className="text-primepink">Recipes</span>
      </h1>
      <UserRecipesCards userId={userId}/>
      {/* <div className="flex justify-around items-center pt-7">
        {data.userRecipe.map(
          (recipe: { _id: string; title: string; image: string }) => {
            <div key={recipe._id}>
              <Card
                _id={recipe._id}
                image={recipe.image}
                title={recipe.title}
              />
            </div>;
          }
        )}
      </div> */}
    </div>
  );
};

export default UserRecipes;
