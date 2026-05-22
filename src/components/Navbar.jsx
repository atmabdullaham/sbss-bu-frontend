import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Logo from "./Logo";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogout = () => {
    logOut().then(() => {
      toast.success("Logged out");
    });
  };

  const navOptions = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
                ? "text-[#000000] border-[#ffffff] font-bold animated-border"
                : "hover:text-[#000000]"
          }
        >
          হোম
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/programmes"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
                ? "text-[#000000] border-[#ff1e1e] font-bold animated-border" /* Apply the animated-border class when active */
                : "hover:text-[#000000]"
          }
        >
          প্রোগ্রামসমূহ
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/registration-success"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
                ? "text-[#000000] border-[#ff1e1e] font-bold animated-border" /* Apply the animated-border class when active */
                : "hover:text-[#000000]"
          }
        >
          আমার রেজিস্ট্রেশন
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/about"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
                ? "text-[#000000] border-[#ff1e1e] font-bold animated-border" /* Apply the animated-border class when active */
                : "hover:text-[#000000]"
          }
        >
          পরিচিতি
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/contact"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
                ? "text-[#000000] border-[#ff1e1e] font-bold animated-border" /* Apply the animated-border class when active */
                : "hover:text-[#000000]"
          }
        >
          যোগাযোগ
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navOptions}
          </ul>
        </div>
        <Link
          to={"/"}
          className="btn btn-ghost bg-transparent hover:border-0 border-0 text-xl"
        >
          <Logo />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>
      <div className="navbar-end">
        <NavLink
          className="btn btn-sm rounded-full text-black mr-2 bg-white shadow-inner"
          to="/registration"
        >
          রেজিস্ট্রেশন
        </NavLink>
        {!user && (
          <ul>
            {" "}
            <li>
              <Link
                className="btn btn-sm bg-green-500 hover:bg-green-600 text-white font-semibold py-1.5 px-4 rounded-full"
                to="/login"
              >
                লগইন
              </Link>
            </li>
          </ul>
        )}
        {user && (
          <div>
            <div className="dropdown dropdown-end z-50">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div title={user?.displayName} className="w-10 rounded-full">
                  <img
                    referrerPolicy="no-referrer"
                    alt="User Profile Photo"
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="card shadow-purple-200/50 rounded-md menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-green-50 rounded-box w-72"
              >
                <div className="px-4 py-4 border-b border-gray-200 bg-gradient-to-r from-[#0AA76B] to-green-600 rounded-lg rounded-b-none">
                  <p className="text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Signed in as
                  </p>
                  <div className="flex items-center mt-1">
                    <div className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center mr-2">
                      <img
                        className="rounded-full"
                        src={user?.photoURL}
                        alt=""
                      />
                    </div>
                    <p className="text-sm font-medium text-white truncate hover:after:w-full relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#2b6cb0] after:transition-all after:duration-300">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <h2 className="px-4 text-lg font-semibold text-gray-600 text-center block pt-2">
                  {user?.displayName}
                </h2>
                <li className="mt-2">
                  <Link
                    to="/profile"
                    className="group relative flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-all duration-200"
                  >
                    <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-y-100 scale-y-80"></div>
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors duration-200">
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className="h-5 w-5 text-blue-600 group-hover:text-[#2b6cb0]"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clipRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-[#1a365d]">
                      Profile
                    </span>
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      className="h-3 w-3 text-gray-400 ml-auto group-hover:text-[#2b6cb0]"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="group relative flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 transition-all duration-200"
                  >
                    <div className="absolute left-0 top-0 h-full w-1 bg-red-500 rounded-r opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-y-100 scale-y-80"></div>
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center mr-3 group-hover:bg-red-200 transition-colors duration-200">
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className="h-5 w-5 text-red-500 group-hover:text-red-600"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clipRule="evenodd"
                          d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-red-600">
                      Logout
                    </span>
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      className="h-3 w-3 text-gray-400 ml-auto group-hover:text-red-500"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
