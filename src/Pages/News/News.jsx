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
    <IoMdArrowDropleft className="text-gray-100 text-6xl hover:text-gray-300" />
  </div>
);

const NextArrow = ({ onClick }) => (
  <div
    className="absolute right-4 z-20 top-1/2 -translate-y-1/2 cursor-pointer font-['Bebas_Neue']"
    onClick={onClick}
  >
    <IoMdArrowDropright className="text-gray-100 text-6xl hover:text-gray-300" />
  </div>
);

const CarouselCard = ({ image, title, subtitle }) => {
  return (
    <div className="relative w-full h-[672px] overflow-hidden group font-['Bebas_Neue']">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500"
      />
      <div className="absolute bottom-0 left-0 w-full h-1/3 flex items-end p-8">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
        <div className="relative text-white z-10">
          <h2 className="text-4xl font-bold">{title}</h2>
          <p className="mt-2 text-lg text-gray-200">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

const NewsList = ({ image, title, description, onReadMore }) => {
  return (
    <div className="relative overflow-hidden flex flex-row w-full font-['Bebas_Neue']">
      <div className="relative z-10 mx-10 mt-12 my-6 flex flex-row w-full">
        <img
          src={image}
          alt={title}
          className="w-84 h-48 object-cover flex-shrink-0"
        />
        <div className="ml-4 flex flex-col justify-between flex-grow">
          <div>
            <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
              {title}
            </h3>
            <p className="text-white text-base">{description}</p>
          </div>
          <button
            onClick={onReadMore}
            className="mt-5 text-blue-400 hover:text-blue-500 font-semibold self-end"
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
        <div className="flex flex-col items-center justify-center mx-8">
          <img src={LOGO} alt="Logo" className="w-[25%] mt-12" />
          <img src={Line} alt="Line" className="w-full" />
        </div>

        <div className="flex flex-col justify-center py-8">
          {/* Carousel */}
          <div className="relative w-[1195px] h-[672px] mx-auto p-[2px] box-border rounded-lg gold-border">
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
          <div className="mt-16 w-[1195px] mx-auto">
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
      </div>
    </section>
  );
};

export default News;
