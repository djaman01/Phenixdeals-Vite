import ArticleCategory from "./ArticleCategory";

const Decoration = () => {
  return (
    <>
      <ArticleCategory
        placeholder="Type d'objet: table/vase/miroir..."
        type="decorations"
        title="Tous les Objets de Décoration"
        showSearchInput={true}
        typeObjet="Vase, Fauteuil, Tapis..."
      />
    </>
  );
};

export default Decoration;
