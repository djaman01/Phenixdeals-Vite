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
      <div className="flex h-screen items-center bg-[#e8e8e8]">
        <div className="ml-56">
          {errorText ? (
            <p>Error: {errorText}</p>
          ) : (
            article && (
              <div className="flex gap-16">
                <div className="h-[500px] w-[500px]">
                  <img
                    src={`http://localhost:3005/${article.imageUrl}`}
                    alt={article.infoArticle}
                    className="h-full w-full bg-white object-contain"
                  />
                </div>

                <div className="prose flex w-[500px] flex-col items-center rounded-lg border border-gray-300 bg-white p-6 shadow-md">
                  <h1 className="mt-10 text-[#0072B5] ">{article.auteur}</h1>
                  <hr className="my-0 w-11/12 border-gray-500" />
                  <h2 className="my-3">{article.infoArticle}</h2>
                  <hr className="my-0 w-11/12 border-gray-500" />
                  <h2 className="my-3 text-[#00A170]">{article.prix}</h2>
                  <hr className="my-0 w-11/12 border-gray-500" />
                  <h3 className="martian-mono-regular my-3 text-[#ff0921] ">
                    Réf: {article.code}
                  </h3>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FicheArticle;
