import React, { useState, useEffect } from "react";
import { FaInstagram, FaTiktok, FaFacebook, FaDiscord } from "react-icons/fa";
import LOGO from "../../assets/Picture/LOGO VIKINGS 1.png";
import Line from "../../assets/Picture/Line Border.png";
import LineQuest from "../../assets/Picture/Line-Quest.png";
import api from "../../Components/api";
export default function MapInfo() {
  const [maps, setMaps] = useState([]); // List dari backend
  const [selectedMap, setSelectedMap] = useState(null); // Map yang dipilih
  const [loading, setLoading] = useState(true);

  // Ambil data maps dari API saat halaman load
  useEffect(() => {
    const fetchMaps = async () => {
      try {
        const response = await api.get("/game-info/mapinfo");
        setMaps(response.data);
      } catch (error) {
        console.error("Failed to fetch maps:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaps();
  }, []);

  // Handle map selection
  const handleMapSelect = (event) => {
    const selected = maps.find((map) => map.map_name === event.target.value);
    setSelectedMap(selected);
  };

  return (
    <section className="h-full font-['Bebas_Neue']">
      <div className="bg-cover bg-no-repeat main-background-container">
        {/* Logo & Border Line */}
        <div className="flex flex-col items-center justify-center mx-8">
          <img src={LOGO} alt="Logo" className="w-[25%] mt-12" />
          <img src={Line} alt="Line" className="w-full" />
        </div>

        {/* Info Box */}
        <div className="flex flex-col gap-8 justify-between pt-12 w-full h-full px-16 pb-8">
          <div className="flex flex-col w-full h-full gold-border items-center p-4 gap-4">
            <div>MAP INFORMATION</div>
            <img src={LineQuest} alt="" />
            <div className="flex flex-row gap-4">
              <div>SERVER INFO</div>
              <div>ONLINE</div>
              <div>300 player</div>
            </div>
          </div>

          {/* Map List Section */}
          <div className="min-h-200 flex flex-col w-full h-full gold-border items-center gap-4 p-16">
            {/* Dropdown */}
            <div className="flex justify-center gold-border items-center space-x-4 w-[80%] bg-[#D9D9D9] rounded-lg">
              <select
                value={selectedMap ? selectedMap.map_name : ""}
                onChange={handleMapSelect}
                className="w-[95%] text-center bg-transparent text-white border-white py-2 focus:outline-none"
              >
                <option
                  className="bg-white text-black dark:bg-black/60"
                  value=""
                >
                  {loading ? "Loading Maps..." : "Select Map"}
                </option>
                {maps.map((map) => (
                  <option
                    key={map.id}
                    value={map.map_name}
                    className="bg-white text-black dark:bg-black/60 dark:text-white"
                  >
                    {map.map_name}
                  </option>
                ))}
              </select>
            </div>

            <img src={LineQuest} alt="Line" className="w-full" />

            {/* Display selected map image */}
            {selectedMap ? (
              selectedMap.image ? (
                <div className="flex justify-center my-4">
                  <img
                    src={`${api}/storage/mapinfo/${selectedMap.image}`}
                    alt={selectedMap.map_name}
                    className="max-w-full h-auto border-4 border-white rounded-lg shadow-lg"
                  />
                </div>
              ) : (
                <div className="text-center text-[#7F7F7F]">
                  <p>No image available for this map.</p>
                </div>
              )
            ) : (
              <div className="text-center text-[#7F7F7F]">
                <p>Please select a map to view.</p>
              </div>
            )}

            <img src={LineQuest} alt="Line" className="w-full" />
          </div>
        </div>

        {/* Footer */}
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
