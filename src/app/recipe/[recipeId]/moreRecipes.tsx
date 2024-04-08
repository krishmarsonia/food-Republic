import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_MORE_RECIPE } from "@/app/api/graphql/queries";
import RoundCards from "@/app/components/roundCards/roundCards";

const MoreRecipes = (props: { userId: string; recipeId: string }) => {
  const { userId, recipeId } = props;
  //   console.log("more recipes 7", _id);
  const { data, loading, error } = useQuery(GET_USER_MORE_RECIPE, {
    variables: { userId: userId },
  });
  console.log(data);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (!loading) {
    if (data.moreUserRecipes.length < 2) {
        return null;
    }else{
        return (
            <div className="px-60 bg-backGrey py-3">
              <h1 className="text-2xl">More recipes from Krish</h1>
              <br />
              <div className="flex justify-around">
                {data.moreUserRecipes
                  .filter((mr: { _id: string }) => mr._id !== recipeId)
                  .map((fmr: { _id: string; image: string; title: string }) => {
                    return (
                      <RoundCards
                        foodTitle={fmr.title}
                        imageSrc={fmr.image}
                        foodId={fmr._id}
                        key={fmr._id}
                      />
                    );
                  })}
              </div>
            </div>
          );
    }
  }
  
};

export default MoreRecipes;
