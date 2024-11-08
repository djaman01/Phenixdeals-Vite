import { phenixAchat, phenixPub, phenixVendre } from "../assets/images";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

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

  return (
    <div>
      <Slider {...settings} className="max-lg:mt-7 mx-auto lg:h-[700px] lg:w-[900px]">
        <Link to="./concept">
          <div className="lg:h-[700px] px-2">
            <img
              src={phenixVendre}
              alt="phenix vendre"
              className="h-full w-full object-fill rounded-2xl border-4 border-black "
            />
          </div>
        </Link>
        <Link to="./tableaux">
          <div className="lg:h-[700px] px-2">
            <img
              src={phenixAchat}
              alt="phenix Achat"
              className="h-full w-full object-fill rounded-2xl border-4 border-black  "
            />
          </div>
        </Link>
        <Link to='/vendre'>
          <div className="lg:h-[700px] px-2">
            <img
              src={phenixPub}
              alt="phenix pub"
              className="h-full w-full object-fill rounded-2xl border-4 border-black "
            />
          </div>
        </Link>
      </Slider>
    </div>
  );
};

export default ScrollPage;
