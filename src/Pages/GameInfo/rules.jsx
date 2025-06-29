import React, { useEffect, useState } from "react";
import { FaInstagram, FaTiktok, FaFacebook, FaDiscord } from "react-icons/fa";
import LOGO from "../../assets/Picture/LOGO VIKINGS 1.png";
import Line from "../../assets/Picture/Line Border.png";
import LineQuest from "../../assets/Picture/Line-Quest.png";
import api from "../../Components/api";
export default function Rules() {
  const [rulesData, setRulesData] = useState([]);

  useEffect(() => {
    // Ambil data dari ServerRulesController
    api
      .get("/game-info/server-rules")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setRulesData(res.data);
        }
        console.log("Server rules data:", res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Group rules by category
  const groupedRules = rulesData.reduce((acc, rule) => {
    const category = rule.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(rule);
    return acc;
  }, {});

  return (
    <section className="h-full font-['Bebas_Neue']">
      <div className="bg-cover bg-no-repeat main-background-container">
        <div className="flex flex-col items-center justify-center mx-8">
          <img src={LOGO} alt="Logo" className="w-[25%] mt-12" />
          <img src={Line} alt="Line" className="w-full" />
        </div>

        <div className="flex flex-col gap-8 justify-between pt-12 w-full h-full px-16 pb-8">
          <div className="flex flex-col w-full h-full gold-border items-center p-4 gap-4">
            <div className="text-yellow-400 font-bold text-3xl text-center">
              SERVER RULES
            </div>
            <img src={LineQuest} alt="Line" />
            <div className="flex flex-row gap-4">
              <div>SERVER INFO</div>
              <div>ONLINE</div>
              <div>300 player</div>
            </div>
          </div>

          <div className="flex flex-col w-full h-full gold-border items-center gap-8 p-12">
            {Object.entries(groupedRules).length === 0 ? (
              <p className="text-white">Loading...</p>
            ) : (
              Object.entries(groupedRules).map(([category, rules], index) => (
                <div
                  key={index}
                  className="w-full flex flex-col gap-6 items-center"
                >
                  <div className="text-yellow-400 font-bold text-2xl text-center">
                    {category}
                  </div>
                  {rules.map((rule) => (
                    <div
                      key={rule.id}
                      className="flex flex-col gap-2 w-full items-start"
                    >
                      <div className="text-left font-semibold text-white w-full">
                        {rule.rules}
                      </div>
                      <img src={LineQuest} alt="LineQuest" className="w-full" />
                      <div className="text-left text-gray-300 px-8">
                        {rule.description.split("\n").map((line, i) => (
                          <p key={i}>
                            {i + 1}. {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="items-center justify-center pb-4">
          <img src={Line} alt="Line" className="w-full" />
          <div className="flex flex-row justify-center items-center gap-2">
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
    </section>
  );
}
