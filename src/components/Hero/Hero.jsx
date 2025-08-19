import React from "react";
import hero from "../../assets/hero.png";
import { CheckIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function Hero() {
  const user = JSON.parse(localStorage.getItem("yall_user_data")) && Cookies.get("yall_auth_token");
  return (
    <>
      <div className="hero min-h-[calc(100vh-15rem)] py-20 lg:py-0 sm:px-5 lg:px-20 xl:px-0">
        <div className="hero-content flex-col-reverse lg:flex-row-reverse">
          <div className="hero-img flex-1 flex justify-center items-center">
            <img
              src={hero}
              className="w-auto rounded-lg hover:scale-90 transition duration-300"
            />
          </div>
          <div className="flex-1 mb-10 lg:mb-0">
            <h1 className="text-5xl font-bold">
              Become fluent in Arabic With{" "}
              <span className="text-main">Yalla</span>
            </h1>

            <ul className="flex flex-col gap-5 py-8">
              <li className="flex items-center gap-2">
                <CheckIcon className="size-4 bg-main text-white rounded-sm " />
                <p>Start speaking Arabic with confidence in no time</p>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="size-4 bg-main text-white rounded-sm " />
                <p>
                  Gain confidence with expert guidance and real-world practice
                </p>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="size-4 bg-main text-white rounded-sm " />
                <p>
                  Find joy in learning with supportive and skilled instructors
                </p>
              </li>
            </ul>

            {!user && (
              <Link to={'/register'}>
                <button className="btn bg-main text-white rounded-md py-6 shadow-none border-none hover:bg-main-dark">
                  Sign up for your free trial now
              </button>
            </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
