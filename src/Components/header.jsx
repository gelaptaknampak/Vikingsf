import React, { useState, useEffect, useRef } from "react";
import SwitchMode from "./switchMode";
import line from "../assets/Picture/Line-header.png";
import api from "./api";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [username, setUsername] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [gameInfoOpen, setGameInfoOpen] = useState(false);
  const [role, setRole] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      api
        .get("/me")
        .then((res) => {
          // console.log("User data:", res.data);
          setUsername(res.data.user?.username || null);
          const roleName = res.data.role?.toLowerCase() || null;

          if (roleName === "admin") {
            setRole("admin");
            // console.log("Role is admin");
          } else if (roleName === "user") {
            setRole("user");
            // console.log("Role is user");
          } else {
            setRole(null);
            console.log("Role not found");
          }
        })
        .catch((err) => {
          console.error("Error fetching /me:", err);
          setUsername(null);
          setRole(null);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <header
      className={`w-full p-4 px-8 fixed top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black shadow-md" : "bg-black/50"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <SwitchMode />

        {/* Navigation Menu */}
        <nav className="flex flex-row space-x-4 font-bold font-white font-['Bebas_Neue']">
          <a href="/" className="hover:underline text-white">
            HOME
          </a>
          <a href="/news" className="hover:underline text-white">
            NEWS
          </a>

          {/* Game Info Dropdown */}
          <div className="relative group">
            <span
              className="hover:text-yellow-400 text-white"
              onClick={() => setGameInfoOpen(!gameInfoOpen)}
            >
              Game Info
            </span>
            {gameInfoOpen && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-36 bg-black/50 text-white mt-4 shadow-lg z-50">
                <a
                  href="/gameinfo/server"
                  className="block px-4 py-2 hover:bg-yellow-600/20"
                  onClick={() => setGameInfoOpen(false)}
                >
                  Server Information
                </a>
                <a
                  href="/gameinfo/quest"
                  className="block px-4 py-2 hover:bg-yellow-600/20"
                  onClick={() => setGameInfoOpen(false)}
                >
                  Quest Information
                </a>
                <a
                  href="/gameinfo/map"
                  className="block px-4 py-2 hover:bg-yellow-600/20"
                  onClick={() => setGameInfoOpen(false)}
                >
                  Map Information
                </a>
                <img src={line} className="w-full px-4" alt="line" />
                <a
                  href="/gameinfo/rules"
                  className="block px-4 py-2 hover:bg-yellow-600/20"
                  onClick={() => setGameInfoOpen(false)}
                >
                  Server Rules
                </a>
              </div>
            )}
          </div>

          <a href="/download" className="hover:underline text-white">
            DOWNLOAD
          </a>
          <a href="/donation" className="hover:underline text-white">
            DONATION
          </a>
          {role === "admin" && (
            <a href="/Admin" className="hover:underline text-white">
              ADMIN
            </a>
          )}
        </nav>

        {/* Login / Username */}
        <div
          ref={dropdownRef}
          className="relative text-white font-['Bebas_Neue']"
        >
          {username ? (
            <div>
              <span
                onClick={() => setShowDropdown(!showDropdown)}
                className="cursor-pointer"
              >
                Halo, {username}
              </span>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow-lg z-50">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white font-bold"
                  >
                    LOGOUT
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a href="/login" className="hover:underline">
              LOGIN / REGISTER
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
