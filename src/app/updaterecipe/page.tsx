"use client";
import dynamic from "next/dynamic";
import { v4 } from "uuid";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { storage } from "../../database/firebase";
import { GET_RECIPE, GET_RECIPES } from "../api/graphql/queries";
import { ADD_RECIPE, UPDATE_RECIPE } from "../api/graphql/mutations";

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
  ingridentsArray: {
    value: "";
  }[];
  image: FileList;
};

const AddRecipe = () => {
  const queryResult = useSearchParams();
  const [updateRecipeFn] = useMutation(UPDATE_RECIPE);
  console.log("34", queryResult.get("recipeId"));
  const { data, loading, error } = useQuery(GET_RECIPE, {
    variables: { recipeId: queryResult.get("recipeId") },
  });
  console.log(data);
  //   const [recipeImage, setRecipeImage] = useState<File>();
  const router = useRouter();
  const form = useForm<FormValues>({
    defaultValues: {
      recipeName: "",
      prepTime: "",
      servings: "",
      cookTime: "",
      difficulty: "",
      ingridentsArray: [
        {
          value: "",
        },
      ],
    },
  });
  const { register, control, handleSubmit, formState, setValue } = form;
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
  const { errors } = formState;

  const { fields, append } = useFieldArray({
    name: "ingridentsArray",
    control,
  });

  useEffect(() => {
    console.log("hey");
    if (!loading) {
      const descs = data.recipe.description.map((dc: any) => {
        return { _id: dc._id, value: dc.value };
      });
      const ings = data.recipe.ingredients.map((inr: any) => {
        return { _id: inr._id, value: inr.value };
      });
      setValue("cookTime", data.recipe.cookingTime);
      setValue("difficulty", data.recipe.difficulty);
      //   setValue("image", data.recipe.image);
      setValue("prepTime", data.recipe.preparationTime);
      setValue("recipeName", data.recipe.title);
      setValue("servings", data.recipe.servings);
      setMethods([...descs]);
      setIngredients([...ings]);
    }
  }, [loading]);

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

  if (error) {
    console.log(error);
  }
  const onSubmit = async (datas: FormValues) => {
    const newIngredients = ingredients.map((ing) => {
      return { value: ing.value };
    });
    const newDescription = methods.map((mh) => {
      return { value: mh.value };
    });
    if (datas.image.length > 0) {
      const imageRef = ref(
        storage,
        `image/${datas.image[0]?.name + Date.now()}`
      );
      const uploadResult = await uploadBytes(imageRef, datas.image[0]);
      const url = await getDownloadURL(uploadResult.ref);
      updateRecipeFn({
        variables: {
          updateRecipeParams: {
            _id: data.recipe._id,
            cookingTime: datas.cookTime,
            description: newDescription,
            difficulty: datas.difficulty,
            image: url,
            ingredients: newIngredients,
            preparationTime: datas.prepTime,
            servings: datas.servings,
            title: datas.recipeName,
          },
        },
        refetchQueries: [{ query: GET_RECIPES }],
      });
    } else {
      updateRecipeFn({
        variables: {
          updateRecipeParams: {
            _id: data.recipe._id,
            cookingTime: datas.cookTime,
            description: newDescription,
            difficulty: datas.difficulty,
            image: null,
            ingredients: newIngredients,
            preparationTime: datas.prepTime,
            servings: datas.servings,
            title: datas.recipeName,
          },
        },
        refetchQueries: [{ query: GET_RECIPES }],
      });
    }

    router.push("/userrecipes");
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
  return (
    <div className="lg:px-8 pt-20 bg-lightPink flex flex-col justify-center items-center">
      <div className="shadow-xl bg-white w-full lg:w-4/5 lg:px-20">
        <h1 className="text-center text-3xl font-medium py-8">
          Share your <span className="text-primepink">Amazing Recipe</span> with
          the world
        </h1>
        <hr />
        <form
          onSubmit={handleSubmit(onSubmit)}
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:mx-5 w-80 h-9 my-2 lg:my-0"
                  type="text"
                  id="recipeName"
                  placeholder="ex: French Fries, Burger"
                  {...register("recipeName", {
                    required: "Recipe Name is required.",
                  })}
                />
                <p className="text-red-500 ml-5">
                  {errors.recipeName?.message}
                </p>
              </div>
            </div>
            <div className="flex justify-between flex-wrap w-3/4 py-5">
              <div>
                <h1 className="text-xl">Preperation Time</h1>
              </div>
              <div>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-5 w-80 h-9"
                  type="text"
                  id="recipeName"
                  placeholder="ex: 20 min"
                  {...register("prepTime", {
                    pattern: {
                      value:
                        /^\d+\s+([mM]inute(s)?|[hH]our(s)?|[mM]in(s)?|[hH]r(s)?)+\s*$/,
                      message:
                        "Invalid Cooking time. Please write number of hours or minute follwing mins or hrs or minutes or hours.",
                    },
                  })}
                />
                <p className="text-red-500 ml-5">{errors.prepTime?.message}</p>
              </div>
            </div>
            <div className="flex justify-between flex-wrap w-3/4 py-5">
              <div>
                <h1 className="text-xl">No. of servings</h1>
              </div>
              <div>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-5 w-80 h-9"
                  type="text"
                  id="recipeName"
                  placeholder="ex: 4"
                  {...register("servings", {
                    pattern: {
                      value: /\s*[0-9]*\s*/,
                      message: "Please enter only number",
                    },
                  })}
                />
                <p className="text-red-500 ml-5">{errors.servings?.message}</p>
              </div>
            </div>
            <div className="flex justify-between flex-wrap w-3/4 py-5">
              <div>
                <h1 className="text-xl">Cooking Time</h1>
              </div>
              <div>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-5 w-80 h-9"
                  type="text"
                  id="recipeName"
                  placeholder="ex: 30 min"
                  {...register("cookTime", {
                    pattern: {
                      value:
                        /^\d+\s+([mM]inute(s)?|[hH]our(s)?|[mM]in(s)?|[hH]r(s)?)+\s*$/,
                      message:
                        "Invalid Cooking time. Please write number of hours or minute follwing mins or hrs or minutes or hours.",
                    },
                    required: "Cooking time will be required",
                  })}
                />
                <p className="text-red-500 ml-5 w-1/2">
                  {errors.cookTime?.message}
                </p>
              </div>
            </div>
            <div className="flex justify-between flex-wrap w-3/4 py-5">
              <div>
                <h1 className="text-xl">Difficulty</h1>
              </div>
              <div className="w-3/4 ">
                <div className="flex justify-around w-1/2 float-end mr-10">
                  <div>
                    <input
                      {...register("difficulty", {
                        required: "Difficulty Level is required.",
                      })}
                      type="radio"
                      id="easyLevel"
                      value="Easy"
                    />
                    <label htmlFor="easyLevel">Easy</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      {...register("difficulty", {
                        required: "Difficulty Level is required.",
                      })}
                      id="mediumLevel"
                      value="Medium"
                    />
                    <label htmlFor="mediumLevel">Medium</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      {...register("difficulty", {
                        required: "Difficulty Level is required.",
                      })}
                      id="hardLevel"
                      value="Hard"
                    />
                    <label htmlFor="hardLevel">Hard</label>
                  </div>
                </div>
                <p className="text-red-500 ml-5">
                  {errors.difficulty?.message}
                </p>
              </div>
            </div>
            <div className="flex justify-between flex-wrap w-9/12 py-5">
              <div>
                <h1 className="text-xl">Ingredients</h1>
              </div>
              <div className="flex flex-col w-3/5 pl-6">
                <div className="ml-2">
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-5 w-80 my-2 h-9"
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
            <div className="flex justify-between flex-wrap w-9/12 py-5">
              <div>
                <h1 className="text-xl">Method</h1>
              </div>

              <div className="flex flex-col w-3/5 pl-6">
                <div className="ml-2">
                  <textarea
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-600 focus:border-blue-500 block p-1 dark:bg-gray-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-5 w-80 h-28 focus:outline-none focus:ring-0"
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
                <div className="ml-2">
                  <p className="text-sm text-gray-400 ml-6">
                    After writing a method press enter.
                  </p>
                  <p className="text-sm text-gray-400 ml-6">
                    To edit or see methods press preview button.
                  </p>
                </div>
                <div className="flex justify-end flex-col ml-7">
                  <div className="flex text-md justify-normal text-gray-400 flex-wrap w-11/12">
                    {methods.map((mt, index) => {
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
            <div className="flex justify-between flex-wrap w-3/4 py-5">
              <div>
                <h1 className="text-xl">Recipe Image</h1>
              </div>
              <div className="w-[22rem]">
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-5 w-80 h-9"
                  type="file"
                  // onChange={(e) => {
                  //   e.target.files && setRecipeImage(e.target.files[0]);
                  // }}
                  // name="recipeName"
                  {...register("image")}
                  id="recipeName"
                />
                <p className="text-sm text-gray-400 ml-6 text-wrap">
                  If you want to update the image then upload the new image or
                  else keep it as it is.
                </p>
                <p className="text-red-500 ml-5">
                  {errors.difficulty?.message}
                </p>
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
                                let tempMts = methods;
                                console.log(methods);
                                tempMts[index].value = e.target.value;
                                console.log(methods);
                                setMethods([...tempMts]);
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
