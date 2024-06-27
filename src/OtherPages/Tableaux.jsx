import Footer from "../components/Footer";
import ArticleCategory from "./ArticleCategory";

const Tableaux = () => {
  return (
    <>
      <ArticleCategory
        placeholder="Nom de l'artiste"
        type="tableaux"
        title="Tous les Tableaux"
        searchKey="auteur"
      />

      <Footer />
    </>
  );
};

export default Tableaux;
