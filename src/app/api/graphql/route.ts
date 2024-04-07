import { Recipe } from "@/database/db";
import { User } from "@/database/db";
import { ApolloServer } from "@apollo/server";
import { auth, currentUser } from "@clerk/nextjs";

import { startServerAndCreateNextHandler } from "@as-integrations/next";
import mongoose from "mongoose";
import { allowNextApiCors } from "@/allow-next-api-cors";

const typeDefs = `#graphql
    scalar FileUpload
    type Recipe {
        _id: ID!
        title: String!
        image: String
        preparationTime: String
        servings: String
        cookingTime: String
        difficulty: String
        cusineType: String
        foodType: String
        ingredients: [ingredientsSchema!]
        description: [descriptionSchema!]
        user: User
    }

    type ingredientsSchema {
      _id: String!
      value: String!
    }
    type descriptionSchema {
      _id: String!
      value: String!
    }

    type User {
        _id: ID!
        clerkId: String!
        email: String!
        firstName: String!
        lastName: String
    }

    type Query{
        recipes: [Recipe],
        recipe(id: ID!): Recipe!,
        userRecipe(userId: ID!): [Recipe!]
    }

    type Mutation {
      addRecipe(recipe: addRecipeSchema): Recipe
      updateRecipe(recipe: updateRecipeSchema): Recipe
      deleteRecipe(recipeId: deleteRecipeSchema): Recipe
    }

    input addRecipeSchema {
        title: String!
        image: String!
        preparationTime: String
        servings: String
        cookingTime: String
        difficulty: String
        cusineType: String
        foodType: String
        ingredients: [addingredientsSchema!]
        description: [adddescriptionSchema!]
    }

    input updateRecipeSchema{
      _id: ID
      title: String
      image: String
      preparationTime: String
      servings: String
      cookingTime: String
      difficulty: String
      cusineType: String
      foodType: String
      ingredients: [addingredientsSchema]
      description: [adddescriptionSchema]
    }

    input deleteRecipeSchema {
      _id: ID!
    }

    input adddescriptionSchema{
      _id: String
      value: String
    }

    input addingredientsSchema{
      _id: String
      value: String
    }
    
`;

const resolvers = {
  Query: {
    recipes: async () => {
      const result = await Recipe.find();
      // console.log("34",result);
      return result;
    },
    recipe: async (_: any, args: { id: string }) => {
      console.log("43", args);
      return await Recipe.findOne({ _id: args.id });
    },
    userRecipe: async (_: any, args: { userId: string }) => {
      const user = await User.findOne({ clerkId: args.userId });
      return await Recipe.find({ user: user._id });
    },
  },
  Recipe: {
    user: async (parent: {
      _id: string;
      title: string;
      image: string;
      ingredients: [string];
      description: string;
      user: mongoose.Types.ObjectId;
    }) => {
      const { user } = parent;
      return await User.findOne({
        _id: user.toString(),
      });
    },
  },
  Mutation: {
    addRecipe: async (
      _: any,
      args: {
        recipe: {
          title: string;
          image: string;
          preparationTime: string;
          servings: string;
          cookingTime: string;
          difficulty: string;
          cusineType: string;
          foodType: string;
          ingredients: [{ _id: string; value: string }];
          description: [{ _id: string; value: string }];
        };
      }
    ) => {
      const { recipe } = args;
      console.log("113", recipe);
      const { userId } = auth();
      const user = await currentUser();
      //first find the user and if not found create it and assign the id to the recipe
      let dbUser;
      dbUser = await User.findOne({ clerkId: userId });
      if (!dbUser) {
        dbUser = await User.create({
          clerkId: userId,
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.emailAddresses[0].emailAddress,
        });
      }
      const newIngridents = recipe.ingredients.map((ig) => {
        return { value: ig.value };
      });
      const newMethods = recipe.description.map((dc) => {
        return { value: dc.value };
      });
      const result = await Recipe.create({
        title: recipe.title,
        image: recipe.image,
        preparationTime: recipe.preparationTime,
        servings: recipe.servings,
        cookingTime: recipe.cookingTime,
        difficulty: recipe.difficulty,
        ingredients: newIngridents,
        description: newMethods,
        cusineType: recipe.cusineType,
        foodType: recipe.foodType,
        user: dbUser._id,
      });
      return result;
      // const res = await Recipe.find();
      // return res[0];
    },
    updateRecipe: async (
      _: any,
      args: {
        recipe: {
          _id: string;
          title: string;
          image: string | null;
          preparationTime: string;
          servings: string;
          cookingTime: string;
          difficulty: string;
          ingredients: [{ _id: string; value: string }];
          description: [{ _id: string; value: string }];
        };
      }
    ) => {
      const { recipe } = args;
      let updatedRecipe;
      console.log("187", recipe);
      if (recipe.image === null) {
        updatedRecipe = await Recipe.findByIdAndUpdate(recipe._id, {
          title: recipe.title,
          preparationTime: recipe.preparationTime,
          servings: recipe.servings,
          cookingTime: recipe.cookingTime,
          difficulty: recipe.difficulty,
          ingredients: recipe.ingredients,
          description: recipe.description,
        });
      } else {
        updatedRecipe = await Recipe.findByIdAndUpdate(recipe._id, {
          title: recipe.title,
          image: recipe.image,
          preparationTime: recipe.preparationTime,
          servings: recipe.servings,
          cookingTime: recipe.cookingTime,
          difficulty: recipe.difficulty,
          ingredients: recipe.ingredients,
          description: recipe.description,
        });
      }
      const res = await Recipe.find();
      return res[0];
    },
    deleteRecipe: async (_: any, args: { recipeId: { _id: string } }) => {
      await Recipe.findByIdAndDelete(args.recipeId._id);
      const res = await Recipe.find();
      return res[0];
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server);

// export default allowNextApiCors(handler);

export { handler as GET, handler as POST };
