import React, { useState, useEffect } from "react";
import {
  FaInstagram,
  FaTiktok,
  FaFacebook,
  FaDiscord,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import LOGO from "../../assets/Picture/LOGO VIKINGS 1.png";
import Line from "../../assets/Picture/Line Border.png";
import LineQuest from "../../assets/Picture/Line-Quest.png";
import api from "../../Components/api";

const AFTERWAR_QUEST_URL =
  "/game-info/quest-information/dailyquestafterwar";
const DAILY_QUEST_URL =
  "/game-info/quest-information/dailyquest";

export default function QuestInfo() {
  const [openIndex, setOpenIndex] = useState(null);
  const [allQuests, setAllQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestData = async () => {
      try {
        const [afterWarResponse, dailyResponse] = await Promise.all([
          api.get(AFTERWAR_QUEST_URL),
          api.get(DAILY_QUEST_URL),
        ]);

        const afterWarData = await afterWarResponse.data();
        const dailyData = await dailyResponse.data();

        let questsToSet = [];

        // Afterwar Quest processing (no changes here)
        if (Array.isArray(afterWarData) && afterWarData.length > 0) {
          questsToSet.push({
            title: "Daily Quest Afterwar",
            content: (
              <div className="w-full text-sm">
                <div className="flex bg-gray-800/50 font-bold p-2 rounded-t-md">
                  <div className="w-1/4">Daily Quest Afterwar</div>
                  <div className="w-1/4">Map</div>
                  <div className="w-1/4">Quest</div>
                  <div className="w-1/4">Reward</div>
                </div>
                <div className="flex flex-col">
                  {afterWarData.map((item, index) => (
                    <div
                      key={index}
                      className="flex p-2 border-b border-gray-700 last:border-b-0"
                    >
                      <div className="w-1/4 font-semibold">
                        {item.daily_quest}
                      </div>
                      <div className="w-1/4">{item.map}</div>
                      <div className="w-1/4">
                        {item.quest.split(",").map((q, i) => (
                          <p key={i}>{q.trim()}</p>
                        ))}
                      </div>
                      <div className="w-1/4">
                        <ul className="list-none">
                          {item.reward.split(",").map((r, i) => (
                            <li key={i}>▸ {r.trim()}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          });
        }

        // --- UPDATED: Logic to display ALL quests per day ---
        const dayOrder = [
          "Sunday",
          "Saturday",
          "Friday",
          "Thursday",
          "Wednesday",
          "Tuesday",
          "Monday",
        ];
        const sortedDailyQuests = dayOrder.map((day) => {
          // CHANGED: Use .filter() to get ALL quests for a specific day, not just the first one.
          const questsForDay = dailyData.filter(
            (q) => q.day && q.day.toLowerCase() === day.toLowerCase()
          );

          return {
            title: `Daily Quest [${day}]`,
            // Check if the 'questsForDay' array has any items in it.
            content:
              questsForDay.length > 0 ? (
                // If quests exist, create a container to stack them vertically
                <div className="flex flex-col gap-4">
                  {/* NEW: Loop over every quest found for that day */}
                  {questsForDay.map((questItem, itemIndex) => (
                    // Create a table for each quest item
                    <div
                      key={itemIndex}
                      className="w-full text-sm border border-gray-700 rounded-md"
                    >
                      {/* Table Header */}
                      <div className="flex bg-gray-800/50 font-bold p-2 rounded-t-md">
                        <div className="w-1/3">Tutorial</div>
                        <div className="w-1/3">Quest</div>
                        <div className="w-1/3">Reward</div>
                      </div>
                      {/* Table Content */}
                      <div className="flex p-2">
                        {/* Use 'questItem' to access the data for the current quest in the loop */}
                        <div className="w-1/3 pr-2">
                          {questItem.tutorial.split(",").map((t, i) => (
                            <p key={i}>{t.trim()}</p>
                          ))}
                        </div>
                        <div className="w-1/3 px-2 border-l border-r border-gray-700">
                          {questItem.quest.split(",").map((q, i) => (
                            <p key={i}>{q.trim()}</p>
                          ))}
                        </div>
                        <div className="w-1/3 pl-2">
                          {questItem.reward.split(",").map((r, i) => (
                            <p key={i}>{r.trim()}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                `Details for ${day}'s quest not available.`
              ), // Fallback message if no quests are found
          };
        });

        setAllQuests([...questsToSet, ...sortedDailyQuests]);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching quest data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestData();
  }, []);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading quest information...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <section className="h-full font-['Bebas_Neue']">
      <div className="bg-cover bg-no-repeat main-background-container">
        {/* Header and server info */}
        <div className="flex flex-col items-center justify-center mx-8">
          <img src={LOGO} alt="Logo" className="w-[25%] mt-12" />
          <img src={Line} alt="Line" className="w-full" />
        </div>
        <div className="flex flex-col gap-8 justify-between pt-12 w-full h-full px-16 pb-8">
          <div className="flex flex-col w-full h-full gold-border items-center p-4 gap-4">
            <div>QUEST INFO</div>
            <img src={LineQuest} alt="" />
            <div className="flex flex-row gap-4">
              <div>SERVER INFO</div>
              <div>ONLINE</div>
              <div>300 player</div>
            </div>
          </div>

          {/* Main Quest Accordion Section */}
          <div className="flex flex-col w-full h-full gold-border p-8">
            <div className="flex text-center align-center justify-center items-center text-xl font-bold">
              QUEST INFORMATION
            </div>
            <img src={LineQuest} alt="Separator" className="w-full my-4" />

            {allQuests.map((quest, index) => (
              <div key={index} className="w-full">
                <div
                  className="flex justify-between items-center cursor-pointer py-2 px-4"
                  onClick={() => handleToggle(index)}
                >
                  <div className="flex items-center font-semibold">
                    <FaChevronRight size={14} className="mr-3" />
                    <span>{quest.title}</span>
                  </div>
                  <FaChevronDown
                    className={`transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {openIndex === index && (
                  <div className="pl-6 pr-4 py-4 text-gray-300">
                    {quest.content}
                  </div>
                )}

                <img src={LineQuest} alt="Separator" className="w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Social media links */}
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
