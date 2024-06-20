import { Login } from "./Login";
import flashlight from "../../assets/flashlight.png";
import { Register } from "./Register";
import { useState } from "react";

export const Auth = () => {
  const [loginToggle, setLoginToggle] = useState(true);

  return (
    <div className="lg:flex mt-12 md:mt-24">
      <div className="flex items-center justify-center h-full w-full">
        <div className="flex flex-col w-full md:w-6/12 mx-4">
          <div className="flex flex-col">
            {loginToggle ? (
              <>
                <div className="text-red-500 text-3xl font-bold">
                  Welcome back! 😄
                </div>
                <div className="text-slate-800 text-sm font-bold">
                  We're glad to see you
                </div>
              </>
            ) : (
              <>
                <div className="text-red-500 text-3xl font-bold">
                  Welcome to
                </div>
                <div className="text-slate-800 text-3xl font-bold">
                  Quest Manager!
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col w-full">
            <div className={`flex ${loginToggle ? "mt-28" : "mt-10"}`}>
              <button
                className={`bg-white ${
                  !loginToggle && "text-slate-500"
                } border-none w-1/2 flex flex-col justify-center`}
                onClick={() => setLoginToggle(true)}
              >
                <div className="font-bold">Login</div>
                <hr
                  className={`w-full ${!loginToggle && "border-slate-200"}`}
                />
              </button>
              <button
                className={`bg-white ${
                  loginToggle && "text-slate-500"
                } border-none w-1/2 flex flex-col justify-center`}
                onClick={() => setLoginToggle(false)}
              >
                <div className="font-bold">Register</div>
                <hr className={`w-full ${loginToggle && "border-slate-200"}`} />
              </button>
            </div>
            {loginToggle ? <Login /> : <Register />}
          </div>
        </div>
      </div>
      <div className="max-lg:hidden w-full">
        <img src={flashlight} alt="man holding flashlight" className="w-full" />
      </div>
    </div>
  );
};
