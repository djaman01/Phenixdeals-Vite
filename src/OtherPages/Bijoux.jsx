import Footer from "../components/Footer";
import ArticleCategory from "./ArticleCategory";

const Bijoux = () => {
  return (
    <>
      <ArticleCategory
        type="bijoux"
        title="Tous les Bijoux"
        searchKey="infoArticle"
        placeholder="Type de Bijoux: bracelet/bague/collier..."
      />

      <Footer />
    </>
  );
};
export default Bijoux;
