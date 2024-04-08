import { gql } from "@apollo/client";

export const GET_RECIPES = gql`
  query Recipes {
    recipes {
      _id
      title
      image,
      cusineType,
      foodType
    }
  }
`;

export const GET_RECIPE = gql`
  query getRecipe($recipeId: ID!) {
    recipe(id: $recipeId) {
      title
      _id
      image
      ingredients {
        _id
        value
      }
      description {
        _id
        value
      }
      user {
        firstName
        _id
      }
      cookingTime
      difficulty
      preparationTime
      servings
      cusineType
      foodType
    }
  }
`;

export const GET_USER_RECIPE = gql`
  query getUserRecipe($userId: ID!) {
    userRecipe(userId: $userId) {
      _id,
      title,
      image,
      cusineType,
      foodType
    }
  }
`;

export const GET_USER_MORE_RECIPE = gql`
  query getUserMoreRecipes($userId: ID!) {
    moreUserRecipes(userId: $userId){
      _id,
      image,
      title
    }
  }
`