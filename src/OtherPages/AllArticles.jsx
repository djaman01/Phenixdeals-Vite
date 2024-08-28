import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import CardGrid from "../components/CardGrid";
import Footer from "../components/Footer";



const AllArticles = () => {
  
  const [article, setArticle] = useState([]);
  const [error, setError] = useState("");


useEffect(() => {

  const fetchAllArticles = async () => {

    try {
      const response = await axios.get (`http://localhost:3005/allArticles`);
      setArticle(response.data);
      console.log("All articles fetched: ", response.data);
    } 
    catch (error) {
      console.error(
        error.response //si error.response = error from the server
          ? `${error.response.status}: ${error.response.data.message}` //server side error
          : `Error: ${error.message}`, //client-side error
      );
      setError("An error occurred while fetching data"); //apparait sur la page web si erreur
    }
  }

  fetchAllArticles();
 
}, [])



  const [articleType, setArticleType] = useState("");

  const handleArticleType = (e) => setArticleType(e.target.value);

  const filteredArticles = article.filter((e) =>
    e.type.toLowerCase().includes(articleType.toLowerCase()),
  );
  return (
    <>
    <Header />

    
      <CardGrid
        title="Tous les Articles "
        placeholder="Tableau / Bijou / Décoration"
        value={articleType}
        onChange={handleArticleType}
        error={error}
        filteredArticles={filteredArticles}
      />
    

    <Footer />
  </>
  )
}

export default AllArticles