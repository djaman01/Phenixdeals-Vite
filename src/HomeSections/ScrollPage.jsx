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
  const [sliderImages, setSliderImages] = useState([]);

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const response = await axios.get(
          "https://phenixdeals-back.onrender.com/slider",
        );
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
      <Slider
        {...settings}
        className="mx-auto max-lg:mt-7 lg:h-[700px] lg:w-[900px]"
      >
        {sliderImages.map((slide) => (
          <Link key={slide._id}>
            <div className="px-2 lg:h-[700px]">
              <img
                src={slide.imageUrl}
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
