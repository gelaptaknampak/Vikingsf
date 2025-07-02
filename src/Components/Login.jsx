import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/Picture/LOGO VIKINGS 1.png";
import Tree from "../assets/Picture/Tree Celtic.png";
<<<<<<< HEAD

// BASE URL Backend Laravel
const BASE_URL = "https://backend-viking-project-production.up.railway.app";

// Buat instance axios khusus API
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

// Interceptor: ambil token dari cookie dan sisipkan ke header
api.interceptors.request.use((config) => {
  const getCookie = (name) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    if (match) return decodeURIComponent(match[2]);
  };

  const xsrfToken = getCookie("XSRF-TOKEN");

  console.log("[Axios] Interceptor running...");
  console.log("✅ XSRF-TOKEN from cookie:", xsrfToken);

  if (xsrfToken) {
    config.headers["X-XSRF-TOKEN"] = xsrfToken;
  }

  return config;
});
=======
>>>>>>> parent of 8aa0359 (csrf)

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
<<<<<<< HEAD
      console.log("🔄 Requesting CSRF cookie...");
=======
      const response = await api.post("/login", { username, password });
      const { token } = response.data;
      localStorage.setItem("token", token);
>>>>>>> parent of 8aa0359 (csrf)

      const csrfResponse = await api.get("/sanctum/csrf-cookie");
      console.log("✅ /sanctum/csrf-cookie success:", csrfResponse.status);

      const tokenInCookie = document.cookie.includes("XSRF-TOKEN");
      console.log("🧁 XSRF-TOKEN exists in document.cookie?", tokenInCookie);

      console.log("🔐 Sending login credentials...", { username, password });

      const loginResponse = await api.post("/login", { username, password });

      console.log("✅ Login successful:", loginResponse.status);

      const me = await api.get("/me");
      const { user, role } = me.data;

      setMessage(`Selamat datang, ${user.username}`);

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("❌ Login error:", error);

      if (error.response) {
        console.error("🔍 Response data:", error.response.data);
        console.error("🔍 Status:", error.response.status);
        console.error("🔍 Headers:", error.response.headers);
      }

      const errMsg =
        error.response?.data?.message ||
        error.message ||
        "Login gagal. Cek username/password.";
      setMessage(errMsg);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-black flex items-center justify-center overflow-x-hidden">
      <div className="border border-yellow-300 rounded-lg p-8 w-full max-w-md shadow-[0_0_15px_#facc15] flex flex-col items-center">
        <img src={Logo} alt="Vikings Logo" className="w-50 mb-6 mx-auto" />

        <div className="relative flex items-center justify-center w-full mb-4">
          <div className="w-full h-px bg-gray-400" />
          <img
            src={Tree}
            alt="Tree"
            className="absolute bg-black px-2"
            style={{ width: "40px" }}
          />
        </div>

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

          <a
            href="/forgot"
            className="no-underline text-[12px] cursor-pointer !text-yellow-500 text-left -mt-2"
          >
            FORGOT PASSWORD
          </a>

          <input
            type="text"
            placeholder="SERVER"
            className="bg-gray-300 text-black px-4 py-2 rounded outline-none"
          />

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

        <hr className="border-gray-600 w-full mt-6" />
      </div>
    </div>
  );
}
