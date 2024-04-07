"use client";
import dynamic from "next/dynamic";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { storage } from "../../database/firebase";
import { GET_RECIPES } from "../api/graphql/queries";
import { ADD_RECIPE } from "../api/graphql/mutations";

const DevT: React.ElementType = dynamic(
  () => import("@hookform/devtools").then((module) => module.DevTool),
  { ssr: false }
);

type FormValues = {
  recipeName: string;
  prepTime: string;
  servings: string;
  cookTime: string;
  difficulty: string;
  image: FileList;
};

const AddRecipe = () => {
  const [addRecipeFn] = useMutation(ADD_RECIPE);
  const [loading, setLoading] = useState(false);
  const [recipeName, setRecipeName] = useState<{
    value: string;
    error: null | string;
  }>({ value: "", error: null });

  const [recipeImage, setRecipeImage] = useState<File>();
  const [recipeImageError, setRecipeImageError] = useState("");
  const [prepTime, setPrepTime] = useState<{
    value: string;
    error: null | string;
  }>({ value: "", error: null });
  const [cusineType, setCusineType] = useState<{
    value: string;
    error: null | string;
  }>({ value: "Indian", error: null });
  const [foodType, setFoodType] = useState<{
    value: string;
    error: null | string;
  }>({ value: "Vegetarian", error: null });
  const [prepTimeNumber, setPrepTimeNumber] = useState<string>("Minutes");
  const [servings, setServings] = useState<{
    value: string;
    error: null | string;
  }>({ value: "", error: null });
  const [cookTime, setCookTime] = useState<{
    value: string;
    error: null | string;
  }>({ value: "", error: null });
  const [cookTimeNumber, setCookTimeNumber] = useState<string>("Minutes");
  const [difficulty, setDifficulty] = useState<{
    value: string;
    error: null | string;
  }>({ value: "", error: null });
  const router = useRouter();
  const form = useForm<FormValues>({
    defaultValues: {
      recipeName: "",
      prepTime: "",
      servings: "",
      cookTime: "",
      difficulty: "",
    },
  });
  const { register, control, handleSubmit } = form;
  const [ingredients, setIngredients] = useState<
    Array<{ _id: string; value: string }>
  >([]);
  const [inpIng, setInpIng] = useState("");
  const [inpMethod, setInpMethod] = useState("");
  const [methods, setMethods] = useState<Array<{ _id: string; value: string }>>(
    []
  );
  const [showModal, setShowModal] = useState(false);
  const refs = useRef<HTMLDivElement>(null);

  // const { fields, append } = useFieldArray({
  //   name: "ingridentsArray",
  //   control,
  // });

  useEffect(() => {
    const checkIfClickedOutSide = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        !refs.current?.contains(e.target)
      ) {
        setShowModal(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutSide);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutSide);
    };
  }, [refs, showModal]);
  // useEffect(() => {
  //   console.log("its field 47", fields);
  // }, [fields]);

  const onSubmit = async () => {
    console.log(recipeImage);
    setLoading(true);
    if (recipeImage) {
      console.log("hey");
      const imageRef = ref(storage, `image/${recipeImage.name + Date.now()}`);
      const uploadResult = await uploadBytes(imageRef, recipeImage);
      const url = await getDownloadURL(uploadResult.ref);
      addRecipeFn({
        variables: {
          addRecipeparams: {
            cookingTime: cookTime.value + " " + cookTimeNumber,
            description: methods,
            difficulty: difficulty.value,
            image: url,
            ingredients: ingredients,
            preparationTime: prepTime.value + " " + prepTimeNumber,
            servings: servings.value,
            cusineType: cusineType.value,
            foodType: foodType.value,
            title: recipeName.value,
          },
        },
        refetchQueries: [{ query: GET_RECIPES }],
      });
    }
    setLoading(false);
    router.push("/recipes");
  };

  const ingadd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      const newArr = [...ingredients, { _id: v4(), value: inpIng }];
      setIngredients(newArr);
      setInpIng("");
    }
  };
  const ingDelete = (id: string) => {
    const filteredArr = ingredients.filter((ing) => ing._id !== id);
    setIngredients([...filteredArr]);
  };
  if (loading) {
    return <h1 className="text-5xl mt-24">Loading...</h1>;
  }
  return (
    <div className="lg:px-8 pt-20 bg-lightPink flex flex-col justify-center items-center">
      <div className="shadow-xl bg-white w-full lg:w-4/5 lg:px-20">
        <h1 className="text-center text-3xl font-medium py-8">
          Share your <span className="text-primepink">Amazing Recipe</span> with
          the world
        </h1>
        <hr />
        <form
          onSubmit={onSubmit}
          onKeyDown={(e) => {
            if (e.code === "Enter" || e.code === "NumpadEnter") {
              e.preventDefault();
            }
          }}
          noValidate
        >
          <div className="flex flex-col justify-center items-center w-full">
            <div className="flex justify-between flex-wrap w-3/4 py-5 lg:flex-row flex-col">
              <div>
                <h1 className="text-xl">Recipe Name</h1>
              </div>
              <div>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-5 w-80 h-9 focus:outline-none focus:ring-1 my-2 lg:my-0"
                  type="text"
                  id="recipeName"
                  placeholder="ex: French Fries, Burger"
                  // {...register("recipeName", {
                  //   required: "Recipe Name is required.",
                  // })}
                  name="recipeName"
                  onChange={(e) =>
                    setRecipeName({ error: null, value: e.target.value })
                  }
                  value={recipeName.value}
                />
                <p className="text-red-500 ml-5">{recipeName.error}</p>
              </div>
            </div>
            <div className="flex justify-between flex-wrap w-3/4 py-5 lg:flex-row flex-col">
              <div>
                <h1 className="text-xl">Cusine Type</h1>
              </div>
              <div className="mr-60">
                <select
                  name="cusineType"
                  id="cusineType"
                  value={cusineType.value}
                  onChange={(e) => {
                    setCusineType({ value: e.target.value, error: null });
                  }}
                >
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
                <p className="text-red-500 ml-5">{cusineType.error}</p>
              </div>
            </div>
            <div className="flex justify-between flex-wrap w-3/4 py-5 lg:flex-row flex-col">
              <div>
                <h1 className="text-xl">Food Type</h1>
              </div>
              <div className="mr-52">
                {/* <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-5 w-80 h-9 focus:outline-none focus:ring-1 my-2 lg:my-0"
                  type="text"
                  id="recipeCusine"
                  placeholder="ex: Italain, Mexican, Indian"
                  // {...register("recipeName", {
                  //   required: "Recipe Name is required.",
                  // })}
                  name="recipeCusine"
                  onChange={(e) =>
                    setCusineType({ error: null, value: e.target.value })
                  }
                  value={cusineType.value}
                /> */}
                <select
                  name="FoodType"
                  id="FoodType"
                  value={foodType.value}
                  onChange={(e) =>
                    setFoodType({ value: e.target.value, error: null })
                  }
                >
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-vegetarian">Non-vegetarian</option>
                </select>
                <p className="text-red-500 ml-5">{foodType.error}</p>
              </div>
            </div>
            <div className="flex justify-between flex-wrap w-3/4 py-5">
              <div>
                <h1 className="text-xl">Preperation Time</h1>
              </div>
              <div>
                <div className="flex">
                  <div>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-5 w-60 h-9 focus:outline-none focus:ring-1"
                      type="text"
                      id="recipePrepTime"
                      placeholder="ex: 20"
                      name="recipePrepTime"
                      value={prepTime.value}
                      onChange={(e) => {
                        setPrepTime({ value: e.target.value, error: null });
                      }}
                    />
                  </div>
                  <div>
                    <select
                      className="h-9"
                      name="prepTime"
                      id="prepTime"
                      value={prepTimeNumber}
                      onChange={(e) => setPrepTimeNumber(e.target.value)}
                    >
                      <option value="Minutes">Minutes</option>
                      <option value="Hours">Hours</option>
                      <option value="Days">Days</option>
                    </select>
                  </div>
                </div>
                <p className="text-red-500 ml-5">{prepTime.error}</p>
              </div>
            </div>
            <div className="flex justify-between flex-wrap w-3/4 py-5">
              <div>
                <h1 className="text-xl">No. of servings</h1>
              </div>
              <div>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-5 w-80 h-9 focus:outline-none focus:ring-1"
                  type="text"
                  id="recipeServings"
                  placeholder="ex: 4"
                  name="recipeServings"
                  value={servings.value}
                  onChange={(e) =>
                    setServings({ value: e.target.value, error: null })
                  }
                />
                <p className="text-red-500 ml-5">{servings.error}</p>
              </div>
            </div>
            <div className="flex justify-between flex-wrap w-3/4 py-5">
              <div>
                <h1 className="text-xl">Cooking Time</h1>
              </div>
              <div>
                <div className="flex">
                  <div>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-5 w-60 h-9 focus:outline-none focus:ring-1"
                      type="text"
                      id="recipeCookingTime"
                      placeholder="ex: 30"
                      name="recipeCookingTime"
                      value={cookTime.value}
                      onChange={(e) =>
                        setCookTime({ value: e.target.value, error: null })
                      }
                    />
                  </div>
                  <div>
                    <select
                      name="cookTime"
                      id="cookTime"
                      value={cookTimeNumber}
                      onChange={(e) => setCookTimeNumber(e.target.value)}
                    >
                      <option value="Minutes">Minutes</option>
                      <option value="Hours">Hours</option>
                      <option value="Days">Days</option>
                    </select>
                  </div>
                </div>

                <p className="text-red-500 ml-5 w-1/2">{cookTime.error}</p>
              </div>
            </div>
            <div className="flex justify-between flex-wrap w-3/4 py-5">
              <div>
                <h1 className="text-xl">Difficulty</h1>
              </div>
              <div className="w-2/4 mr-3">
                <div className="flex justify-around w-full">
                  <div>
                    <input
                      type="radio"
                      id="easyLevel"
                      value="Easy"
                      checked={difficulty.value === "Easy"}
                      onChange={() =>
                        setDifficulty({ value: "Easy", error: null })
                      }
                    />
                    <label htmlFor="easyLevel">Easy</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      checked={difficulty.value === "Medium"}
                      onChange={() =>
                        setDifficulty({ value: "Medium", error: null })
                      }
                      id="mediumLevel"
                      value="Medium"
                    />
                    <label htmlFor="mediumLevel">Medium</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      checked={difficulty.value === "Hard"}
                      onChange={() =>
                        setDifficulty({ value: "Hard", error: null })
                      }
                      id="hardLevel"
                      value="Hard"
                    />
                    <label htmlFor="hardLevel">Hard</label>
                  </div>
                </div>
                <p className="text-red-500 ml-5">{difficulty.error}</p>
              </div>
            </div>
            <div className="flex justify-between flex-wrap w-9/12 py-5">
              <div>
                <h1 className="text-xl">Ingredients</h1>
              </div>
              <div className="flex flex-col items-end w-3/5 pl-6">
                <div>
                  <div className="ml-2">
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-5 w-80 my-2 h-9 focus:outline-none focus:ring-1"
                      onKeyDown={ingadd}
                      value={inpIng}
                      onChange={(e) => {
                        setInpIng(e.target.value);
                      }}
                      type="text"
                      name={"recipe-ingreidents"}
                      id={"recipe-ingreidents"}
                      placeholder={"ex: Vegetables, Oil, Butter"}
                    />
                  </div>
                  <div className="ml-2">
                    <p className="text-sm text-gray-400 ml-6">
                      After writing an ingredient press enter
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <div className="flex text-md justify-normal text-gray-400 flex-wrap flex-row w-11/12">
                      {ingredients.map((ing) => {
                        return (
                          <div className="border-2 mx-1 my-1" key={ing._id}>
                            {ing.value}
                            <button
                              className="text-md border-l-2"
                              onClick={() => ingDelete(ing._id)}
                            >
                              ×
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between flex-wrap w-9/12 py-5">
              <div>
                <h1 className="text-xl">Method</h1>
              </div>

              <div className="flex flex-col items-end w-3/5 pl-6">
                <div>
                  <div className="ml-2">
                    <textarea
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-600 focus:border-blue-500 block p-1 dark:bg-gray-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-5 w-80 h-28 focus:outline-none focus:ring-1"
                      name="recipeMethod"
                      id="recipeMethod"
                      value={inpMethod}
                      onChange={(e) => {
                        setInpMethod(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.code === "Enter" && e.shiftKey) {
                          const concatedString = inpMethod + "\n";
                          setInpMethod(concatedString);
                        } else if (
                          e.code === "Enter" ||
                          e.code === "NumpadEnter"
                        ) {
                          if (inpMethod !== "") {
                            const tempMethod = [
                              ...methods,
                              { _id: v4(), value: inpMethod },
                            ];
                            setMethods([...tempMethod]);
                            setInpMethod("");
                          }
                        }
                      }}
                    />
                  </div>
                  <div className="pl-7">
                    <p className="text-sm text-gray-400">
                      After writing a method press enter.
                    </p>
                    <p className="text-sm text-gray-400">
                      To edit or see methods press preview button.
                    </p>
                  </div>
                  <div className="flex justify-end flex-col ml-7">
                    <div className="flex text-md justify-normal text-gray-400 flex-wrap w-11/12">
                      {methods.reverse().map((mt, index) => {
                        return (
                          <div className="border-2 mx-1 my-1" key={index}>
                            {mt.value.slice(0, 15)}
                            {mt.value.length > 15 ? "..." : null}
                          </div>
                        );
                      })}
                    </div>
                    {methods.length > 0 ? (
                      <div
                        className="text-white bg-primepink rounded-md w-2/5 h-10 font-medium text-center pt-1.5 hover:cursor-pointer"
                        onClick={() => {
                          setShowModal(true);
                        }}
                      >
                        Preview Methods
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between flex-wrap w-3/4 py-5">
              <div>
                <h1 className="text-xl">Recipe Image</h1>
              </div>
              <div>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-5 w-80 h-9"
                  type="file"
                  onChange={(e) => {
                    e.target.files && setRecipeImage(e.target.files[0]);
                  }}
                  name="recipeImage"
                  // {...register("image", {
                  //   required: "Image is required",
                  // })}
                  id="recipeImage"
                />
                <p className="text-red-500 ml-5">{recipeImageError}</p>
              </div>
            </div>
          </div>
          <div className="my-6 text-center">
            <button
              type="submit"
              className="border-2 border-primepink w-28 h-11 text-primepink font-medium hover:text-white hover:bg-primepink duration-150"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative  my-6 mx-auto max-w-3xl w-1/2" ref={refs}>
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Modal Title</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto h-80 overflow-y-scroll">
                  <div className="flex flex-col justify-center ">
                    {methods.map((mt, index) => {
                      return (
                        <div key={mt._id} className="mx-auto my-2 flex">
                          <div>{index + 1}.</div>
                          <div>
                            <textarea
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-5 w-80 "
                              name="recipeMethod"
                              id="recipeMethod"
                              value={mt.value}
                              onChange={(e) => {
                                methods[index].value = e.target.value;
                                console.log(methods);
                                setMethods([...methods]);
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <DevT control={control} />
    </div>
  );
};

export default AddRecipe;
