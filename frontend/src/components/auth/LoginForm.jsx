import { LockKeyhole, Mail } from "lucide-react";
import { baseUrl } from "@/utils/api";
import googleIcon from "@/assets/svgs/google.svg";

export default function LoginForm({ onSubmit, error }) {
  return (
    <form
      className="flex flex-col w-[80%] ml-auto mr-auto "
      onSubmit={onSubmit}
    >
      <div className="relative mb-6">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <span className="w-4 h-4 text-gray-500 dark:text-gray-400">
            <Mail size={"1.2rem"} />
          </span>
        </div>
        <input
          id="username_or_email"
          type="email"
          name="username_or_email"
          className={`
            focus:outline-none 
            text-sm rounded-lg
            block w-full ps-10 p-2.5 
            border transition-all
            dark:border-[#686D76]
           ${error ? "border-red-500  bg-red-50 dark:bg-[#31363F] focus:ring-red-500  focus:border-red-500  text-red-900 dark:text-red-500  dark:placeholder-red-500 dark:border-red-500" : "bg-gray-50 border text-gray-900 border-gray-300  dark:bg-[#31363F] dark:placeholder-gray-400 dark:text-white "}
            `}
          placeholder="name@mail.com"
        />
      </div>
      <div className="relative mb-6">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <span className="w-4 h-4 text-gray-500 dark:text-gray-400">
            <LockKeyhole size={"1.2rem"} />
          </span>
        </div>
        <input
          id="password"
          type="password"
          name="password"
          className={`
            focus:outline-none 
            text-sm rounded-lg
            block w-full ps-10 p-2.5 
            border transition-all
            dark:border-[#686D76]
           ${error ? "border-red-500  bg-red-50 dark:bg-[#31363F] focus:ring-red-500  focus:border-red-500  text-red-900 dark:text-red-500  dark:placeholder-red-500 dark:border-red-500" : "bg-gray-50 border text-gray-900 border-gray-300  dark:bg-[#31363F] dark:placeholder-gray-400 dark:text-white "}
            `}
          placeholder="password"
        />
        {error && (
          <div
            className=" text-[12px]
          absolute text-red-800  -bottom-6
            dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{error}</span>
          </div>
        )}
      </div>
      <div className="flex mt-4 flex-col gap-4">
        <button className="btnPrimary py-2 px-4  mt-4 ">Sign In</button>
        <a
          className="flex items-center justify-center"
          href={`${baseUrl}/google/login`}
        >
          <img className="w-8" src={googleIcon} alt="" />
          <span className="ml-2">Sign in with Google</span>
        </a>
      </div>
    </form>
  );
}
