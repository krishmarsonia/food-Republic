import mongoose from "mongoose";

import RecipeSchema from "@/models/recipe";
import UserSchema from "@/models/user"; 

let mongoString = process.env.MONGO_URI;

if(typeof mongoString === "undefined"){
    throw new Error("mongoString is not defined");
}

if(mongoose.connection.readyState !== 1){
    mongoose.connect(mongoString);
}

mongoose.Promise = global.Promise;

export const Recipe = RecipeSchema;
export const User = UserSchema;
