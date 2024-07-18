import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect, useState } from "react";

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

  return (
    <>
      <Header />
      <div className="padding">
        <div className="martian-mono mb-10 text-center text-3xl text-[#FA7A35]">
          <h1>Tous les Artistes</h1>
        </div>

        <div className="text-center my-20">
        { (artists) ? (
          <ul>
            {artists.map((e, index) => (
              <li key={index}>{e.auteur}</li>
            ))}
          </ul>
        ) : (
          <p>{error || "Chargement en cours..."}</p>
        )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllArtists;
