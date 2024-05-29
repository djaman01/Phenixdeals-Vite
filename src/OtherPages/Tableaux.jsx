import Footer from "../components/Footer";
import ArticleCategory from "./ArticleCategory";

const Tableaux = () => {
  return (
    <>
      <ArticleCategory
        type="tableaux"
        title="Tous les Tableaux"
        searchKey="auteur"
      />

      <Footer />
    </>
  );
};

export default Tableaux;
