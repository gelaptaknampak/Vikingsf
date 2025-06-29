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

// API URLs remain the same
const PENDANT_URL = "/game-info/server-information/pendant-information";
const GEM_URL = "/game-info/server-information/gem-information";
const SERVERS_INFO_URL = "/game-info/server-information/serversinfo";
const SYSTEM_INFO_URL = "/game-info/server-information/systeminfo";
const FEATURE_DISABLE_URL = "/game-info/server-information/feature-disable";
const FEATURE_ENABLE_URL = "/game-info/server-information/feature-enable";
const NPC_LIST_URL = "/game-info/server-information/npclist";
const DROP_LIST_URL = "/game-info/server-information/droplist";

export default function ServerInfo() {
  const [openIndex, setOpenIndex] = useState(null);

  const [serverData, setServerData] = useState({
    featureInfo: [],
    generalInfo: {},
    npcList: [],
    dropList: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllServerData = async () => {
      try {
        // Promise.all will still make all requests concurrently.
        // If any request fails, it will jump to the catch block.
        const responses = await Promise.all([
          api.get(PENDANT_URL), // 0
          api.get(GEM_URL), // 1
          api.get(SERVERS_INFO_URL), // 2
          api.get(SYSTEM_INFO_URL), // 3
          api.get(FEATURE_DISABLE_URL), // 4
          api.get(FEATURE_ENABLE_URL), // 5
          api.get(NPC_LIST_URL), // 6
          api.get(DROP_LIST_URL), // 7
        ]);

        // CORRECTED: Axios responses are automatically parsed.
        // The JSON data is in the `data` property of each response.
        const data = responses.map((res) => res.data);

        setServerData({
          // The structure of your data might need adjustment based on the actual API response
          featureInfo: [...data[0], ...data[1]],
          generalInfo: {
            serversInfo: data[2],
            systemInfo: data[3],
            featureDisable: data[4],
            featureEnable: data[5],
          },
          npcList: data[6],
          dropList: data[7],
        });
      } catch (err) {
        // This will now correctly catch the 500 error from axios
        const errorMessage =
          err.response?.data?.message || err.message || "An unknown error occurred";
        setError(`Request failed with status code 500. ${errorMessage}`);
        console.error("Error fetching server data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllServerData();
  }, []);

  const accordionSections = [
    { title: "Feature Information", dataKey: "featureInfo" },
    { title: "General Information", dataKey: "generalInfo" },
    { title: "NPC List Information", dataKey: "npcList" },
    { title: "Drop List Information", dataKey: "dropList" },
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const renderContent = (sectionKey, data) => {
    if (
      !data ||
      (Array.isArray(data) && data.length === 0) ||
      (typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length === 0)
    ) {
      return <p>No information available.</p>;
    }

    switch (sectionKey) {
      case "featureInfo":
        return (
          <div className="w-full text-sm font-['Bebas_Neue']">
            <div className="flex bg-gray-800/50 font-bold p-2 rounded-t-md">
              <div className="w-1/2">Item Name</div>
              <div className="w-1/4">Type</div>
              <div className="w-1/4">Trade</div>
            </div>
            {data.map((item, index) => (
              <div
                key={index}
                className="flex p-2 border-b border-gray-700 last:border-b-0"
              >
                <div className="w-1/2">{item.name_item}</div>
                <div className="w-1/4">{item.type}</div>
                <div className="w-1/4">{item.trade}</div>
              </div>
            ))}
          </div>
        );
      case "generalInfo":
        return (
          <div className="w-full text-sm flex flex-col gap-6 font-['Bebas_Neue']">
            {data.serversInfo && data.serversInfo.length > 0 && (
              <div>
                <h3 className="font-bold text-center text-lg border-b-2 border-yellow-400 pb-1 mb-2">
                  SERVER INFORMATION
                </h3>
                <div className="flex flex-col">
                  {data.serversInfo.map((item, index) => (
                    <div
                      key={`server-${index}`}
                      className="flex justify-between py-2 border-b border-gray-800 last:border-b-0"
                    >
                      <span className="font-semibold">{item.server_info}</span>
                      <span>{item.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {data.systemInfo && data.systemInfo.length > 0 && (
              <div>
                <h3 className="font-bold text-lg text-center border-b-2 border-yellow-400 pb-1 mb-2">
                  SYSTEM INFORMATION
                </h3>
                <div className="flex flex-col">
                  {data.systemInfo.map((item, index) => (
                    <div
                      key={`system-${index}`}
                      className="flex justify-between py-2 border-b border-gray-800 last:border-b-0"
                    >
                      <span className="font-semibold">{item.system_info}</span>
                      <span>{item.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {data.featureEnable && data.featureEnable.length > 0 && (
              <div>
                <h3 className="font-bold text-lg border-b-2 border-yellow-400 pb-1 mb-2">
                  ENABLED FEATURES
                </h3>
                <div className="flex flex-col">
                  {data.featureEnable.map((item, index) => (
                    <div
                      key={`enable-${index}`}
                      className="flex justify-between py-2 border-b border-gray-800 last:border-b-0"
                    >
                      <span className="font-semibold">{item.feature}</span>
                      <span>{item.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {data.featureDisable && data.featureDisable.length > 0 && (
              <div>
                <h3 className="font-bold text-lg border-b-2 border-yellow-400 pb-1 mb-2">
                  DISABLED FEATURES
                </h3>
                <div className="flex flex-col">
                  {data.featureDisable.map((item, index) => (
                    <div
                      key={`disable-${index}`}
                      className="flex justify-between py-2 border-b border-gray-800 last:border-b-0"
                    >
                      <span className="font-semibold">{item.feature}</span>
                      <span>{item.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      case "npcList":
        return (
          <div className="w-full text-sm font-['Bebas_Neue']">
            <div className="flex bg-gray-800/50 font-bold p-2 rounded-t-md">
              <div className="w-1/3">NPC</div>
              <div className="w-1/3">Map</div>
              <div className="w-1/3">Currency</div>
            </div>
            {data.map((item, index) => (
              <div
                key={index}
                className="flex p-2 border-b border-gray-700 last:border-b-0"
              >
                <div className="w-1/3">{item.npc}</div>
                <div className="w-1/3">
                  {item.map_information?.name || item.map_information_id}
                </div>
                <div className="w-1/3">{item.buy_with}</div>
              </div>
            ))}
          </div>
        );
      case "dropList":
        return (
          <div className="w-full text-sm font-['Bebas_Neue']">
            <div className="flex bg-gray-800/50 font-bold p-2 rounded-t-md">
              <div className="w-1/3">Monster</div>
              <div className="w-1/3">Map</div>
              <div className="w-1/3">Item Drop</div>
            </div>
            {data.map((item, index) => (
              <div
                key={index}
                className="flex p-2 border-b border-gray-700 last:border-b-0"
              >
                <div className="w-1/3">{item.monster}</div>
                <div className="w-1/3">
                  {item.map_information?.name || item.map_information_id}
                </div>
                <div className="w-1/3">{item.items?.name || item.item.items_name}</div>
              </div>
            ))}
          </div>
        );
      default:
        return <p>Configuration error.</p>;
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-white font-['Bebas_Neue']">
        Loading Server Information...
      </div>
    );
  if (error)
    return (
        // Displaying the modified, more informative error message
      <div className="flex justify-center items-center h-screen text-red-500 font-bold font-['Bebas_Neue']">
        ERROR: {error}
      </div>
    );

  // The rest of your return statement (JSX) is correct and does not need changes.
  return (
    <section className="h-full font-['Bebas_Neue']">
      <div className="bg-cover bg-no-repeat main-background-container">
        <div className="flex flex-col items-center justify-center mx-8">
          <img src={LOGO} alt="Logo" className="w-[25%] mt-12" />
          <img src={Line} alt="Line" className="w-full" />
        </div>
        <div className="flex flex-col gap-8 justify-between pt-12 w-full h-full px-16 pb-8">
          <div className="flex flex-col w-full h-full gold-border p-8">
            <div className="flex text-center align-center justify-center items-center text-xl font-bold">
              SERVER INFORMATION
            </div>
            <img src={LineQuest} alt="Separator" className="w-full my-4" />
            {accordionSections.map((section, index) => (
              <div key={index} className="w-full">
                <div
                  className="flex justify-between items-center cursor-pointer py-2 px-4"
                  onClick={() => handleToggle(index)}
                >
                  <div className="flex items-center font-semibold">
                    <FaChevronRight size={14} className="mr-3" />
                    <span>{section.title}</span>
                  </div>
                  <FaChevronDown
                    className={`transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {openIndex === index && (
                  <div className="pl-6 pr-4 py-4 text-gray-300">
                    {renderContent(
                      section.dataKey,
                      serverData[section.dataKey]
                    )}
                  </div>
                )}
                <img src={LineQuest} alt="Separator" className="w-full" />
              </div>
            ))}
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