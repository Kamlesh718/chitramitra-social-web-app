import { useState } from "react";
import { Link } from "react-router-dom";
import Heading from "../components/Heading";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import Logo from "../components/Logo";
import { useSignIn } from "../hooks/authentication/useSignIn";

function Login() {
  const { signin, isLoading } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = function () {
    setShowPassword(!showPassword);
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!email || !password) return;
    signin(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  };
  return (
    <div className=" flex items-center justify-center h-screen">
      <Logo />
      <div className="w-full max-w-md">
        <form className=" rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <Heading>Sign In</Heading>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="username">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-gray-700 "
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline text-gray-700 "
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <span className="inline-block" onClick={handlePasswordVisibility}>
              {showPassword ? (
                <EyeSlashIcon className="size-8" />
              ) : (
                <EyeIcon className="size-8" />
              )}
            </span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <button
              className="w-1/3 bg-[#1abc9c]"
              type="submit"
              disabled={isLoading}
            >
              Sign In
            </button>
          </div>
          <span>
            Doesn&apos;t have a account register here{" "}
            <Link
              to="/register"
              className="font-bold  text-blue-500 hover:text-blue-600"
            >
              Register
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
