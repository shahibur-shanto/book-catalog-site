/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react";
import logo from "../assets/logo/logo.jpg";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useForm } from "react-hook-form";
import { setUser } from "../redux/features/user/userSlice";

export default function Navbar() {
  const [toggle, setToggle] = useState(false);
  const [input, setInput] = useState("");

  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  interface SigninFormInputs {
    email: string;
  }

  const { handleSubmit } = useForm<SigninFormInputs>();

  const dispatch = useAppDispatch();
  const handleSearch = (search: any) => {
    search = input;
    navigate(`/search/${search}`);
  };

  const handleFilter = () => {
    const queryParams = [];

    if (selectedGenre) {
      queryParams.push(`genre=${selectedGenre}`);
    }

    if (selectedYear) {
      queryParams.push(`year=${selectedYear}`);
    }

    const query = queryParams.join("&");
    console.log("Query:", query);
    navigate(`/filter?${query}`);
  };

  const handleLogOut = async () => {
    await signOut(auth).then(() => {
      navigate("/");
      dispatch(setUser(null));
    });
  };
  return (
    <>
      <header>
        <nav className="bg-yellow-800 w-full">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-10 w-auto rounded-full"
                    src={logo}
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <a
                      href="/"
                      className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                      aria-current="page"
                    >
                      Home
                    </a>
                    <a
                      href="/allbooks"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    >
                      All Books
                    </a>
                    {!user.email && (
                      <>
                        <a
                          href="/login"
                          className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        >
                          Sign In
                        </a>
                        <Link
                          to="/signup"
                          className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                    {user.email && (
                      <>
                        <form onSubmit={handleSubmit(handleLogOut)} action="/">
                          <button
                            type="submit"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                          >
                            Logout
                          </button>
                          <Link
                            to="/addNewBook"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                          >
                            Add New Books
                          </Link>
                        </form>
                      </>
                    )}
                    <div className="relative  w-96">
                      <div className="absoluteinset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
                      <input
                        onChange={(e) => setInput(e.target.value)}
                        type="search"
                        id="default-search"
                        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search title, author, or genre..."
                        required
                      />
                      <form onSubmit={handleSubmit(handleSearch)} action="/">
                        <button
                          type="submit"
                          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Search
                        </button>
                      </form>
                    </div>
                    <div className="relative inline-block text-left">
                      <form onSubmit={handleSubmit(handleFilter)} action="/">
                        <div>
                          <button
                            onClick={() => setToggle(!toggle)}
                            type="button"
                            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            id="menu-button"
                            aria-expanded="true"
                            aria-haspopup="true"
                          >
                            Filters
                          </button>
                        </div>
                        {toggle && (
                          <div
                            className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                          >
                            <div className="py-1" role="none">
                              <div className="px-4 py-2">
                                <label
                                  htmlFor="genre"
                                  className="text-gray-700"
                                >
                                  Genre:
                                </label>
                                <select
                                  id="genre"
                                  className="w-full mt-1 form-select"
                                  onChange={(e) =>
                                    setSelectedGenre(e.target.value)
                                  }
                                >
                                  <option value="">All Genres</option>
                                  <option value="Fantasy">Fantasy</option>
                                  <option value="Classic">Classic</option>
                                  {/* Add more genre options */}
                                </select>
                              </div>
                              <div className="px-4 py-2">
                                <label htmlFor="year" className="text-gray-700">
                                  Publication Year:
                                </label>
                                <select
                                  id="year"
                                  className="w-full mt-1 form-select"
                                  onChange={(e) =>
                                    setSelectedYear(e.target.value)
                                  }
                                >
                                  <option value="">All Years</option>
                                  <option value="2023">2023</option>
                                  <option value="2022">2022</option>
                                  {/* Add more year options */}
                                </select>
                              </div>
                            </div>
                            <button
                              type="submit"
                              onClick={handleFilter}
                              className="block w-full px-4 py-2 text-sm text-center text-white bg-blue-700 hover:bg-blue-800"
                              role="menuitem"
                            >
                              Apply Filters
                            </button>
                          </div>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"></div>
              <p>{user.email}</p>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
