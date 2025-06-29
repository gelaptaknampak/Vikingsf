import React from "react";
import { FaInstagram, FaTiktok, FaFacebook, FaDiscord } from "react-icons/fa";
import LOGO from "../../assets/Picture/LOGO VIKINGS 1.png";
import Separator from "../../assets/Picture/line full.png";
import Line from "../../assets/Picture/Line Border.png";

const DownloadSection = () => {
  // Fungsi untuk generate link Google Drive
  const getDownloadLink = (fileId) =>
    `https://drive.google.com/uc?export=download&id=${fileId}`;

  // List section dengan file berbeda
  const sections = [
    {
      id: 1,
      title: "Download Full Client",
      files: [
        {
          name: "Full Client - Mediafire",
          size: "1.79 GB",
          link: "https://www.mediafire.com/file/8avht0jebvmdunn/Full_Client_RF_Vikings_26032025.7z/file",
        },
        {
          name: "Full Client - Google Drive",
          size: "1.79 GB",
          link: "https://drive.google.com/file/d/18Ca_EfS_ok_FnNHq5avsEanbwKpo71xT/view?usp=drive_link",
        },
      ],
    },
    {
      id: 2,
      title: "Download Full Patch",
      files: [
        {
          name: "Full Patch - Mediafire",
          size: "103.45 MB",
          link: "https://www.mediafire.com/file/yoxblzja1nv5kj1/FullPatch_RFVikings_26032025.7z/file",
        },
        {
          name: "Full Patch - Google Drive",
          size: "103.45 MB",
          link: "https://drive.google.com/file/d/1njaBlGhXNa12-SCB_l7nEIiNvVxySwk4/view?usp=drive_link",
        },
      ],
    },
  ];

  return (
    <section className="h-full font-['Bebas_Neue']">
      <div className="bg-cover bg-no-repeat main-background-container text-left">
        <div className="flex flex-col items-center justify-center mx-8">
          <img src={LOGO} alt="Logo" className="w-[25%] mt-12" />
          <img src={Line} alt="Line" className="w-full" />
        </div>

        <div className="justify-center py-8 text-left">
          <div className="w-[1195px] mx-auto p-[2px] box-border rounded-lg gold-border bg-opacity-10">
            <div className="p-6">
              <h2 className="text-3xl font-bold mb-6 text-white text-center mx-auto">
                DOWNLOAD
              </h2>
              <img src={Separator} alt="separator" className="w-full my-4" />

              {sections.map((section) => (
                <div key={section.id} className="mb-10 px-8">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {section.title}
                  </h3>
                  <a className="text-sm text-white mb-4 cursor-pointer transition-colors duration-300 hover:text-yellow-400">
                    README
                  </a>

                  <img
                    src={Separator}
                    alt="separator"
                    className="w-full my-4"
                  />

                  {section.files.map((file, i) => (
                    <div
                      key={i}
                      className="relative flex justify-between items-center py-2 px-4 mb-2 bg-white/10 rounded"
                    >
                      <span className="text-white">{file.name}</span>

                      {/* SIZE DITENGAH */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 text-white">
                        {file.size}
                      </div>

                      <a
                        href={file.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white font-semibold px-4 py-1 transition-colors duration-300 hover:text-yellow-400"
                      >
                        DOWNLOAD
                      </a>
                    </div>
                  ))}
                </div>
              ))}
            </div>
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
};

export default DownloadSection;
