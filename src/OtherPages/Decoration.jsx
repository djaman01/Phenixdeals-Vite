import Footer from "../components/Footer";
import ArticleCategory from "./ArticleCategory";

const Decoration = () => {
  return (
    <>
      <ArticleCategory
        type="decorations"
        title="Tous les Objets de Décoration"
        searchKey="auteur"
      />

      <Footer />
    </>
  );
};

export default Decoration;
