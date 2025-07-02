import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";
import Logo from "../assets/Picture/LOGO VIKINGS 1.png";
import Tree from "../assets/Picture/Tree Celtic.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await api.post("/login", { username, password });
      const { token } = response.data;
      localStorage.setItem("token", token);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const makeResponse = await api.get("/me");
      const { user, role } = makeResponse.data;

      if (role === "admin") {
        navigate("/");
      } else if (role === "user") {
        navigate("/");
      }

      setMessage(`Selamat datang, ${user.username}`);
    } catch (error) {
      const errMsg =
        error.response?.data?.message ||
        error.message ||
        "Login gagal. Cek username/password.";
      setMessage(errMsg);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-black flex items-center justify-center overflow-x-hidden">
      {/* Bungkus dengan border */}
      <div className="border border-yellow-300 rounded-lg p-8 w-full max-w-md shadow-[0_0_15px_#facc15] flex flex-col items-center">
        {/* Logo */}
        <img src={Logo} alt="Vikings Logo" className="w-50 mb-6 mx-auto" />

        {/* Divider dengan Tree */}
        <div className="relative flex items-center justify-center w-full mb-4">
          <div className="w-full h-px bg-gray-400" />
          <img
            src={Tree}
            alt="Tree"
            className="absolute bg-black px-2"
            style={{ width: "40px" }}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
          <h2 className="text-white text-xl font-bold text-center mb-2">
            WELCOME BACK
          </h2>

          {message && (
            <p className="text-white text-sm text-center">{message}</p>
          )}

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="USERNAME"
            className="bg-gray-300 text-black px-4 py-2 rounded outline-none"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="PASSWORD"
            className="bg-gray-300 text-black px-4 py-2 rounded outline-none"
            required
          />

          {/* Forgot Password */}
          <a
            href="/forgot"
            className="no-underline text-[12px] cursor-pointer !text-yellow-500 text-left -mt-2"
          >
            FORGOT PASSWORD
          </a>

          {/* Server input (dummy placeholder) */}
          <input
            type="text"
            placeholder="SERVER"
            className="bg-gray-300 text-black px-4 py-2 rounded outline-none"
          />

          {/* Tombol */}
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="flex-1 !bg-[#FEC567] !hover:bg-[#f5b640] !text-black font-bold py-2 rounded shadow-md"
            >
              LOGIN
            </button>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="flex-1 !bg-white !hover:bg-gray-100 !text-black font-bold py-2 rounded shadow-md"
            >
              REGISTER
            </button>
          </div>
        </form>

        {/* Garis bawah */}
        <hr className="border-gray-600 w-full mt-6" />
      </div>
    </div>
  );
}
