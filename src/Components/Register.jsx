import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Picture/LOGO VIKINGS 1.png";
import Tree from "../assets/Picture/Tree Celtic.png";
import api from "./api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [PIN, setPIN] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const passwordValidation = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,12}$/;

    return regex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!passwordValidation(password)) {
      setMessage("Unvalid password");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Confirm password unmatched");
      return;
    }

    if (PIN.length !== 6 || isNaN(PIN)) {
      setMessage("PIN must be a 6-digit number");
      return;
    }

    try {
      const response = await api.post("/register", {
        username,
        email,
        password,
        password_confirmation: confirmPassword,
        PIN,
      });
      const { token, user } = response.data;
      setMessage("Register Successful! Please login.");
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      if (error.response?.data?.errors) {
        const firstError = Object.values(error.response.data.errors)[0][0];
        setMessage(firstError);
      } else {
        setMessage("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen w-screen bg-black flex items-center justify-center overflow-x-hidden">
      {/* Container dengan border glowing yang membungkus SEMUA */}
      <div className="border border-yellow-300 rounded-lg p-6 w-full max-w-md shadow-[0_0_15px_#facc15] flex flex-col items-center">
        {/* Logo Vikings DI DALAM border glowing */}
        <img src={Logo} alt="Vikings Logo" className="w-50 mb-4" />

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
        <h2 className="text-white text-center font-bold text-md mb-4">
          WELCOME TO THE USER REGISTRATION PAGE.
        </h2>
        {message && <p className="text-white text-sm mb-4">{message}</p>}

        <form onSubmit={handleRegister} className="flex flex-col gap-3 w-full">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="bg-gray-300 text-black font-bold px-4 py-2 rounded text-center"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="bg-gray-300 text-black font-bold px-4 py-2 rounded text-center"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="bg-gray-300 text-black font-bold px-4 py-2 rounded text-center"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
            className="bg-gray-300 text-black font-bold px-4 py-2 rounded text-center"
          />

          <div className="text-white text-[12px] mt-2">
            <span className="font-bold">PASSWORD MUST CONTAIN:</span>
            <ul className="list-disc ml-4 mt-1 text-[11px]">
              <li>At least 1 uppercase letter</li>
              <li>At least 1 lowercase letter</li>
              <li>At least 1 number</li>
              <li>
                At least 1 special character{" "}
                <span className="text-yellow-400">!@#$%^&amp;*</span>
              </li>
              <li>Characters between 8 and 12</li>
            </ul>
          </div>

          <input
            type="number"
            value={PIN}
            onChange={(e) => setPIN(e.target.value)}
            placeholder="CREATE PIN (6 digits)"
            required
            className="bg-gray-300 text-black font-bold px-4 py-2 rounded text-center mt-2"
          />

          {/* Divider bawah */}
          <div className="relative flex items-center justify-center mt-6 mb-4 w-full">
            <div className="w-full h-px bg-gray-400" />
            <img
              src={Tree}
              alt="Tree Icon"
              className="absolute bg-black px-2"
              style={{ width: "40px" }}
            />
          </div>

          <p className="text-center text-[10px] text-white">
            BY CREATING AN ACCOUNT YOU AGREE TO OUR{" "}
            <span className="text-yellow-400 underline">TERMS OF SERVICE</span>
          </p>

          {/* Buttons */}
          <div className="flex justify-between gap-4 mt-4 w-full">
            <button
              type="submit"
              className="flex-1 !bg-[#FEC567] !hover:bg-[#f5b640] !text-black font-bold py-2 rounded shadow-md"
            >
              REGISTER
            </button>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="flex-1 !bg-white !hover:bg-gray-100 !text-black font-bold py-2 rounded shadow-md"
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
