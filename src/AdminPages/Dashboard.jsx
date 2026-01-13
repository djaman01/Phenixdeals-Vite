import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import { StyleSheetManager } from "styled-components"; //Pour eviter les erreurs de styled props dans la console

import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Dashboard() {
  axios.defaults.withCredentials = true; //To include the cookies in the request globally (pour ne pas avoir à écrire; {withCredentials: true} dans chaque axios.get, car on en a besoin pour la requete de authenticate et de logout pour que ça puisse logout même si on part sur une autre page et qu'on revient sur dashboard)

  const navigate = useNavigate();

  const [articles, setArticles] = useState([]); //A mettre dans data attribute du <DataTable /> Component dans return
  const [error, setError] = useState("");

  const [refreshKey, setRefreshKey] = useState(0);

  const [articleId, setArticleId] = useState(null); //Pour que quand on clique sur stylo ou cancel, apporte des changements
  const [editedValues, setEditedValues] = useState({});

  // Access API base URL from env
  const API_BASE_URL = import.meta.env.VITE_API_URL;

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

  useEffect(() => {
    const fetchAllArticles = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/allArticles`);
        setArticles(response.data);
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
  }, [refreshKey, API_BASE_URL]); // The effect will run whenever refreshKey changes

  //Pour PUT request et modifier certains élements selectionnés

  //When clicking on the pen: To change the values of each column in each row
  //C'est ici qu'on donne les valeurs par défaut à la state "editedValues" => Car on ne peut connaitre le row._id selectionné qu'après avoir cliqué sur le stylo
  const handleEditClick = (row) => {
    setArticleId(row._id);
    setEditedValues({
      [row._id]: {
        auteur: row.auteur || "",
        type: row.type || "",
        prix: row.prix || "",
        infoArticle: row.infoArticle || "",
        allDescription: row.allDescription || "",
        bestDeal: row.bestDeal || "",
        code: row.code || "",
      },
    });
  };

  //

  //PUT Request: pour appliquer les changements après avoir cliquer sur "update"
  const handleUpdates = async (articleId) => {
    const updatedProductData = editedValues[articleId];
    try {
      const response = await axios.put(
        `${API_BASE_URL}/putDash/${articleId}`,
        updatedProductData,
      );
      console.log(response.data); // Show what was sent from the server: res.json({message:'', stateProduct}), in the browser console
      setArticleId(null); // Reset articleId to show the pencil and trash icons again after update
      setRefreshKey((prevKey) => prevKey + 1); // Increment refreshKey to trigger re-fetching of data and update the page without refreshing
    } catch (error) {
      console.error(
        "Error during update:",
        error.response
          ? `${error.response.status}: ${error.response.data.message}` // Server-side error
          : error.message, // Client-side error
      );
    }
  };

  //Pour DELETE request et supprimer un élement selectionné; donc stocker l'arrow function dans une variable qu'on va appeler avec un paramètre pour cibler le produit
  const handleDelete = async (articleId) => {
    //Si on repond NO => arrete la handleDelete function et ne supprime pas l'article
    if (!window.confirm("Are you sure you want to delete this article?")) {
      return;
    }
    try {
      const response = await axios.delete(
        `https://phenixdeals-back.onrender.com/deleteArticle/${articleId}`,
      );
      setArticles(articles.filter((article) => article._id !== articleId)); // Remove the deleted article from the state
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

  //Get Request to logout

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://phenixdeals-back.onrender.com/logout",
      );
      if (response.data.status === "Success") {
        navigate("/"); // Redirect to home page after loging out
      } else {
        console.log(`Logout Failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  //Création database avec npm react data table component--------------------------------------
  
  //Array avec les Noms des colonnes modifiables
  const fields = [
    "auteur",
    "type",
    "infoArticle",
    "allDescription",
    "prix",
    "bestDeal",
    "code",
  ];

  //Use of the array function .map, to transform each element of the array, into a column with the first letter in upper case, and an editable value
  const editableColumns = fields.map((element) => ({
    name: element.charAt(0).toUpperCase() + element.slice(1), //1st letter in upperCase + adding the rest of the word from the letter with the index = 1, which is the 2nd letter ex: A + uteur
    selector: (row) => row[element], // Value de la row de la colonne "e" => row[auteur]=> nom de l'artiste sur lequel on map
    sortable: true,
    cell: (row) =>
      articleId === row._id ? (
        <input
          value={editedValues[row._id]?.[element] || ""}
          onChange={(e) =>
            setEditedValues({
              ...editedValues,
              [row._id]: {
                ...editedValues[row._id],
                [element]: e.target.value,
              },
            })
          }
          className="w-full rounded-md border-2 border-black text-center"
        />
      ) : (
        row[element]
      ),
  }));

  const columns = [
    {
      name: "Image",
      selector: (row) => row.imageUrl, //Value de la row de la colonne image => même nom que dans base de donnée pour extraire info
      cell: (row) => (
        <img className="my-3" src={row.imageUrl} alt={row.auteur} />
      ),
    },
    ...editableColumns,
    {
      name: "Propriété",
      selector: (row) => row.etat,
      sortable: true,
    },

    {
      name: "Actions",
      selector: (row) => row._id, //_id donné par MongoDB: Pour selectionner 1 produit spécifique

      //Obligé de faire dans cet ordre pour que ça n’affecte que la row selectionnée
      cell: (row) =>
        articleId === row._id ? (
          <div className=" flex h-20 flex-col items-center justify-around">
            <p
              className=" w-[66px] rounded-md bg-green-500 px-2 py-1 text-center font-medium text-white active:bg-green-800"
              role="button"
              onClick={() => handleUpdates(row._id)}
            >
              Update
            </p>
            <p
              className=" w-[66px] rounded-md bg-red-500 px-2 py-1 text-center font-medium text-white active:bg-red-800"
              role="button"
              onClick={() => setArticleId(null)}
            >
              Cancel
            </p>
          </div>
        ) : (
          <div className="flex w-[70px] cursor-pointer justify-around">
            <FaRegPenToSquare size={17} onClick={() => handleEditClick(row)} />
            <FaRegTrashAlt size={17} onClick={() => handleDelete(row._id)} />
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

        <Link to="/addArticle">
          <button className="mr-52 w-[115px] rounded-md border bg-green-500 px-3 py-1 text-white active:bg-green-600 max-lg:mr-0">
            Add Article
          </button>
        </Link>

        <Link to="/addImageSlider">
          <button className="mr-52 w-[130px] rounded-md border bg-yellow-500 px-3 py-1 text-white active:bg-yellow-600 max-lg:mr-0">
            Add to Slider
          </button>
        </Link>

        <button
          className="w-[115px] rounded-md border bg-red-500 px-3 py-1 text-white active:bg-red-800 max-lg:mr-0"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>

      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <StyleSheetManager shouldForwardProp={shouldForwardProp}>
          <DataTable
            columns={columns}
            data={articles}
            customStyles={customStyles}
            pagination
          />
        </StyleSheetManager>
      )}
    </>
  );
}
