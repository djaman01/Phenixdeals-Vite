import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { SlMagnifier } from "react-icons/sl";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

import { PulseLoader } from "react-spinners";

const AllArtists = () => {
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState("");

  const [spinner, setSpinner] = useState(true); //State pour afficher le spinner lors du chargement des données à partir de la base de donnée

  // Access API base URL from env
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchAllArtists = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/allArtists`);
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
  }, [API_BASE_URL]);

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
        {/* Balise pour gérer le responsive quelque soit la taille de l'écran:  */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        <title>Tous les Artistes | Phenix Deals</title>

        <meta
          name="description"
          content="Découvrez la liste complète des artistes sur Phenixdeals.com. Cliquez sur un artiste pour voir ses oeuvres disponibles à la vente"
        />

        {/* <meta
          name="keywords"
          content="Artistes, Phenix Deals, Acheter Art, Art à vendre, Collections d'art"
          //Balise qui n'est plus utilisé aujourd'hui par les nouveaux moteurs de recherche, qui se basent plus sur les balise title et meta description bien rédigées
        /> */}

        <meta property="og:type" content="website" />

        <meta property="og:title" content="Tous les Artistes | Phenix Deals" />

        <meta
          property="og:url"
          content="https://www.phenixdeals.com/allArtists"
        />

        <meta
          property="og:description"
          content="Découvrez la liste complète des artistes sur Phenixdeals.com. Cliquez sur un artiste pour voir ses oeuvres disponibles à la vente"
        />
        <meta
          property="og:image"
          content="https://www.phenixdeals.com/assets/phenix-nobg-gGMQJlPS.png"
        />

        <link rel="canonical" href="https://www.phenixdeals.com/allArtists" />
      </Helmet>

      <div className="mt-2">
        <Header />
      </div>

      <div className="padding">
        <section className="mb-4 mt-6 text-center">
          <h1 className="martian-mono mb-2 bg-gradient-to-r from-[#B5121B] via-[#FA7A35] to-[#F7C331] bg-clip-text text-3xl text-transparent max-lg:mb-1 max-lg:text-[27px] max-lg:mx-[-10px] ">
            Tous les Artistes
          </h1>
          <p className="mx-2 font-roboto text-xl text-gray-800">
            <strong>Cliquez</strong> sur un nom d'artiste pour découvrir toutes ses
            oeuvres disponibles à la vente
          </p>
        </section>

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
                          className="hover:text-slate-gray active:text-green-500"
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
