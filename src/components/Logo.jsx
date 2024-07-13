import LogoImage from "../assets/6.png";
import DarkLogoImage from "../assets/8.png";

function Logo() {
  const theme = localStorage.getItem("theme");
  return (
    <div className="lg:flex flex-col relative hidden">
      <img src={theme === "dark" ? DarkLogoImage : LogoImage} alt="logo" />
      <div className="text-xl mb-4">🚀✨</div>
      <span className="text-[#1abc9c] text-4xl font-bold mb-2">
        Welcome to Chitramitra!
      </span>
      <p className=" text-lg mb-4">
        Connecting you to the world, one chat at a time. 🌍
      </p>
    </div>
  );
}

export default Logo;
