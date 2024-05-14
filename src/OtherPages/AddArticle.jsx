import axios from "axios";
import Dropzone from "react-dropzone";
import Header from "../components/Header";
import { useState } from "react";

const AddArticle = () => {
  //Comme il y a l'image, faire un state avec un objet comme dans contact ne va pas marcher
  const [imageUrl, setImageUrl] = useState(""); //setImage dans dropzone
  const [auteur, setAuteur] = useState(""); //setAuteur dans onChange
  const [type, setType] = useState("");
  const [infoArticle, setInfoArticle] = useState("");
  const [prix, setPrix] = useState("");
  const [etat, setEtat] = useState("");
  const [code, setCode] = useState("");

  //To submit all form data to the server with .post
  const handleSubmit = async (e) => {
    //Pour interdire l'envoie si on ne rempli pas un champ de addProduct
    if (imageUrl && auteur && type && infoArticle && prix && etat && code) {
      const formData = new FormData(); //Vu qu'on envoie un file, on utilise la method FormData() pour créer un objet avec key-values, et tout envoyer en 1 fois
      formData.append("file", imageUrl); // 'file"=property / imageUrl= Value qui est une state variable
      formData.append("auteur", auteur);
      formData.append("type", type);
      formData.append("infoArticle", infoArticle);
      formData.append("prix", prix);
      formData.append("etat", etat);
      formData.append("code", code);

      try {
        const response = await axios.post(
          "http://localhost:3005/upload",
          formData,
        ); //On envoie tout en 1 fois
        alert("Product submitted to DataBase");
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      e.preventDefault();
      alert("Add all products before Submit");
    }
  };

  return (
    <>
      <Header />
      <div className="bg-[#e8e8e8]">
        <div className="flex h-screen flex-col items-center justify-center">
          <div className="w-3/4 rounded-lg border border-gray-300 bg-white p-6 shadow-md">
            <h2 className="mb-4 ml-10 text-2xl font-bold text-gray-900">
              Add Article
            </h2>
            <div className="grid grid-cols-2  ">
              <form className="ml-10 flex flex-col">
                <input
                  required
                  type="text"
                  className="mb-4 rounded-md border border-gray-400 bg-gray-100 p-2 text-gray-900 transition duration-150 ease-in-out focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Type de l'article"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
                <input
                  required
                  type="text"
                  className="mb-4 rounded-md border border-gray-400 bg-gray-100 p-2 text-gray-900 transition duration-150 ease-in-out focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Auteur"
                  value={auteur}
                  onChange={(e) => setAuteur(e.target.value)}
                />
                <input
                  required
                  type="text"
                  className="mb-4 rounded-md border border-gray-400 bg-gray-100 p-2 text-gray-900 transition duration-150 ease-in-out focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Info Article"
                  value={infoArticle}
                  onChange={(e) => setInfoArticle(e.target.value)}
                />
                <input
                  required
                  type="text"
                  className="mb-4 rounded-md border border-gray-400 bg-gray-100 p-2 text-gray-900 transition duration-150 ease-in-out focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Prix"
                  value={prix}
                  onChange={(e) => setPrix(e.target.value)}
                />
                <input
                  required
                  type="text"
                  className="mb-4 rounded-md border border-gray-400 bg-gray-100 p-2 text-gray-900 transition duration-150 ease-in-out focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Achat ou Dépôt"
                  value={etat}
                  onChange={(e) => setEtat(e.target.value)}
                />
                <input
                  required
                  type="text"
                  className="mb-4 rounded-md border border-gray-400 bg-gray-100 p-2 text-gray-900 transition duration-150 ease-in-out focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Code Article"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />

                {/* Dropping the image will store it in the imageUrl state variable */}
                <Dropzone
                  onDrop={(acceptedFiles) => setImageUrl(acceptedFiles[0])}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div
                      className="flex h-16 items-center justify-center border border-slate-400"
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      <p>Drag & drop an image here, or click to select one</p>
                    </div>
                  )}
                </Dropzone>

                <button
                  type="submit"
                  className="mt-4 rounded-md bg-gradient-to-r from-indigo-500 to-blue-500 px-4 py-2 font-bold text-white transition duration-150 ease-in-out hover:bg-indigo-600 hover:to-blue-600"
                  onClick={handleSubmit}
                >
                  Send Article
                </button>
              </form>
              <div className="ml-16 mt-6 flex h-96 w-96 items-center justify-center border border-gray-400 ">
                {/*Pour que l'image n'apparaisse que si imageURL contient une image */}
                {imageUrl && (
                  <img
                    src={URL.createObjectURL(imageUrl)}
                    alt="image uploaded"
                    className="max-h-full max-w-full"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddArticle;
