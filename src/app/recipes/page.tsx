"use client";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_RECIPES } from "../api/graphql/queries";
import Image from "next/image";
import Link from "next/link";
import Card from "../components/card/card";

const Recipes = () => {
  const { data, loading, error } = useQuery(GET_RECIPES);
  const [foodSelect, setFoodSelect] = useState<"All" | "Veg" | "Non-Veg">(
    "All"
  );
  const [cusineSelect, setCusineSelect] = useState("All");
  if (loading) {
    return <h1>Loading</h1>;
  }
  if (!loading) {
    console.log(data);
  }
  return (
    <div className="p-4 pt-20 bg-lightPink scrollbar-hide">
      {/* ---------------Heading---------------- */}
      <h1 className="text-center text-4xl font-medium mt-5">
        All Your Favourite{" "}
        <span className="text-primepink start-1"> Recipes in one place</span>
      </h1>
      {/* ---------------Buttons--------------- */}
      <div className="flex justify-end">
        <div className="flex justify-around items-center w-3/4">
          <div className="flex justify-center items-center mt-7 flex-wrap">
            <div>
              <button
                className={`${
                  foodSelect === "All"
                    ? `bg-white text-primepink`
                    : `bg-primepink text-white`
                } w-32 h-11`}
                onClick={() => setFoodSelect("All")}
              >
                All Recipes
              </button>
            </div>
            <div>
              <button
                className={`${
                  foodSelect === "Veg"
                    ? `bg-white text-primepink`
                    : `bg-primepink text-white`
                } w-32 h-11`}
                onClick={() => setFoodSelect("Veg")}
              >
                Veg
              </button>
            </div>
            <div>
              <button
                className={`${
                  foodSelect === "Non-Veg"
                    ? `bg-white text-primepink`
                    : `bg-primepink text-white`
                } w-32 h-11`}
                onClick={() => setFoodSelect("Non-Veg")}
              >
                Non-Veg
              </button>
            </div>
          </div>
          <div className="text-lg">
            <span className="text-lg font-medium">Select Cusine:</span>{" "}
            <select
              name="CusineSelect"
              id="CusineSelect"
              className="focus:ring-primepin text-primepink"
              value={cusineSelect}
              onChange={(e) => setCusineSelect(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Chinese">Chinese</option>
              <option value="Italian">Italian</option>
              <option value="Indian">Indian</option>
              <option value="Thai">Thai</option>
              <option value="Mexican">Mexican</option>
              <option value="French">French</option>
              <option value="Greek">Greek</option>
              <option value="Japanese">Japanese</option>
              <option value="American">American</option>
              <option value="Korean">Korean</option>
              <option value="African">African</option>
              <option value="Balinese">Balinese</option>
              <option value="Labanese">Labanese</option>
              <option value="Malaysian">Malaysian</option>
              <option value="Spanish">Spanish</option>
              <option value="Asian">Asian</option>
              <option value="Egyptian">Egyptian</option>
              <option value="German">German</option>
              <option value="Turkish">Turkish</option>
              <option value="Argentine">Argentine</option>
              <option value="Iranian">Iranian</option>
            </select>
          </div>
        </div>
      </div>
      {/* ----------Cards------------------ */}
      <div className="flex justify-between mt-8 mx-36 flex-wrap overflow-y-scroll no-scrollbar ">
        {data.recipes
          .filter(
            (fd: {
              _id: string;
              image: string;
              title: string;
              cusineType: string;
              foodType: "All" | "Veg" | "Non-Veg";
            }) => {
              if (foodSelect === "All") {
                return true;
              } else if (foodSelect === "Non-Veg") {
                return fd.foodType === "Non-Veg";
              } else if (foodSelect === "Veg") {
                return fd.foodType === "Veg";
              }
            }
          )
          .filter(
            (cd: {
              _id: string;
              image: string;
              title: string;
              cusineType: string;
              foodType: "All" | "Veg" | "Non-Veg";
            }) => {
              if (cusineSelect === "All") {
                return true;
              } else {
                return cd.cusineType === cusineSelect;
              }
            }
          )
          .map(
            (da: {
              _id: string;
              image: string;
              title: string;
              cusineType: string;
              foodType: "All" | "Veg" | "Non-Veg";
            }) => {
              return (
                // <Link key={da._id} href={`recipe/${da._id}`}>
                <div className="mb-14">
                  <Card
                    key={da._id}
                    _id={da._id}
                    image={da.image}
                    title={da.title}
                    cusineType={da.cusineType}
                    foodType={da.foodType}
                  />
                </div>
                // </Link>
              );
            }
          )}
      </div>
    </div>
  );
};

export default Recipes;
