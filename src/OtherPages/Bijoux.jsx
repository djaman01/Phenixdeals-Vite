import Footer from "../components/Footer";
import ArticleCategory from "./ArticleCategory";

const Bijoux = () => {
  return (
    <>
      <ArticleCategory
        type="bijoux"
        title="Tous les Bijoux"
        searchKey="auteur"
        placeholder="Type de Bijoux"
      />

      <Footer />
    </>
  );
};
export default Bijoux;
