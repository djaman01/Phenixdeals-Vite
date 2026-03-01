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

  const [articleId, setArticleId] = useState(null); //Pour que quand on clique sur stylo ou cancel, apporte des changements

  const [editedValues, setEditedValues] = useState({}); //Pour changer les valeus de colonnes spécifiques

  const [refreshKey, setRefreshKey] = useState(0);

  const [error, setError] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_URL;
  console.log("API base Url", API_BASE_URL);

  //Authentification: je hardcode l'url https://phenideals-back.. car localhost est en http et ça ne marche pas pour l'authentification
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
  }, [navigate, API_BASE_URL]);

  //Fetch all Articles
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

  //PUT request: When clickink on the pen, it enables us to change the values of the columns
  //"editedValues" stores the values that we want to be able to modify. The value of [row._id] is given swhen we click on the pen so that we know each line we select
  const handleEditClick = (row) => {
    setArticleId(row._id);
    setEditedValues({
      [row._id]: {
        type: row.type || "",
        auteur: row.auteur || "",
        infoArticle: row.infoArticle || "",
        allDescription: row.allDescription || "",
        priceStatus: row.priceStatus || "available",
        prix: row.prix ?? "", //??== If the value is missing on the left (null or undefined), use the value on the right / ||= if the value on the left is falsy, use the value on the right. But if price === 0 it's considered falsy and the column value will be ""; that's why we use ??
        etat: row.etat || "",
        bestDeal: row.bestDeal ?? false, //I don't use || because if bestDeals === false, it'll be treated as falsy, and replace it with the default false. It'll not create a problem, but it's conceptually wrong
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
        `${API_BASE_URL}/deleteArticle/${articleId}`,
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

  const columns = [
    {
      name: "Image", //Column title
      selector: (row) => row.imageCard, //selector=display text values/ cell= custom JSX rendering for images, button or to modify a cell + allow sorting => row.databaseName ex: if we don't use cell to display the image, we would just see the URL of the image
      width: "160px",
      cell: (row) => (
        <img className="my-3" src={row.imageCard} alt={row.auteur} />
      ),
    },

    //Auteur column
    {
      name: "Auteur",
      selector: (row) => row.auteur,
      width: "160px",
      cell: (row) =>
        articleId === row._id ? ( //Si on clique sur le stylo => articleId === row._id donc on peut modifier les valeurs des cases de la row selectionnée
          <input
            value={editedValues[row._id]?.auteur || ""} //editedValues[row._id].auteur === give me the auteur for the row with this _id / We add ?. to protect => If editedValues[row._id] does not exist yet (while re-rendering)
            onChange={(e) =>
              setEditedValues({
                [row._id]: {
                  ...editedValues[row._id], //keep all the properties of this row
                  auteur: e.target.value, //We override the previous auteur value
                },
              })
            }
            className="w-full rounded-md border-2 border-black text-center"
          />
        ) : (
          row.auteur
        ),
    },

    // Type column
    {
      name: "Type",
      selector: (row) => row.type,
      cell: (row) =>
        articleId === row._id ? (
          <input
            value={editedValues[row._id]?.type || ""}
            onChange={(e) =>
              setEditedValues({
                [row._id]: {
                  ...editedValues[row._id],
                  type: e.target.value,
                },
              })
            }
            className="w-full rounded-md border-2 border-black text-center"
          />
        ) : (
          row.type
        ),
    },

    //Dimensions columns for card grid
    {
      name: "Dimensions",
      selector: (row) => row.infoArticle,
      width: "140px",
      cell: (row) =>
        articleId === row._id ? (
          <input
            value={editedValues[row._id]?.infoArticle || ""}
            onChange={(e) =>
              setEditedValues({
                [row._id]: {
                  ...editedValues[row._id],
                  infoArticle: e.target.value,
                },
              })
            }
            className="w-full rounded-md border-2 border-black text-center"
          />
        ) : (
          row.infoArticle
        ),
    },

    //All description column for fiche tableau
    {
      name: "All Infos",
      selector: (row) => row.allDescription,
      width: "180px",
      cell: (row) =>
        articleId === row._id ? (
          <textarea
            rows={3}
            value={editedValues[row._id]?.allDescription || ""}
            onChange={(e) =>
              setEditedValues({
                [row._id]: {
                  ...editedValues[row._id],
                  allDescription: e.target.value,
                },
              })
            }
            className="w-full rounded-md border-2 border-black text-center"
          />
        ) : (
          row.allDescription
        ),
    },

    // Price Status column
    {
      name: "Status",
      selector: (row) => row.priceStatus,
      width: "120px",
      cell: (row) =>
        articleId === row._id ? (
          <select
            value={editedValues[row._id]?.priceStatus ?? "available"} //Because in DB priceStatus is available by default
            onChange={(e) =>
              setEditedValues({
                [row._id]: {
                  ...editedValues[row._id],
                  priceStatus: e.target.value,
                  prix:
                    e.target.value === "available"
                      ? editedValues[row._id].prix ?? ""
                      : "",
                },
              })
            }
          >
            <option value="available">Disponible</option>
            <option value="sold">Vendu</option>
            <option value="onRequest">Prix sur demande</option>
          </select>
        ) : row.priceStatus === "onRequest" ? ( //Obligé pour convertir les value des options en un texte que je veux
          "Prix sur demande"
        ) : row.priceStatus === "sold" ? (
          "Vendu"
        ) : (
          "Disponible"
        ),
    },

    //Prix column
    {
      name: "Prix",
      selector: (row) => row.prix,
      width: "120px",
      sortable: true,
      cell: (row) =>
        articleId === row._id ? (
          <input
            type="number"
            value={editedValues[row._id]?.prix ?? ""} // ?? nullish operator and not || falsy opeartor, because if price === 0 we want to keep it
            disabled={editedValues[row._id]?.priceStatus !== "available"} //Pas de possibilité d'écrire un prix si l'oeuvre n'est pas available
            onChange={(e) =>
              setEditedValues({
                [row._id]: {
                  ...editedValues[row._id],
                  prix: e.target.value,
                },
              })
            }
            className="w-full rounded-md border-2 border-black text-center"
          />
        ) : row.priceStatus === "onRequest" ? (
          "Prix sur demande"
        ) : row.priceStatus == "sold" ? (
          "Vendu"
        ) : (
          row.prix
        ),
    },

    //Best Deal column
    {
      name: "Best Deal",
      selector: (row) => row.bestDeal,
      sortable: true,
      width: "150px",
      cell: (row) =>
        articleId === row._id ? (
          <input
            type="checkbox"
            checked={editedValues[row._id]?.bestDeal ?? false} //"false" = truthy in JS
            onChange={(e) =>
              setEditedValues({
                [row._id]: {
                  ...editedValues[row._id],
                  bestDeal: e.target.checked,
                },
              })
            }
          />
        ) : row.bestDeal ? (
          "Oui"
        ) : (
          "Non"
        ),
    },

    //Etat columns to know if it's Acheter or dépot
    {
      name: "Propriété",
      selector: (row) => row.etat,
      width: "180px",
      sortable: true,
      cell: (row) =>
        articleId === row._id ? (
          <input
            value={editedValues[row._id]?.etat || ""}
            onChange={(e) =>
              setEditedValues({
                [row._id]: {
                  ...editedValues[row._id],
                  etat: e.target.value,
                },
              })
            }
            className="w-full rounded-md border-2 border-black text-center"
          />
        ) : (
          row.etat
        ),
    },

    // Code column without modifications
    {
      name: "Code",
      selector: (row) => row.code,
    },

    //Code column is unique so i'll not make it editable to avoid mistakes

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
