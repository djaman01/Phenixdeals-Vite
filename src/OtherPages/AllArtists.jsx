import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SlMagnifier } from "react-icons/sl";

const AllArtists = () => {
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3005/allArtists`) //3005 car dans le back-end on a set up the server to listen on the port = 3005
      .then((response) => {
        setArtists(response.data);
        console.log("All artists fetched", response.data);
      })
      .catch((error) => {
        console.error(
          error.response //si error.response = error from the server
            ? `${error.response.status}: ${error.response.data.message}` //server side error
            : `Error: ${error.message}`, //client-side error
        );
        setError("An error occurred while fetching data"); //apparait sur la page si erreur
      });
  }, []);

  //state qui va store la value de l'input
  const [artistName, setArtistName] = useState("");

  //Donne la value à la state artistName = valeur qu'on écrit dans l'input (donc attribut value de l'input ={artistName})
  const handleArtistName = (e) => setArtistName(e.target.value);

  //Array operation pour transformer l'array artists sur laquelle on va Mapper, en array qui ne va inclure que les noms des artistes qui contiennent les lettres qu'on écrit dans l'input = valeur de artistName = (donc si on n'écrit rien dans l'input, on voit tous les noms d'artiste)
  const filteredArtistNames = artists.filter((e)=>e.auteur.toLowerCase().includes(artistName.toLowerCase()))


  //Array Operation: Group artists by the first letter of their name: On utilise filteredArtistNames, car après return on ne veut mapper que sur les noms d'artistes qui contiennent les lettres qu'on écrit dans l'input (donc si on n'écrit rien dans l'input, on voit tous les noms d'artiste)
  const groupedArtists = filteredArtistNames.reduce((acc, curr) => {
    // curr = élément actuel de l'array 'artists' sur lequel la fonction va être appliquée
    const firstLetter = curr.auteur[0].toUpperCase(); // Accède à la 1ère lettre du nom de l'artiste qui a pour property 'auteur' (voir model-doc.js dans back-end)

    // Si acc[firstLetter] n'existe pas encore, l'initialiser avec un tableau vide, sinon passe à l'étape suivante d'ajout du nom de l'artiste dans l'array déjà existante
    !acc[firstLetter] && (acc[firstLetter] = []); // Si acc["A"] undefined alors acc["A"] = [] est exécuté, donc acc devient { "A": [] }.

    //acc["A"]=[]; donc on ajoute le nom de l'artiste à l'array de "A" => { "A": [{auteur: "Abbas Saladi"}] }.
    acc[firstLetter].push(curr);

    // Retourner l'accumulateur pour la prochaine itération
    return acc;
  }, {}); // !!! {} On initialise l'accumulateur comme un objet vide


  return (
    <>
      <Header />
      <div className="padding">
        <div className="martian-mono mb-10 text-center text-3xl text-[#FA7A35]">
          <h1>Tous les Artistes</h1>
        </div>

        <div className="relative mx-auto mt-4 w-1/4 max-lg:w-3/4 mb-9">
          <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform text-gray-500">
            <SlMagnifier color="black" />
          </div>

          <input
            type="text"
            className="relative w-full rounded-full border border-gray-400 py-3 pl-12 transition duration-150 ease-in-out hover:shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500 max-lg:pl-10"
            placeholder="Nom de l'artiste"
            value={artistName}
            onChange={handleArtistName}
          />
        </div>

        <div className="text-center">
          {error ? (
            <p>Error: {error}</p>
          ) : (
            Object.keys(groupedArtists) //Object.keys permet de créer une array avec les properties = keys de l'objet groupedArtists crée précédemment avec .reduce
              .sort() //Même si tout est déjà dans l'ordre, ça ajoute une confirmation
              .map((letter) => (
                <div key={letter} className="mb-5">
                  <h2 className="text-2xl text-blue-800">{letter}</h2>
                  {/* On fait <ul> pour ne pas qu'il y ait de point avant chaque nom d'artiste */}
                  <ul>
                    {groupedArtists[letter].map(
                      (
                        e,
                        index, //On refait un .map sur groupedArtists car avant on mapper sur une array avec que les key, alors que là on a besoin de la value auteur:"" pour chaque Key c'est pourquoi on fait groupedArtists[letter]
                      ) => (
                        <li key={index}>
                          <Link to={`/pageArtist/${e.auteur}`}>{e.auteur}</Link>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllArtists;
