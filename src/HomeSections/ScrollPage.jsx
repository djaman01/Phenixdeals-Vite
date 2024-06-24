import { phenixAchat, phenixPub, phenixVendre } from "../assets/images";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ScrollPage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptativeHeight: true,
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: true,
    draggable: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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

  return (
    <div className="bg-[#e8e8e8] border border-yellow-500 w-[1600px] h-[1000px]">
      <div className="">
        <Slider {...settings} className="border border-red-500 ">
          <div>
            <img
              src={phenixVendre}
              alt="phenix vendre"
              className="w-[1600px] h-[1000px]"
            />
          </div>
          <div>
            <img
              src={phenixAchat}
              alt="phenix Achat"
              className="w-[1600px] h-[1000px]"
            />
          </div>
          <div>
            <img
              src={phenixPub}
              alt="phenix pub"
              className="w-[1600px] h-[1000px]"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default ScrollPage;
