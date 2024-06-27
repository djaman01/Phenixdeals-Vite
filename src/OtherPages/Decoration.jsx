import Footer from "../components/Footer";
import ArticleCategory from "./ArticleCategory";

const Decoration = () => {
  return (
    <>
      <ArticleCategory
        placeholder="Type d'objet: table/vase/miroir..."
        type="decorations"
        title="Tous les Objets de Décoration"
        searchKey="infoArticle"
      />

      <Footer />
    </>
  );
};

export default Decoration;
