import { Recipe } from "@/database/db";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="bg-lightPink pt-28 lg:pt-14 w-full">
      {/* <nav className="w-full flex justify-around font-sans font-medium my-7  ">
        <div className="mr-[350px] font-bold">Food Republic</div>
        <div>
          <ul className="flex gap-16">
            <li>
              <div className="w-[130%] h-7 flex items-center justify-center hover:bg-primepink rounded-md hover:text-white duration-500 hover:cursor-pointer">
                <center>Home</center>
              </div>
            </li>
            <li><div className="w-[130%] h-7 flex items-center justify-center hover:bg-primepink rounded-md hover:text-white duration-500 hover:cursor-pointer">
                <Link href={"/recipes"}><center>Recipes</center></Link>
              </div></li>
            <li><div className="w-[130%] h-7 flex items-center justify-center hover:bg-primepink rounded-md hover:text-white duration-500 hover:cursor-pointer">
                <center>Login</center>
              </div></li>
          </ul>
        </div>
      </nav> */}
      <div className="flex w-5/6 items-start justify-around m-auto flex-wrap flex-col sm:flex-col lg:flex-row">
        <div className="w-full m-auto lg:w-1/2">
          <h1 className="text-xl lg:text-6xl leading-0 lg:leading-[4.25rem]">
            Discover Your New Favourite Dish at{" "}
            <div className="text-primepink start-1 mr-32">Food Republic!</div>
          </h1>
          <br />
          <p className="font-light text-gray-400 mr-20 ml-1">
            Elevate your culinary game with our flavourful recipes. Explore a
            world of delicious possibilities today!
          </p>
          <br />
          <Link href={"/recipes"}>
            <button className="bg-primepink w-28 h-9 rounded-3xl text-white text-md font-medium">
              Explore Food
            </button>
          </Link>
        </div>
        <div className="w-1/2">
          <Image
            className="h-5/6"
            width={600}
            height={500}
            src="https://firebasestorage.googleapis.com/v0/b/recipeimageupload.appspot.com/o/image%2FArtboard%201%20.png1711967824470?alt=media&token=ecda5bba-e386-4f94-8c1f-a4de18ac4b3c"
            alt="Indian Dish"
          />
        </div>
      </div>
      <div className="bg-backGrey">
        <div>
          <h1 className="text-4xl text-center pt-12 font-bold">
            So, What Are We Making{" "}
            <span className="text-primepink">Today?</span>
          </h1>
        </div>
        <br />
        <div className="flex flex-col lg:flex-row mt-24 justify-around w-[96%] m-auto">
          <div className="h-60 w-1/6 bg-white rounded-xl shadow-xl">
            <Image
              className="w-3/5 m-auto rounded-[55%] h-36 mb-9 relative bottom-16"
              src="https://static.vecteezy.com/system/resources/thumbnails/027/536/411/small_2x/delicious-french-fries-on-a-white-background-photo.jpg"
              width={200}
              height={200}
              alt=""
            />
            <h1 className="text-xl text-center relative bottom-20">
              French Fries
            </h1>
            <br />
            <div className="flex justify-around w-5/6 m-auto">
              <div>
                <p className="relative bottom-20 text-center">
                  Total Time <br /> 7 Min
                </p>
              </div>
              <div className="relative bottom-20 border-l-2 h-14"></div>
              <div>
                <p className="relative bottom-20 text-center">
                  Servings <br /> 2
                </p>
              </div>
            </div>
          </div>
          <div className="h-60 w-1/6 bg-white rounded-xl shadow-xl">
            <Image
              className="w-3/5 m-auto rounded-[55%] h-36 mb-9 relative bottom-16"
              src="https://static.vecteezy.com/system/resources/thumbnails/027/536/411/small_2x/delicious-french-fries-on-a-white-background-photo.jpg"
              width={200}
              height={200}
              alt=""
            />
            <h1 className="text-xl text-center relative bottom-20">
              French Fries
            </h1>
            <br />
            <div className="flex justify-around w-5/6 m-auto">
              <div>
                <p className="relative bottom-20 text-center">
                  Total Time <br /> 7 Min
                </p>
              </div>
              <div className="relative bottom-20 border-l-2 h-14"></div>
              <div>
                <p className="relative bottom-20 text-center">
                  Servings <br /> 2
                </p>
              </div>
            </div>
          </div>
          <div className="h-60 w-1/6 bg-white rounded-xl shadow-xl">
            <Image
              className="w-3/5 m-auto rounded-[55%] h-36 mb-9 relative bottom-16"
              src="https://static.vecteezy.com/system/resources/thumbnails/027/536/411/small_2x/delicious-french-fries-on-a-white-background-photo.jpg"
              width={200}
              height={200}
              alt=""
            />
            <h1 className="text-xl text-center relative bottom-20">
              French Fries
            </h1>
            <br />
            <div className="flex justify-around w-5/6 m-auto">
              <div>
                <p className="relative bottom-20 text-center">
                  Total Time <br /> 7 Min
                </p>
              </div>
              <div className="relative bottom-20 border-l-2 h-14"></div>
              <div>
                <p className="relative bottom-20 text-center">
                  Servings <br /> 2
                </p>
              </div>
            </div>
          </div>
          <div className="h-60 w-1/6 bg-white rounded-xl shadow-xl">
            <Image
              className="w-3/5 m-auto rounded-[55%] h-36 mb-9 relative bottom-16"
              src="https://static.vecteezy.com/system/resources/thumbnails/027/536/411/small_2x/delicious-french-fries-on-a-white-background-photo.jpg"
              width={200}
              height={200}
              alt=""
            />
            <h1 className="text-xl text-center relative bottom-20">
              French Fries
            </h1>
            <br />
            <div className="flex justify-around w-5/6 m-auto">
              <div>
                <p className="relative bottom-20 text-center">
                  Total Time <br /> 7 Min
                </p>
              </div>
              <div className="relative bottom-20 border-l-2 h-14"></div>
              <div>
                <p className="relative bottom-20 text-center">
                  Servings <br /> 2
                </p>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
    </main>
  );
}
