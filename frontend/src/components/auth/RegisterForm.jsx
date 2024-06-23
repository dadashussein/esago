import { LockKeyhole, Mail, User } from "lucide-react";

export default function RegisterForm({ onSubmit, error }) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col w-[80%] ml-auto mr-auto "
    >
      <div className="relative mb-6 ">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <span className="w-4 h-4 text-gray-500 dark:text-gray-400">
            <User size={"1.2rem"} />
          </span>
        </div>
        <input
          type="text"
          id="username"
          name="username"
          className={`
          focus:outline-none 
          text-sm rounded-lg
          block w-full ps-10 p-2.5 
          border transition-all
          dark:border-[#686D76]
         ${error ? "border-red-500 bg-red-50 dark:bg-[#31363F] focus:ring-red-500  focus:border-red-500  text-red-900 dark:text-red-500  dark:placeholder-red-500 dark:border-red-500" : "bg-gray-50 border text-gray-900 border-gray-300  dark:bg-[#31363F] dark:placeholder-gray-400 dark:text-white "}
          `}
          placeholder="elonmusk"
        />
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <span className="w-4 h-4 text-gray-500 dark:text-gray-400">
            <Mail size={"1.2rem"} />
          </span>
        </div>
        <input
          id="email"
          type="email"
          name="email"
          className={`
          focus:outline-none 
          text-sm rounded-lg
          block w-full ps-10 p-2.5 
          border transition-all
          dark:border-[#686D76]
         ${error ? "border-red-500 bg-red-50 dark:bg-[#31363F] focus:ring-red-500  focus:border-red-500  text-red-900 dark:text-red-500  dark:placeholder-red-500 dark:border-red-500" : "bg-gray-50 border text-gray-900 border-gray-300  dark:bg-[#31363F] dark:placeholder-gray-400 dark:text-white "}
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
         ${error ? "border-red-500 bg-red-50 dark:bg-[#31363F] focus:ring-red-500  focus:border-red-500  text-red-900 dark:text-red-500  dark:placeholder-red-500 dark:border-red-500" : "bg-gray-50 border text-gray-900 border-gray-300  dark:bg-[#31363F] dark:placeholder-gray-400 dark:text-white "}
          `}
          placeholder="password"
        />
        {error && (
          <div
            className="text-[12px] absolute text-red-800 -bottom-6 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{error}</span>
          </div>
        )}
      </div>
      <button className="btnPrimary py-2 px-4 mt-8">Create account</button>
    </form>
  );
}
