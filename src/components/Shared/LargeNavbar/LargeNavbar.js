import React, { useContext, useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineReload } from "react-icons/ai";
import { BiChat, BiLogIn } from "react-icons/bi";
import { BsBell, BsFilterLeft, BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider";
import SearchQuery from "../../Modals/SearchQuery/SearchQuery";

const LargeNavbar = () => {
  const { user, logUser, logOut } = useContext(AuthContext);

  const navigate = useNavigate();

  //! Logout
  const handleLogOut = () => {
    logOut();
    navigate("/login");
    toast.error("Log out Successful");
  };

  //! Refresh page
  // function refreshPage() {
  //   window.location.reload(false);
  // }

  //! Search Button
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(true);
  };

  const [hasSearched, setHasSearched] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5001/all-users`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .finally(() => {});
  }, []);



  //! Data Query
  function handleFilter(event) {
    const query = event.target.value.toLowerCase();
    if (query.trim() === '') {
      setFilteredData([]);
      setHasSearched(false);
    } else {
      const filtered = data?.filter((item) => {
        return (
          item?.name?.toLowerCase().includes(query) ||
          item?.phoneNumber?.toLowerCase().includes(query) ||
          item?.email?.toLowerCase().includes(query)
        );
      });
      setFilteredData(filtered);
      setHasSearched(true);
    }
  }




  return (
    <div className="navbar bg-blue-700 text-white">
      {/* Left side  */}
      {/* <div className="navbar-start">
        <div className="dropdown  opacity-75 hover:opacity-100">
          <label
            title="Click"
            tabIndex={0}
            className="btn btn-ghost btn-circle"
          >
            <BsFilterLeft className="text-4xl" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-[#EEEEEE] rounded-box w-52"
          >
            <li className="text-gray-700 hover:text-red-500">
              <Link to="/home">Homepage</Link>
            </li>
            <li className="text-gray-700 hover:text-red-500">
              <a target={"_blank"} href="https://mdhasan-portfolio.vercel.app/">
                Portfolio
              </a>
            </li>
            <li className="text-gray-700 hover:text-red-500">
              <Link to="/others/about-us">About</Link>
            </li>
          </ul>
        </div>
        <button
          title="Click to reload!"
          onClick={refreshPage}
          className="mx-5 text-2xl opacity-75 hover:opacity-100"
        >
          <AiOutlineReload />
        </button>
        <Link
          to="/home"
          title="Home"
          className="mx-5 text-2xl opacity-75 hover:opacity-100"
        >
          <AiOutlineHome />
        </Link>
      </div> */}

      {/* Logo */}
      <div className="navbar-start">
        <img
          className="w-[45px] ml-2"
          src="https://res.cloudinary.com/demfyxr7o/image/upload/v1719756409/Screenshot_2024-06-30_200057-removebg-preview_sb6rob.png"
          alt="logo"
        />
      </div>

      <Link title="Home" to="/" className="navbar-center flex ">
        <a className="text-2xl hover:cursor-pointer hover:text-white text-slate-300 uppercase ">
          Thrill
        </a>
      </Link>

      {/* Search Bar */}
      <div className="navbar-end">
        {!expanded ? (
          <button
            title="Click to search"
            onClick={handleExpand}
            className="btn btn-ghost btn-circle opacity-75 hover:opacity-100"
          >
            <BsSearch className="text-2xl" />
          </button>
        ) : (
          <div className="relative flex flex-col items-center">
          <div className="flex items-center border bg-slate-200 rounded-lg">
            <input
              type="text"
              className="flex-grow p-2 rounded-l-full focus:outline-none bg-slate-100 text-gray-900 border border-0"
              placeholder="Search..."
              onChange={handleFilter}
            />
            <button
              title="Search"
              className="w-12 flex justify-center bg-slate-200 hover:text-gray-900 hover:scale-95 duration-300 opacity-75 hover:opacity-100"
            >
              <BsSearch className="text-2xl" />
            </button>
          </div>
        {hasSearched && filteredData.length === 0 && (
                <div className="absolute mt-10 w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <p className="p-2 text-gray-900">No results found.</p>
                </div>
              )}

              {hasSearched && filteredData.length > 0 && (
                <div className="absolute mt-10 w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <ul className="divide-y divide-gray-200">
                    {filteredData.map((item) => (
                      <Link to={`/others/${item?.email}`} key={item.id} className="cursor-pointer hover:bg-gray-100 p-2 flex space-x-2">
                      <img src={item?.image} className="w-8 h-8 rounded-full" />
                      <p className="text-gray-900">{item?.name}</p>
                    </Link>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        )}



        <Link
          to="/others/notifications"
          title="Notification"
          className="btn btn-ghost btn-circle opacity-75 hover:opacity-100"
        >
          <div className="indicator">
            <BsBell className="text-2xl" />
            {/* <span className="badge badge-xs badge-white indicator-item"></span> */}
          </div>
        </Link>
        <Link title="Chat" to="/others/chat">
          <a
            rel="noopener noreferrer"
            href="#"
            className="flex items-center p-2 space-x-3 rounded-md hover:text-red-500 opacity-75 hover:opacity-100"
          >
            <BiChat className="text-2xl" />
          </a>
        </Link>
        {/* Log out */}
        <a
          onClick={handleLogOut}
          rel="noopener noreferrer"
          href="#"
          title="Log out"
          className="flex items-center p-2 space-x-3 rounded-md hover:text-red-500 opacity-75 hover:opacity-100"
        >
          <BiLogIn className="text-2xl" />
        </a>
      </div>
    </div>
  );
};

export default LargeNavbar;
