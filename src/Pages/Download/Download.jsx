import React from "react";
import { FaInstagram, FaTiktok, FaFacebook, FaDiscord } from "react-icons/fa";
import LOGO from "../../assets/Picture/LOGO VIKINGS 1.png";
import Separator from "../../assets/Picture/line full.png";
import Line from "../../assets/Picture/Line Border.png";

const DownloadSection = () => {
  const getDownloadLink = (fileId) =>
    `https://drive.google.com/uc?export=download&id=${fileId}`;

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
      <div className="bg-cover bg-no-repeat main-background-container text-left overflow-x-hidden">
        {/* Logo */}
        <div className="flex flex-col items-center justify-center px-4 sm:px-8 mt-12">
          <img src={LOGO} alt="Logo" className="w-32 sm:w-44 md:w-[25%]" />
          <img src={Line} alt="Line" className="w-full mt-4" />
        </div>

        {/* Content */}
        <div className="justify-center py-8 text-left px-4 sm:px-6">
          <div className="w-full max-w-[1195px] mx-auto box-border rounded-lg gold-border bg-opacity-10">
            <div className="p-4 sm:p-6">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white text-center">
                DOWNLOAD
              </h2>
              <img src={Separator} alt="separator" className="w-full my-4" />

              {sections.map((section) => (
                <div key={section.id} className="mb-10">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                    {section.title}
                  </h3>
                  <a className="text-sm text-white mb-4 cursor-pointer block hover:text-yellow-400">
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
                      className="relative flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 px-4 mb-2 bg-white/10 rounded"
                    >
                      <span className="text-white text-sm sm:text-base">
                        {file.name}
                      </span>

                      {/* SIZE DITENGAH */}
                      <div className="text-white text-sm sm:text-base sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 mt-1 sm:mt-0">
                        {file.size}
                      </div>

                      <a
                        href={file.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white font-semibold text-sm sm:text-base mt-1 sm:mt-0 sm:ml-auto hover:text-yellow-400"
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

        {/* Footer Sosmed */}
        <div className="flex flex-col items-center justify-center pb-6 px-4 sm:px-0">
          <img src={Line} alt="Line" className="w-full mb-4" />
          <div className="flex flex-wrap justify-center items-center gap-4 text-xl text-white">
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
