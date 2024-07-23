import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

  //Array Operation: Group artists by the first letter of their name (les noms des artistes sont dans l'array artists)
  const groupedArtists = artists.reduce((acc, curr) => {// curr = élément actuel de l'array 'artists' sur lequel la fonction va être appliquée
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

        <div className="text-center">
          {error ? (
            <p>Error: {error}</p>
          ) : (
            Object.keys(groupedArtists) //Object.keys permet de créer une array avec les properties = keys de l'objet groupedArtists crée précédemment avec .reduce
              .sort() //Même si tout est déjà dans l'ordre, ça ajoute une confirmation
              .map((letter) => (
                <div key={letter} className="mb-5">
                  <h2 className="text-2xl">{letter}</h2>
                  {/* On fait <ul> pour ne pas qu'il y ait de point avant chaque nom d'artiste */}
                  <ul>
                    {groupedArtists[letter].map((e, index) => ( //On refait un .map sur groupedArtists car avant on mapper sur une array avec que les key, alors que là on a besoin de la value auteur:"" pour chaque Key c'est pourquoi on fait groupedArtists[letter]
                      <li key={index}>
                        <Link  to={`/pageArtist/${e.auteur}`} >
                          {e.auteur}
                        </Link>
                      </li>
                    ))}
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

