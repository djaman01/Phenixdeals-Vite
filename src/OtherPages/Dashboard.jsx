import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component"

import { StyleSheetManager } from 'styled-components'; //Pour eviter les erreurs de styled props dans la console

import { FaRegPenToSquare } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import Header from "../components/Header";
import { Link } from "react-router-dom";



export default function Dashboard() {


  const [articles, setArticles] = useState([]); //A mettre dans data attribute du <DataTable /> Component dans return
  const [error, setError] = useState('') 

  useEffect(() => {
    axios
      .get(`http://localhost:3005/allArticles`)
      .then((response) => {
        setArticles(response.data);
        console.log("All articles fetched", response.data);
      })
      .catch((error) => {
        console.error(
          error.response //si error.response = error from the server
            ? `${error.response.status}: ${error.response.data.message}` //server side error
            : `Error: ${error.message}`, //client-side error
        );
        setError("An error occurred while fetching data"); 
      });
  }, [articles]); //[articles] va appeler GET a chaque changement dans la state products, donc quand on va faire un chgt dans un produit, ça va réafficher le chgt sans actualiser la page

  
  //Pour PUT request et modifier certains élements selectionnés
  const [articlePrice, setArticlePrice] = useState('');
  const [articleInfos, setArticleInfos] = useState('');

  //Pour que quand on clique sur stylo ou cancel, apporte des changements
  const [articleId, setArticleId] = useState(null);

  //Function to set the articleId and initial values for infoArticle and price
  const handleEditClick = (row) => {
    setArticleId(row._id);  //Pour définir qu'on voit l'input quand on clique sur le stylo ou cancel
    setArticleInfos(row.infoArticle);
    setArticlePrice(row.prix);
  };

  //On donne aux VALEURS de la propriété prix de la database, les 2 states variables précédentes que l'on peut changer
  const updatedProductData = {
    prix: articlePrice,
    infoArticle: articleInfos
  }
  //C'est le bouton update qui doit appeler cette function, avec pour argument row._id, pour appliquer la modif.
  const handleUpdates = (articleId) => {
    axios.put(`http://localhost:3005/putDash/${articleId}`, updatedProductData)
      .then((response) => {
        console.log(response.data)//Montre ce qu'on a codé dans le server: res.json({message:'', stateProduc}), dans la console du browser
        setArticleId(null);
      })
      .catch((error) => {
        console.error("Front-end error:", error.message);
      })
      .catch((error) => { console.error( error.response &&
          `${error.response.status}: ${error.response.data.message}`
        );
      });
      
  }

  //Pour DELETE request et supprimer un élement selectionné; donc stocker l'arrow function dans une variable qu'on va appeler avec un paramètre pour cibler le produit

  const handleDelete = (articleId) => {
    axios.delete(`http://localhost:3005/deleteArticle/${articleId}`)
      .then((response) => {
        setArticles(articles.filter((article) => article._id !== articleId)) //productId a pour valeur l'id du produit, donc on le compare à element._id
        console.log(response.data); //message = property codé dans res.status(200).json({message:""}) = ok dans le server
      })
      .catch((error) => {
        console.error("Front-end error or unexpected issue:", error.message);
      })
      .catch((error) => { console.error( error.response &&
        `${error.response.status}: ${error.response.data.message}`
      );
    });
  }

  //Création database avec npm react data table component--------------------------------------
  const columns = [
    {
      name: 'Image',
      selector: row => row.imageUrl,//même nom que dans base de donnée pour extraire info
      cell: row => <img className='my-3' src={`http://localhost:3005/${row.imageUrl}`} alt={row.auteur} />
    },
    {
      name: 'Auteur',
      selector: row => row.auteur,
      sortable: true, //Pour ordonner par ordre alphabétic ou l'inverse
    },
    {
      name: 'Type',
      selector: row => row.type,
    },

    {
      name: 'info Article',
      selector: row => row.infoArticle,
      cell: row => articleId=== row._id ?
      <div>
        <input 
          placeholder="New infos" 
          value={articleInfos}
          onChange={(e)=> setArticleInfos(e.target.value)}
         className="border-2 border-black rounded-md text-center"
          />
      </div>
      :
      row.infoArticle
    },

    {
      name: 'Propriété',
      selector: row => row.etat,
    },
   
    {
      name: 'Prix',
      selector: row => row.prix,
      //Objectif: Quand on clique sur stylo: articleId===row._id => Donc si articleId===row._id fait apparaitre un input pour changer la valeur, sinon on ne voit que le prix
      cell: row => articleId === row._id ?
        <div>
          <input
            placeholder="New Price"
            value={articlePrice}
            onChange={(e) => setArticlePrice(e.target.value)} //productPrice se met à jour en même temps que ce qu'on écrit dans l'input
            className="border-2 border-black rounded-md text-center"
          />
        </div>
        :
        row.prix
    },

    {
      name: 'Actions',
      selector: row => row._id,//_id donné par MongoDB: Pour selectionner 1 produit spécifique

      //Obligé de faire dans cet ordre pour que ça n’affecte que la row selectionnée
      cell: row => articleId === row._id ?
        <div className=" h-20 flex flex-col items-center justify-around">
          <p className=" bg-green-500 w-[66px] text-center py-1 px-2 rounded-md text-white font-medium active:bg-green-800" role="button" onClick={() => handleUpdates(row._id)}>
            Update 
          </p>
          <p className=" bg-red-500 w-[66px] text-center py-1 px-2 rounded-md text-white font-medium active:bg-red-800" role="button" onClick={() => setArticleId(null)} >
            Cancel
          </p>
        </div>
        :
        <div className="flex w-[70px] justify-around cursor-pointer">
          <FaRegPenToSquare size={17} onClick={() => handleEditClick(row)} />  {/* Click sur stylo= appel function handleEditClick avec argument row selectionnée*/}
          <FaRegTrashAlt size={17} onClick={() => handleDelete(row._id)} />
        </div>

    },
  ];

  const shouldForwardProp = (prop) => prop !== 'sortActive'; //Pour éviter les erreurs des styled components, dans la console

  //Pour donner un style aux titre et aux contenus des colonnes (voir customStyles property de la dataTable Component après return)
  const customStyles = {
    headCells: {
      style: {
        justifyContent: 'center',
        fontSize: '20px',
        marginTop: '90px',
        fontWeight: 'bold',
        color:'blue'
      }
    },

    cells: {
      style: {
        justifyContent:'center',
        fontSize: '15px',
        fontWeight: 'bold'
      }
    }
  }
  
  return (
    <>
    
    <Header />

    <div className="flex justify-center text-lg mt-5">
      <Link to="/">
        <button className="w-[115px] mr-52 border bg-green-500 py-1 px-3 rounded-md text-white active:bg-green-800">
          Accueil
        </button>
      </Link>

      <Link to="/addArticle">
        <button className="w-[115px] mr-52 border bg-blue-500 py-1 px-3 rounded-md text-white active:bg-blue-800">
          Add Article
        </button>
      </Link>

      <button className="w-[115px] border bg-red-500 py-1 px-3 rounded-md text-white active:bg-red-800">
        Log Out
      </button>
   
    </div>
    
      {error ? <p style={{ color: 'red' }}>{error}</p> :

        <StyleSheetManager shouldForwardProp={shouldForwardProp}>
          <DataTable
            columns={columns}
            data={articles}
            customStyles={customStyles}
            pagination
          />
        </StyleSheetManager>
      }
    </>

  )
}
