import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import { StyleSheetManager } from "styled-components"; //Pour eviter les erreurs de styled props dans la console

import { FaRegTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const DashSlider = () => {
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  useEffect(() => {
    const authenticate = async () => {
      try {
        const response = await axios.get(
          "https://phenixdeals-back.onrender.com/authentication",
        );
        if (response.data.message !== "Authenticated") {
          navigate("/");
        }
      } catch (error) {
        console.error(
          "Error during authentication:",
          error.response
            ? `${error.response.status}: ${error.response.data.message}` // Server-side error
            : error.message, // Client-side error
        );
        navigate("/"); // If authentication failure, redirect to HomePage
      }
    };

    authenticate();
  }, [navigate]);

  const [sliderImages, setSliderImages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllArticles = async () => {
      try {
        const response = await axios.get(
          "https://phenixdeals-back.onrender.com/slider",
        );
        setSliderImages(response.data); //on a l'image + le nom de l'auteur + date d'ajout dans sliderImages state
        console.log("All articles fetched", response.data);
      } catch (error) {
        console.error(
          error.response
            ? `${error.response.status}: ${error.response.data.message}` // Server-side error
            : `Error: ${error.message}`, // Client-side error
        );
        setError("An error occurred while fetching data");
      }
    };

    fetchAllArticles();
  }, []);

  //Pour DELETE request et supprimer un élement selectionné; donc stocker l'arrow function dans une variable qu'on va appeler avec un paramètre pour cibler le produit
  const handleDelete = async (imageId) => {
    try {
      const response = await axios.delete(
        `https://phenixdeals-back.onrender.com/deleteSliderImage/${imageId}`,
      );
      setSliderImages(sliderImages.filter((image) => image._id !== imageId)); // Remove the deleted image from the state
      console.log(response.data); // Log the server's response message
    } catch (error) {
      console.error(
        "Error during delete operation:",
        error.response
          ? `${error.response.status}: ${error.response.data.message}` // Server-side error
          : error.message, // Client-side error
      );
    }
  };

  //Création database avec npm react data table component---------comme data={sliderImages} dans <DataTable/> alors toutes les properties imageUrl et auteur fetch au début sont disponibles

  const columns = [
   
    {
      name: "Image",
      selector: (row) => row.imageUrl, //même nom que dans base de donnée pour extraire info
      cell: (row) => <img className="my-3" src={row.imageUrl} />,
    },
     {
      name: "Auteur",
      selector: (row) => row.auteur,
      sortable: true, //Pour ordonner par ordre alphabétic ou l'inverse
      cell: (row) => row.auteur,
    },
     {
      name: "Code",
      selector: (row) => row.code,
      sortable: true, //Pour ordonner par ordre alphabétic ou l'inverse
      cell: (row) => row.code,
    },

    {
      name: "Actions",
      selector: (row) => row._id, //_id donné par MongoDB: Pour selectionner 1 produit spécifique ç mettre en parametre d'une function ex: handleDelete pour cibler un produit

      //Obligé de faire dans cet ordre pour que ça n’affecte que la row selectionnée
      cell: (row) => (
        <div className="flex w-[70px] cursor-pointer justify-around">
          <FaRegTrashAlt
            size={17}
            onClick={() => {
              window.confirm("Are you sur you want to delete this image ?") &&
                handleDelete(row._id);
            }}
          />
        </div>
      ),
    },
  ];

  const shouldForwardProp = (prop) => prop !== "sortActive"; //Pour éviter les erreurs des styled components, dans la console

  //Pour donner un style aux titre et aux contenus des colonnes (voir customStyles property de la dataTable Component après return)
  const customStyles = {
    headCells: {
      style: {
        justifyContent: "center",
        fontSize: "20px",
        marginTop: "90px",
        fontWeight: "bold",
        color: "blue",
      },
    },

    cells: {
      style: {
        justifyContent: "center",
        fontSize: "15px",
        fontWeight: "bold",
      },
    },
  };

  return (
    <>
      <Header />

      <div className="mt-5 flex justify-center text-lg  max-lg:mt-1 max-lg:flex-col max-lg:items-center max-lg:gap-4">
        <Link to="/">
          <button className="mr-52 w-[115px] rounded-md border bg-blue-500 px-3 py-1 text-white active:bg-blue-600 max-lg:mr-0">
            Accueil
          </button>
        </Link>

        <Link to="/toDashboard">
          <button className="mr-52 w-[200px] rounded-md border bg-green-500 px-3 py-1 text-white active:bg-green-600 max-lg:mr-0">
            Dashboard articles
          </button>
        </Link>
      </div>

      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <StyleSheetManager shouldForwardProp={shouldForwardProp}>
          <DataTable
            columns={columns}
            data={sliderImages}
            customStyles={customStyles}
            pagination
          />
        </StyleSheetManager>
      )}
    </>
  );
};

export default DashSlider;
