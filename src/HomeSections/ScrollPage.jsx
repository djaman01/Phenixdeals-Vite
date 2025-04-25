import Slider from "react-slick";
import {
  phenixPub
} from "../assets/images";

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
        {/* <a
          href="https://www.instagram.com/artfirst.galerie/"
          target="_blank"
          rel="noopener" // Déconnecte le nouvel onglet de l'onglet d'origine, empêchant toute interaction via window.opener. Cela protège contre des modifications malveillantes du lien de l'onglet d'origine.
        >
          <div className="px-2 lg:h-[700px]">
            <img
              src={gbouriArtFirst}
              alt="Exposition Gbouri Art First"
              className="h-full w-full rounded-2xl border-4 border-black object-fill "
            />
          </div>
        </a> */}

        <Link to="./concept" onClick={scrollToTop}>
          <div className="px-2 lg:h-[700px]">
            <img
              src={phenixPub}
              alt="phenix Pub"
              className="h-full w-full rounded-2xl border-4 border-black object-fill  "
            />
          </div>
        </Link>

        <Link to="./concept" onClick={scrollToTop}>
          <div className="px-2 lg:h-[700px]">
            <img
              src={phenixPub}
              alt="phenix Pub"
              className="h-full w-full rounded-2xl border-4 border-black object-fill  "
            />
          </div>
        </Link>
      </Slider>
    </div>
  );
};

export default ScrollPage;
