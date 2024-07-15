import { useEffect, useState } from "react";
import { useUsername } from "../hooks/profile/useUsername";

const Slogan = () => {
  const { username } = useUsername();
  const [showSlogan, setShowSlogan] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSlogan(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center h-full py-10 animate-fadeIn ${
        showSlogan ? "" : "hidden"
      }`}
    >
      <div className="text-6xl mb-4 animate-bounce">🎉🚀</div>
      <span className="text-[#1abc9c] text-4xl font-bold mb-2 text-center">
        Welcome to Chitramitra! {username?.username}
      </span>
      <p className="text-lg mb-4 text-center">
        Join the adventure, connect with friends, and make memories that last
        forever! 🌟
      </p>
    </div>
  );
};

export default Slogan;
