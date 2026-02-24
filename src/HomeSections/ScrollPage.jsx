import Slider from "react-slick";

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function Arrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "black",
        borderRadius: "100%",
        cursor: "pointer",
        paddingTop: "0.5px",
      }}
      onClick={onClick}
    />
  );
}

const ScrollPage = () => {
  // Access API base URL from env (import.meta.env.name => To call .env variable in Vite, with a name that must start with "VITE")
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [sliderImages, setSliderImages] = useState([]);

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/slider`);
        console.log("Slider data", response.data);
        setSliderImages(response.data);
      } catch (error) {
        console.error("Error fetching slider images:", error);
      }
    };
    fetchSliderImages();
  }, []);

  const settings = {
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    dots: true,
    infinite: sliderImages.length > 1, //Pour que si je ne rajoute qu'1 image dans le slider, le carrousel ne la montre pas plusieurs fois et en plus de Haute en abs
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptativeHeight: true,
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: true,
    centerPadding: "60px",
    draggable: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1, //ça marche comme ça, si on met plus que 1 ça fait une erreur
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  return (
    <div>
      <Slider {...settings} className="mx-auto lg:h-[600px] lg:w-[900px]">
        {sliderImages.map((e) => (
          <Link
            to={`/${encodeURIComponent(e.auteur)}/${e.code}`}
            key={e._id}
            onClick={scrollToTop}
          >
            <div className="px-2 lg:h-[600px]">
              <img
                src={e.imageSlider}
                alt="slider"
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default ScrollPage;
