import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SlMagnifier } from "react-icons/sl";
import { Helmet } from "react-helmet-async";

import { PulseLoader } from "react-spinners";

const AllArtists = () => {
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState("");

  const [spinner, setSpinner] = useState(true); //State pour afficher le spinner lors du chargement des données à partir de la base de donnée

  useEffect(() => {
    const fetchAllArtists = async () => {
      try {
        const response = await axios.get(
          `https://phenixdeals-back.onrender.com/allArtists`,
        );
        setArtists(response.data);
        console.log("All artists fetched", response.data);
      } catch (error) {
        console.error(
          error.response //si error.response = error from the server
            ? `${error.response.status}: ${error.response.data.message}` //server side error
            : `Error: ${error.message}`, //client-side error
        );
        setError("An error occurred while fetching data"); //apparait sur la page si erreur
      } finally {
        setSpinner(false); //Après avoir fecth les données setLoading devient false pour afficher les tableaux au lieu du spinner
      }
    };

    fetchAllArtists();
  }, []);

  //state qui va store la value de l'input
  const [artistName, setArtistName] = useState("");

  //Donne la value à la state artistName = valeur qu'on écrit dans l'input (donc attribut value de l'input ={artistName})
  const handleArtistName = (e) => setArtistName(e.target.value);

  //Array operation pour transformer l'array artists sur laquelle on va Mapper, en array qui ne va inclure que les noms des artistes qui contiennent les lettres qu'on écrit dans l'input = valeur de artistName = (donc si on n'écrit rien dans l'input, on voit tous les noms d'artiste)
  const filteredArtistNames = artists.filter((e) =>
    e.auteur.toLowerCase().includes(artistName.toLowerCase()),
  );

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>Tous les Artistes | Phenix-deals</title>

        <meta
          name="description"
          content="Découvrez la liste complète de tous les artistes disponibles sur Phenix-deals.com. Cliquez sur un artiste pour voir ses tableaux disponibles à la vente"
        />

        {/* <meta
          name="keywords"
          content="Artistes, Phenix Deals, Acheter Art, Art à vendre, Collections d'art"
          //Balise qui n'est plus utilisé aujourd'hui par les nouveaux moteurs de recherche, qui se basent plus sur les balise title et meta description bien rédigées
        /> */}

        <meta property="og:type" content="website" />

        <meta property="og:title" content="Tous les Artistes | Phenix-deals" />

        <meta
          property="og:url"
          content="https://www.phenix-deals.com/allArtists"
        />

        <meta
          property="og:description"
          content="Découvrez la liste complète de tous les artistes disponibles sur Phenix-deals.com. Cliquez sur un artiste pour voir ses tableaux disponibles à la vente"
        />
        <meta
          property="og:image"
          content="https://www.phenix-deals.com/assets/phenix-nobg-gGMQJlPS.png"
        />

        <link rel="canonical" href="https://www.phenix-deals.com/allArtists" />
      </Helmet>

      <div className="mt-3">
        <Header />
      </div>

      <div className="padding">
        <div className="martian-mono mb-[42px] text-center text-3xl text-[#FA7A35]">
          <h1>Tous les Artistes</h1>
        </div>

        <div className="relative mx-auto mb-9 w-1/4 max-lg:w-3/4">
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
          ) : spinner ? ( //Affichage du spinner si 'spinner' state = true
            <div className="my-20 flex items-center justify-center">
              <PulseLoader color="#FA7A35" size={40} />
            </div>
          ) : (
            Object.keys(groupedArtists) //Object.keys permet de créer une array avec les properties = keys de l'objet groupedArtists crée précédemment avec .reduce
              .sort() //Même si tout est déjà dans l'ordre, ça ajoute une confirmation
              .map((letter) => (
                <div key={letter} className="mb-5">
                  <h2 className="text-2xl text-blue-800">{letter}</h2>
                  {/* On fait <ul> pour ne pas qu'il y ait de point avant chaque nom d'artiste */}
                  <ul>
                    {/*On refait un .map sur groupedArtists car avant on mapper sur une array avec que les key, alors que là on a besoin de la value auteur:"" pour chaque Key c'est pourquoi on fait groupedArtists[letter] */}
                    {groupedArtists[letter].map((e, index) => (
                      <li key={index}>
                        <Link
                          to={`/pageArtist/${e.auteur}`}
                          onClick={scrollToTop}
                        >
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

      <div className="pt-8">
        <Footer />
      </div>
    </>
  );
};

export default AllArtists;
