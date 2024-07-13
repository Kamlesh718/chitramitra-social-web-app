import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl mt-4">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className="mt-6 px-4 py-2 ">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
