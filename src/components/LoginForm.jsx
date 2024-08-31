
const LoginForm = ({
  submitProps,
  emailProps,
  passwordProps,
  heading,
  SignOrLog1,
  link,
  SignOrLog2,
  SignOrLog3,
}) => {

  return (
    <>
      <div className="mb-[-150px] flex h-screen flex-col items-center justify-center bg-[#e8e8e8]">
        <div className="mb-44 w-full max-w-md rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            {heading}
          </h2>

          <form className="flex flex-col" onSubmit={submitProps}>
            <input
              type="email"
              name="email" //!!! Pour lier la valeur de l'input à la key: email
              className="mb-4 rounded-md border-0 bg-gray-100 p-2 text-gray-900 transition duration-150 ease-in-out focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Email address"
              onChange={emailProps}
              required
            />
            <input
              type="password"
              name="password"
              className="mb-4 rounded-md border-0 bg-gray-100 p-2 text-gray-900 transition duration-150 ease-in-out focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Password"
              onChange={passwordProps}
              required
            />
            <div className="flex flex-wrap items-center justify-between">
              <label
                htmlFor="remember-me" // on donne le même nom que id, pour que le nom "Remember me" soit cliquable
                className="cursor-pointer text-sm text-gray-900"
              >
                <input type="checkbox" id="remember-me" className="mr-2" />
                Remember me
              </label>
              <a
                href="#"
                className="mb-0.5 text-sm text-blue-500 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <p className="text-md mt-8 text-gray-900">
              {SignOrLog1}
              <a
                href= {link}
                className=" text-md ml-5 text-blue-500 hover:underline"
              >
                {SignOrLog2}
              </a>
            </p>
            <button
              type="submit"
              className="mt-8 rounded-md bg-gradient-to-r from-indigo-500 to-blue-500 px-4 py-2 font-bold text-white transition duration-150 ease-in-out hover:bg-indigo-600 hover:to-blue-600"
            >
              {SignOrLog3}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
