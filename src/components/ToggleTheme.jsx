import { useTheme } from "../Context/ThemeContext";
import sun from "../assets/sun.svg";
import moon from "../assets/moon.svg";
function ToggleTheme() {
  const { theme, toggleTheme } = useTheme();
  const themeIcon = theme === "light" ? sun : moon;
  return (
    <img
      className="w-8 h-8 hover:cursor-pointer"
      src={themeIcon}
      alt="Color mode icon"
      onClick={toggleTheme}
    />
  );
}

export default ToggleTheme;
