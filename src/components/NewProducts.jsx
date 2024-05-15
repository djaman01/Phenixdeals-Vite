import { useEffect, useState } from "react";
import CardGrid from "../HomeSections/CardGrid";
import axios from "axios";

const NewProducts = () => {
  
  const [productObject, setProductObject] = useState([]); //State variable ou on va store tous les objets représentants les articles
  const [error, setError] = useState('');

  const [productType, setProductType] = useState('');//Pour searchBar: State variable qui va store la value de l'input et qui doit changer en fonction de ce qu'on écrit

  const handleProductType = (e) => setProductType(e.target.value); //ca c'est l'event handler qui fait que la state productType a pour valeur la value de l'input


  useEffect(() => {
    const fetchData = () => {
      axios.get('http://localhost:3005/homeProducts?limit=20') // Add the query parameter for limiting the results
        .then((response) => {
          console.log("Last 20 products fetched", response.data);
          setProductObject(response.data);
        })
        .catch((error) => {
          setError('An error occurred while fetching data.');
        });
    };

    fetchData();
  }, []);


  const filteredProducts = productObject.filter((item) =>
    item.type.toLowerCase().includes(productType.toLowerCase())
  );

  return (
    <section>
      <CardGrid 
        title="Les 20 Nouveaux Articles" 
        value={productType}
        onChange={handleProductType}
        error={error}
        filteredProducts={filteredProducts}
      />
    </section>
  );
};

export default NewProducts;
