import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

const FicheArticle = () => {
  //Dans Card.jsx on a définit une dynamix route = URL avec un parmètre qui change en fonction du produit et qui est _id du produit, donc unique
  //Avec useParams, on va extraire ce paramètre qui est unique, pour définir une route dynamic dans le back-end
  const { articleId } = useParams();

  //State qui va store l'article désigné dans la fiche
  const [article, setArticle] = useState(null);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3005/article/${articleId}`)
      .then((response) => {
        setArticle(response.data);
        console.log("Article Fetched", response.data);
      })
      .catch((error) => {
        console.error(
          error.response
            ? `${error.response.status}: ${error.response.data.message}` //server-side error
            : `Error: ${error.message}`, //client-side error
        );
        setErrorText("An error occurred while fetching data");
      });
  }, [articleId]);

  return (
    <>
      <Header />

      <div>
        {errorText ? (
          <p>Error: {errorText}</p>
        ) : (
          article && (
            <div>
              <img
                src={`http://localhost:3005/${article.imageUrl}`}
                alt={article.infoArticle}
              />
            </div>
          )
        )}
      </div>

      <Footer />
    </>
  );
};

export default FicheArticle;
