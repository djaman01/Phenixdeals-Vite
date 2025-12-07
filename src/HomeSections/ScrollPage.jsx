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

  //State to show the slider only when the images are ready, so that i don't have blank sliders
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const response = await axios.get(
          "https://phenixdeals-back.onrender.com/slider",
        );
        const images = response.data;
        //Promise.all() => To make sure all images are fully loaded before going further in the code and setting the state "ready" to true, so that the sliders appear
        await Promise.all(
          images.map((img) => {
            //For each image, we create a new promise that resolves ONLY WHEN that particular image has finished loading
            return new Promise((resolve) => {
              const image = new Image(); //Create a new HTML image Element in JavaScript
              image.src = img.imageUrl; //Starts loading the image in memory
              image.onload = resolve; // If the image finishes loading successfully, the promises resolves
              image.onerror = resolve; //If the image fails to load, the promises will still resolves (so we'll have a blank slider instead of a crash of all the sliders)
            });
          }),
        );

        setSliderImages(images);
        setReady(true);
      } catch (error) {
        console.error(
          "Error Fetching images:",
          error.response
            ? `${error.response.status}: ${error.response.data.message}` // Server-side error
            : error.message, // Client-side error
        );
      }
    };
    fetchSliderImages();
  }, []);

  //Pour ARRETER la function et la REDEMARRER DU DEBUT si les states ready = false ou pas de sliderImages fetched => To prevent Slider from rendering too early before the images, so that i don't have blank sliders
  if (!ready || sliderImages.length === 0) {
    return null;
  }

  const settings = {
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    dots: true,
    infinite: sliderImages.length > 1, //Pour que si je ne rajoute qu'1 image dans le slider, le carrousel ne la montre pas plusieurs fois et en plus de Haute en abs
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true, //Slider adujsts to each image height
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
      <Slider {...settings} className="mx-auto lg:h-[700px] lg:w-[900px]">
        {sliderImages.map((e) => (
          <Link
            to={`/${encodeURIComponent(e.auteur)}/${e.code}`}
            key={e._id}
            onClick={scrollToTop}
          >
            <div className="px-2 lg:h-[700px]">
              <img
                src={e.imageUrl}
                alt={`oeuvre de ${e.auteur}`}
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
