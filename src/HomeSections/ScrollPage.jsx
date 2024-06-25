import { phenixAchat, phenixPub, phenixVendre } from "../assets/images";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Arrow(props) {
  const { className, style, onClick } = props;
  return (
    
    <div
      className={className}
      style={{ ...style, display: "block", background: "black", borderRadius: "100%", cursor: "pointer", paddingTop: "0.5px" }}
      onClick={onClick}
    />
  );
}

const ScrollPage = () => {
  const settings = {
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
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
      <div>
        <Slider {...settings} className="w-[1000px] mx-auto">
          <div>
            <img
              src={phenixVendre}
              alt="phenix vendre"
              className="object-fit"
            />
          </div>
          <div>
            <img
              src={phenixAchat}
              alt="phenix Achat"
               className="object-fit"
            />
          </div>
          <div>
            <img
              src={phenixPub}
              alt="phenix pub"
               className="object-fit"
            />
          </div>
        </Slider>
      </div>
  
  );
};

export default ScrollPage;
