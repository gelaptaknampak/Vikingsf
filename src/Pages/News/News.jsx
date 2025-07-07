import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { FaInstagram, FaTiktok, FaFacebook, FaDiscord } from "react-icons/fa";
import LOGO from "../../assets/Picture/LOGO VIKINGS 1.png";
import Line from "../../assets/Picture/Line Border.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from "../../Components/api";

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute left-4 z-20 top-1/2 -translate-y-1/2 cursor-pointer font-['Bebas_Neue']"
    onClick={onClick}
  >
    <IoMdArrowDropleft className="text-gray-100 text-4xl sm:text-5xl md:text-6xl hover:text-gray-300" />
  </div>
);

const NextArrow = ({ onClick }) => (
  <div
    className="absolute right-4 z-20 top-1/2 -translate-y-1/2 cursor-pointer font-['Bebas_Neue']"
    onClick={onClick}
  >
    <IoMdArrowDropright className="text-gray-100 text-4xl sm:text-5xl md:text-6xl hover:text-gray-300" />
  </div>
);

const CarouselCard = ({ image, title, subtitle }) => {
  return (
    <div className="relative w-full h-[300px] sm:h-[450px] md:h-[550px] lg:h-[672px] overflow-hidden group font-['Bebas_Neue']">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500"
      />
      <div className="absolute bottom-0 left-0 w-full h-1/3 flex items-end p-4 sm:p-8">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
        <div className="relative text-white z-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
            {title}
          </h2>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-200">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

const NewsList = ({ image, title, description, onReadMore }) => {
  return (
    <div className="relative overflow-hidden w-full px-4 sm:px-6 md:px-10 py-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <img
          src={image}
          alt={title}
          className="w-full sm:w-80 h-48 object-cover flex-shrink-0 rounded-md"
        />
        <div className="flex flex-col justify-between flex-grow">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 leading-tight">
              {title}
            </h3>
            <p className="text-white text-sm sm:text-base">{description}</p>
          </div>
          <button
            onClick={onReadMore}
            className="mt-4 text-blue-400 hover:text-blue-500 font-semibold self-end"
          >
            Read More &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

const News = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const [carouselData, setCarouselData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/news")
      .then((res) => {
        setNewsData(res.data);
        setCarouselData(res.data.slice(0, 3));
      })
      .catch((err) => {
        console.error("Gagal mengambil data dari backend:", err);
      });
  }, []);

  const handleReadMore = (id) => {
    navigate(`/news/${id}`);
  };

  return (
    <section className="h-full w-full font-['Bebas_Neue']">
      <div className="w-full bg-cover bg-no-repeat main-background-container text-left overflow-x-hidden">
        <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <img src={LOGO} alt="Logo" className="w-36 sm:w-48 lg:w-[25%] mt-12" />
          <img src={Line} alt="Line" className="w-full" />
        </div>

        <div className="flex flex-col justify-center py-8">
          {/* Carousel */}
          <div className="relative w-full max-w-[1195px] h-auto mx-auto p-[2px] box-border rounded-lg gold-border">
            <div className="w-full h-full overflow-hidden relative rounded-[15px]">
              <Slider {...settings}>
                {carouselData.map((card) => (
                  <CarouselCard
                    key={card.id}
                    image={card.image}
                    title={card.title}
                    subtitle={card.description}
                  />
                ))}
              </Slider>
            </div>
          </div>

          {/* List Berita */}
          <div className="mt-12 w-full max-w-[1195px] mx-auto px-4">
            <div className="gold-border rounded-lg bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0)_50%,rgba(0,0,0,0.2)_100%),linear-gradient(to_right,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0)_50%,rgba(0, 0, 0, 0.2)_100%)]">
              {newsData.map((news) => (
                <NewsList
                  key={news.id}
                  image={news.image}
                  title={news.title}
                  description={news.description}
                  onReadMore={() => handleReadMore(news.id)}
                />
              ))}
            </div>
          </div>

          {/* Footer Sosmed */}
          <div className="flex flex-col items-center justify-center pb-4 mt-8 px-4">
            <img src={Line} alt="Line" className="w-full" />
            <div className="flex flex-row justify-center items-center gap-4 text-xl mt-4">
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
};

export default News;
