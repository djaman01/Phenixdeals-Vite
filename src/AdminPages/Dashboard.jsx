import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component"

import { StyleSheetManager } from 'styled-components'; //Pour eviter les erreurs de styled props dans la console

import { FaRegPenToSquare } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";


export default function Dashboard() {

  const navigate = useNavigate()

  const [articles, setArticles] = useState([]); //A mettre dans data attribute du <DataTable /> Component dans return
  const [error, setError] = useState('') 

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const authenticate = async () => {
      try {
        const response = await axios.get('http://localhost:3005/authentication', {withCredentials: true}); //xithCredentials:true => Include cookies in the request
        if (response.data.message !== "Authenticated") {
          navigate('/');
        }
      } 
      catch (error) {
        console.error('Error during authentication:', 
          error.response 
            ? `${error.response.status}: ${error.response.data.message}` // Server-side error
            : error.message // Client-side error
        );
        navigate('/'); // If authentication failure, redirect to HomePage
      }
    };
  
    authenticate();
  }, [navigate]); 

  
  useEffect(() => {

    const fetchAllArticles = async () => {
      try {
        const response = await axios.get('http://localhost:3005/allArticles');
        setArticles(response.data);
        console.log('All articles fetched', response.data);
      } 

      catch (error) {
        console.error(
          error.response
            ? `${error.response.status}: ${error.response.data.message}` // Server-side error
            : `Error: ${error.message}` // Client-side error
        );
        setError('An error occurred while fetching data');
      }
    };

    fetchAllArticles();

  }, [refreshKey]); // The effect will run whenever refreshKey changes

  
  //Pour PUT request et modifier certains élements selectionnés
  const [articlePrice, setArticlePrice] = useState('');
  const [articleInfos, setArticleInfos] = useState('');

  //Pour que quand on clique sur stylo ou cancel, apporte des changements
  const [articleId, setArticleId] = useState(null);

  //Pour changer la valeur de l'id, la valeur de infoArticle et le prix
  const handleEditClick = (row) => {
    setArticleId(row._id);  //Pour voir un input pour modifier les valeurs, après avoir cliquer sur le stylo ou cancel
    setArticleInfos(row.infoArticle); //Modification de infoArticle
    setArticlePrice(row.prix); //Modification du prix
  };

  //On donne aux VALEURS de la propriété prix et infoArticle de la database, les 2 states variables précédentes que l'on va changer
  const updatedProductData = {
    prix: articlePrice,
    infoArticle: articleInfos
  }

  //PUT Request: Pour appliquer les modification dans updatedProductData; le paramètre articleId aura pour valeur row._id
  const handleUpdates = async (articleId) => {
    try {
      const response = await axios.put(`http://localhost:3005/putDash/${articleId}`, updatedProductData);
      console.log(response.data); // Show what was sent from the server: res.json({message:'', stateProduct}), in the browser console
      setArticleId(null); // Reset articleId to show the pencil and trash icons again after update
      setRefreshKey(prevKey => prevKey + 1); // Increment refreshKey to trigger re-fetching of data and update the page without refreshing
    } 

    catch (error) {
      console.error("Error during update:", 
        error.response 
          ? `${error.response.status}: ${error.response.data.message}` // Server-side error
          : error.message // Client-side error
      );
    }
  };


  //Pour DELETE request et supprimer un élement selectionné; donc stocker l'arrow function dans une variable qu'on va appeler avec un paramètre pour cibler le produit
  const handleDelete = async (articleId) => {
    try {
      const response = await axios.delete(`http://localhost:3005/deleteArticle/${articleId}`);
      setArticles(articles.filter((article) => article._id !== articleId)); // Remove the deleted article from the state
      console.log(response.data); // Log the server's response message
    } 

    catch (error) {
      console.error("Error during delete operation:", 
        error.response 
          ? `${error.response.status}: ${error.response.data.message}` // Server-side error
          : error.message // Client-side error
      );
    }
  };
  

//Get Request to logout


const handleLogout = async () => {
  try {
    const response = await axios.get('http://localhost:3005/logout');

    if (response.data.status === "Success") {
  
      navigate('/'); // Redirect to home page after loging out
    } else {
      console.log(`Logout Failed: ${response.data.message}`);
    }
  } 
  
  catch (error) {
    console.error('Logout Error:', error);
  }
};


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

      <button
       className="w-[115px] border bg-red-500 py-1 px-3 rounded-md text-white active:bg-red-800"
       onClick={handleLogout}
       >
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
