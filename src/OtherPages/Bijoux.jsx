import ArticleCategory from "./ArticleCategory";

const Bijoux = () => {
  return (
    <>
      <ArticleCategory
        type="bijoux"
        title="Tous les Bijoux"
        placeholder="Type de Bijoux: bracelet/bague/collier..."
        showSearchInput={true}
        typeObjet='Bague, Bracelet, Collier...'

      />

    
    </>
  );
};
export default Bijoux;
