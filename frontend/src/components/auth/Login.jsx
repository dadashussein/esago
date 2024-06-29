import useUserAuth from "@/hooks/useUserAuth";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

export default function Login() {
  const { error, handleLogin, isLoading } = useUserAuth();
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    handleLogin(data);
  };

  return (
    <section
      className=" bg-landing-texture flex items-center justify-center bg-no-repeat
    relative w-full h-screen  "
    >
      <div
        className="justify-center gap-8 flex items-center p-8 rounded border bg-white/75 *:
      dark:bg-black/50
      "
      >
        <div
          className="bg-primary-300 h-[600px] gap-24 hidden  md:flex flex-col rounded
      justify-center items-center max-w-[500px]
      dark:bg-primary-400 dark:text-white
      "
        >
          <div className="text-[35px] text-center">
            <h1>Esago is your primary CV and Resume maker</h1>
          </div>
          <div className="bg-primary-100 flex h-[212px] rounded-lg  dark:bg-darkPrimary-800">
            <div
              className="flex flex-col items-center w-[200px]   border-r-2 border-gray-300
        dark:border-gray-500 
        justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-14 dark:text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                />
              </svg>

              <h1>A lot of templates</h1>
            </div>
            <div className="flex flex-col items-center w-[200px] justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-14 dark:text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <h1>Filter any resume</h1>
            </div>
          </div>
        </div>
        <div className=" flex flex-col items-center justify-center  h-[600px] max-w-[500px] text-gray-600  space-y-8">
          <div className="text-center">
            <div className=" space-y-2">
              <h3 className="text-gray-800 dark:text-white text-2xl font-bold sm:text-3xl">
                Welcome again to Esago CV and resume maker platform&apos;s
              </h3>
              <p className="text-gray-800 dark:text-white">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary-500 hover:text-indigo-500"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
          <LoginForm onSubmit={onSubmit} error={error} isLoading={isLoading} />
        </div>
      </div>
    </section>
  );
}
