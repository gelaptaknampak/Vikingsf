import React, { useState, useEffect } from "react";
import { FaInstagram, FaTiktok, FaFacebook, FaDiscord } from "react-icons/fa";
import backg from "../assets/Picture/background.png";
import darkbackg from "../assets/Picture/background-dark.png";
import LOGO from "../assets/Picture/LOGO VIKINGS 1.png";
import Line from "../assets/Picture/Line Border.png";
import atas from "../assets/Picture/atas.png";
import news from "../assets/Picture/RF-Project-News.png";
import InfoLine from "../assets/Picture/Line-Info.png";
import profile from "../assets/Picture/profile.png";
import Cora from "../assets/Picture/Cora.png";
import Bellato from "../assets/Picture/Bellato.png";
import Accretia from "../assets/Picture/accretia.png";
import api from "../Components/api";

export default function Home() {
  const raceStats = [
    { icon: Cora, players: 100, kills: 0 },
    { icon: Accretia, players: 100, kills: 0 },
    { icon: Bellato, players: 100, kills: 0 },
  ];

  const players = [
    { name: "PLAYER1", faction: "Accretia", win: 400, lose: 350 },
    { name: "PLAYER2", faction: "Accretia", win: 400, lose: 350 },
    { name: "PLAYER3", faction: "Accretia", win: 400, lose: 350 },
    { name: "PLAYER4", faction: "Accretia", win: 400, lose: 350 },
    { name: "PLAYER5", faction: "Accretia", win: 400, lose: 350 },
  ];

  const Guilds = [
    { name: "GUILD1", faction: "Accretia", win: 400, lose: 350 },
    { name: "GUILD2", faction: "Accretia", win: 400, lose: 350 },
    { name: "GUILD3", faction: "Accretia", win: 400, lose: 350 },
    { name: "GUILD4", faction: "Accretia", win: 400, lose: 350 },
    { name: "GUILD5", faction: "Accretia", win: 400, lose: 350 },
  ];

  const Vips = [
    { name: "PLAYER1", faction: "Accretia", tier: "gold tier" },
    { name: "PLAYER2", faction: "Accretia", tier: "gold tier" },
    { name: "PLAYER3", faction: "Accretia", tier: "silver tier" },
    { name: "PLAYER4", faction: "Accretia", tier: "bronze tier" },
  ];

  const getTierColor = (tier) => {
    switch (tier.toLowerCase()) {
      case "gold tier":
        return "gold-tier";
      case "silver tier":
        return "silver-tier";
      case "bronze tier":
        return "bronze-tier";
      default:
        return "text-gray-300";
    }
  };

  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    api
      .get("/news")
      .then((res) => {
        console.log("Data dari /news:", res.data);
        setCarouselData(res.data.slice(0, 3));
      })
      .catch((err) => {
        console.error("Gagal mengambil data dari backend:", err);
      });
  }, []);

  const [current, setCurrent] = useState(0);
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const currentSlide = carouselData[current];

  return (
    <section className="h-full font-['Bebas_Neue']">
      <div className="bg-cover bg-no-repeat main-background-container">
        <div className="flex flex-col items-center justify-center mx-8">
          <img src={LOGO} alt="Logo" className="w-[25%] mt-12" />
          <img src={Line} alt="Line" className="w-full" />
        </div>

        <div className="flex flex-col gap-8 justify-between pt-12 w-full h-full px-16">
          <div className="flex flex-row gap-8">
            <div className="relative w-full overflow-hidden gold-border dark:blue-border">
              <div
                className="w-full h-full bg-cover transition-all duration-700"
                style={{ backgroundImage: `url(${currentSlide.image})` }}
              >
                <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent px-8 py-4 text-white text-left border-t border-[#FFC86E]/60">
                  <h2
                    className="text-3xl text-white"
                    style={{ WebkitTextStroke: "1px #FFC86E" }}
                  >
                    {currentSlide.title}
                  </h2>
                  <p className="text-lg">{currentSlide.description}</p>
                </div>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/30 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/30 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="w-[40%] flex flex-col gap-4 rounded-lg p-8 gold-border">
              <div className="text-center text-xl">
                <h2>SERVER INFO</h2>
              </div>
              <img src={InfoLine} alt="" />
              <div className="flex items-center justify-center px-8 space-x-4">
                <svg className="w-8 h-8 text-white" />
                <span className="text-green-400 font-bold text-lg">ONLINE</span>
              </div>
              <div className="flex items-center justify-center px-8 space-x-4">
                <svg className="w-8 h-8 text-white" />
                <span className="font-bold text-lg">300 PLAYERS</span>
              </div>
              <div className="space-y-4 px-6">
                {raceStats.map((race, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <img
                      src={race.icon}
                      alt={`Race ${i + 1}`}
                      className="w-12 h-12 object-cover border-2"
                    />
                    <div className="flex-1 flex justify-between items-center">
                      <span className="font-bold">{race.players} PLAYERS</span>
                      <span className="font-bold">
                        TOTAL KILL: {race.kills}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-8">
            {[
              { title: "TOP PLAYER", data: players },
              { title: "TOP GUILD", data: Guilds },
              { title: "VIP", data: Vips },
            ].map((section, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-4 w-1/3 p-8 gold-border"
              >
                <div className="text-center text-xl">
                  <h2>{section.title}</h2>
                </div>
                <img src={InfoLine} alt="" />
                <div className="flex flex-col gap-4 px-8">
                  {section.data.map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="flex gap-4 items-center">
                        <img src={profile} alt="" />
                        <div className="flex flex-col">
                          <h2 className="text-xl">{item.name}</h2>
                          <h3 className="text-lg">{item.faction}</h3>
                        </div>
                      </div>
                      {section.title === "VIP" ? (
                        <div className={`text-xl ${getTierColor(item.tier)}`}>
                          {item.tier.toUpperCase()}
                        </div>
                      ) : (
                        <div className="text-xl">
                          <span className="text-green-400">{item.win}</span>
                          <span className="text-white"> | </span>
                          <span className="text-red-500">{item.lose}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="items-center justify-center pb-4">
            <img src={Line} alt="Line" className="w-full" />
            <div className="flex justify-center items-center gap-2">
              <a
                href="https://www.instagram.com/rfvikings"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="https://tiktok.com/@rfvikings"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition"
              >
                <FaTiktok />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61562554693454"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition"
              >
                <FaFacebook />
              </a>
              <a
                href="https://discord.gg/rfvikings"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400 transition"
              >
                <FaDiscord />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
