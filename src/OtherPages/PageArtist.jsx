import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

const PageArtist = () => {
  const { auteur } = useParams();

  const [oeuvre, setOeuvre] = useState([]);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3005/pageArtist/${auteur}`)
      .then((response) => {
        setOeuvre(response.data);
        console.log("Oeuvre Fetched", response.data);
      })
      .catch((error) => {
        console.error(
          error.response
            ? `${error.response.status}: ${error.response.data.message}` //server-side error
            : `Error: ${error.message}`, //client-side error
        );
        setErrorText("An error occurred while fetching data");
      });
  }, [auteur]);

  return (
    <>
      <Header />

      {errorText ? (
        <p>Error: {errorText}</p>
      ) : (
        oeuvre.map((e, index) => (
          <h1 key={index}>{e.auteur}</h1>
        ))
      )}

      <Footer />
    </>
  );
};

export default PageArtist;
