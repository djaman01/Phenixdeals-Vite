import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { StyleSheetManager } from "styled-components"; // Pour éviter les erreurs de styled props
import Header from "../components/Header";

export default function Dashboard() {
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  // Track which row is being edited and its field values
  const [articleId, setArticleId] = useState(null);
  const [editValues, setEditValues] = useState({});

  // Authenticate
  useEffect(() => {
    const authenticate = async () => {
      try {
        const res = await axios.get(
          "https://phenixdeals-back.onrender.com/authentication",
        );
        if (res.data.message !== "Authenticated") navigate("/");
      } catch (err) {
        console.error("Authentication error:", err);
        navigate("/");
      }
    };
    authenticate();
  }, [navigate]);

  // Fetch articles
  useEffect(() => {
    const fetchAllArticles = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/allArticles`);
        setArticles(res.data);
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching data");
      }
    };
    fetchAllArticles();
  }, [refreshKey, API_BASE_URL]);

  // Edit click: initialize values for this row
  const handleEditClick = (row) => {
    setArticleId(row._id);
    setEditValues({
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

  // Update article
  const handleUpdates = async (id) => {
    const updatedProductData = editValues[id];
    try {
      await axios.put(`${API_BASE_URL}/putDash/${id}`, updatedProductData);
      setArticleId(null);
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // Delete article
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?"))
      return;
    try {
      await axios.delete(`${API_BASE_URL}/deleteArticle/${id}`);
      setArticles(articles.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      const res = await axios.get(
        "https://phenixdeals-back.onrender.com/logout",
      );
      if (res.data.status === "Success") navigate("/");
      else console.log("Logout failed:", res.data.message);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Columns for DataTable
  const columns = [
    {
      name: "Image",
      selector: (row) => row.imageUrl,
      cell: (row) => (
        <img className="my-3" src={row.imageUrl} alt={row.auteur} />
      ),
    },
    ...[
      "auteur",
      "type",
      "infoArticle",
      "allDescription",
      "prix",
      "bestDeal",
      "code",
    ].map((field) => ({
      name: field.charAt(0).toUpperCase() + field.slice(1),
      selector: (row) => row[field],
      sortable: true,
      cell: (row) =>
        articleId === row._id ? (
          <input
            value={editValues[row._id]?.[field] || ""}
            onChange={(e) =>
              setEditValues({
                ...editValues,
                [row._id]: { ...editValues[row._id], [field]: e.target.value },
              })
            }
            className="w-full rounded-md border-2 border-black text-center"
          />
        ) : (
          row[field]
        ),
    })),
    {
      name: "Propriété",
      selector: (row) => row.etat,
      sortable: true,
    },
    {
      name: "Actions",
      selector: (row) => row._id,
      cell: (row) =>
        articleId === row._id ? (
          <div className="flex flex-col items-center justify-around">
            <button
              className="w-[66px] rounded-md bg-green-500 py-1 text-white"
              onClick={() => handleUpdates(row._id)}
            >
              Update
            </button>
            <button
              className="w-[66px] rounded-md bg-red-500 py-1 text-white"
              onClick={() => setArticleId(null)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex w-[70px] cursor-pointer justify-around">
            <FaRegPenToSquare size={17} onClick={() => handleEditClick(row)} />
            <FaRegTrashAlt size={17} onClick={() => handleDelete(row._id)} />
          </div>
        ),
    },
  ];

  const shouldForwardProp = (prop) => prop !== "sortActive";

  const customStyles = {
    headCells: {
      style: {
        justifyContent: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: "blue",
      },
    },
    cells: {
      style: { justifyContent: "center", fontSize: 15, fontWeight: "bold" },
    },
  };

  return (
    <>
      <Header />
      <div className="mt-5 flex justify-center text-lg max-lg:flex-col max-lg:items-center max-lg:gap-4">
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
