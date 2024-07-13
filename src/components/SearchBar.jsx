import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import "../../src/index.css";
import { useQueryClient } from "@tanstack/react-query";

function SearchBar({ setSearch, search }) {
  const queryClient = useQueryClient();

  const handleSearch = (e) => {
    setSearch(e.target.value);

    queryClient.invalidateQueries(["following"]);
    queryClient.invalidateQueries(["follow-status"]);
  };
  return (
    <div className="flex items-center justify-items-center mb-8 mt-1 relative text-gray-700 search-bar">
      <input
        type="text"
        placeholder="User lookup"
        value={search}
        onChange={handleSearch}
        className="py-1 px-8 rounded-sm w-full shadow-lg cursor-text text-gray-700 focus:accent-[#1abc9c] focus:caret-[#1abc9c]"
      />
      <MagnifyingGlassIcon className="size-6 absolute text-gray-600 ml-1 " />
      <input
        type="submit"
        className="lg:hidden bg-[#1abc9c] py-2 px-3  rounded-md"
        value="Search"
        onSubmit={handleSearch}
      />
    </div>
  );
}

export default SearchBar;
