import Heading from "../components/Heading";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import Logo from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useSignUp } from "../hooks/authentication/useSignUp";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useSignUp();

  const navigate = useNavigate();

  const handlePasswordVisibility = function () {
    setShowPassword(!showPassword);
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    const formData = {
      username,
      email,
      password,
      profileImage,
      fullName,
    };
    signup(formData, {
      onSettled: () => {
        navigate("/login");
        setUsername("");
        setPassword("");
        setEmail("");
        setProfileImage("");
      },
      onError: (err) => {
        navigate("/register");
        alert(err);
      },
    });
  };

  return (
    <div className=" flex items-center justify-center h-screen">
      <Logo />
      <div className="w-full max-w-md">
        <form className=" px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <Heading>Register</Heading>
          <div className="mb-4">
            <label className="block  text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <label className="block  text-sm font-bold mb-2" htmlFor="username">
              Fullname
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullname"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Fullname"
            />
          </div>
          <div className="mb-4">
            <label className="block  text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <span className="inline-block" onClick={handlePasswordVisibility}>
              {showPassword ? (
                <EyeSlashIcon className="size-8" />
              ) : (
                <EyeIcon className="size-8" />
              )}
            </span>
          </div>
          <div className="mb-4">
            <label
              className="block  text-sm font-bold mb-2"
              htmlFor="profile-picture"
            >
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => setProfileImage(e.target.files[0])}
              className="block w-full text-sm text-[#1abc9c]
        file:mr-4 file:py-2 file:px-4 
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-gray-100 file:text-[#1abc9c]
        font-semibold cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <button className="w-1/3 bg-[#1abc9c]" type="submit">
              Register
            </button>
          </div>
          <span>
            Already have a account login here{" "}
            <Link
              to="/login"
              className="font-bold  text-blue-500 hover:text-blue-600"
            >
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Register;
