import { gql } from "@apollo/client";

export const ADD_RECIPE = gql`
    mutation AddRecipe($addRecipeparams: addRecipeSchema) {
        addRecipe(recipe: $addRecipeparams) {
            cookingTime
        }
    }
`

export const UPDATE_RECIPE = gql`
    mutation UpdateRecipe($updateRecipeParams: updateRecipeSchema){
        updateRecipe(recipe: $updateRecipeParams) {
            cookingTime
        }
    }
`

export const DELETE_RECIPE = gql`
    mutation DeleteRecipe($deleteRecipeParams: deleteRecipeSchema){
        deleteRecipe(recipeId: $deleteRecipeParams){
            cookingTime
        }
    }
`