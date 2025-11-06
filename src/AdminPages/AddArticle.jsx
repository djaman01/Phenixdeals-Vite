import axios from "axios";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const AddArticle = () => {
  axios.defaults.withCredentials = true; //To include the cookies in the request globally (pour ne pas avoir à écrire; {withCredentials: true} dans chaque axios.get, car on en a besoin pour la requete de authenticate et de logout pour que ça puisse logout même si on part sur une autre page et qu'on revient sur dashboard)

  const navigate = useNavigate();

  //To make the access to this component protected by the authentification route: So the /addArticle defined in App.jsx to access this component becomes a protected route
  useEffect(() => {
    const authenticate = async () => {
      try {
        const response = await axios.get(
          "https://phenixdeals-back.onrender.com/authentication",
        );
        if (response.data.message !== "Authenticated") {
          navigate("/");
        }
      } catch (error) {
        console.error(
          "Error during authentication:",
          error.response
            ? `${error.response.status}: ${error.response.data.message}` // Server-side error
            : error.message, // Client-side error
        );
        navigate("/"); // If authentication failure, redirect to HomePage
      }
    };

    authenticate();
  }, [navigate]);

  //Comme il y a l'image, faire un state avec un objet comme dans contact ne va pas marcher
  const [imageFile, setImageFile] = useState(null); //setImage dans dropzone
  const [auteur, setAuteur] = useState(""); //setAuteur dans onChange
  const [type, setType] = useState("");
  const [infoArticle, setInfoArticle] = useState("");
  const [prix, setPrix] = useState("");
  const [etat, setEtat] = useState("");
  const [bestDeal, setBestDeal] = useState("");
  const [code, setCode] = useState("");

  //To submit all form data to the server with .post
  const handleSubmit = async (e) => {
    e.preventDefault(); //pour que le formulaire ne se rafraichisse pas automatiquement et que l'alert et console.log fonctionnent (on réinitialise le tout manuellement après soumission plus bas)

    //Pour interdire l'envoie si on ne rempli pas un champ de addArticle
    if (
      imageFile &&
      auteur &&
      type &&
      infoArticle &&
      prix &&
      etat &&
      bestDeal &&
      code
    ) {
      const formData = new FormData(); //FormData: This is useful when you need to handle file uploads: FormData() crée un objet avec key-values pour tout envoyer en 1 fois
      formData.append("file", imageFile); //'file"=property / imageFile= Value qui est une state variable
      formData.append("auteur", auteur);
      formData.append("type", type);
      formData.append("infoArticle", infoArticle);
      formData.append("prix", prix);
      formData.append("etat", etat);
      formData.append("bestDeal", bestDeal);
      formData.append("code", code);

      try {
        const response = await axios.post(
          "https://phenixdeals-back.onrender.com/upload",
          formData,
        ); //On envoie tout en 1 fois
        console.log("création article", response.data);
        alert("Article submitted to DataBase");
        // Réinitialisation des états du formulaire pour que les champs se vident
        setImageFile(null);
        setAuteur("");
        setType("");
        setInfoArticle("");
        setPrix("");
        setEtat("");
        setBestDeal("");
        setCode("");
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      e.preventDefault();
      alert("Add all articles before Submit");
    }
  };

  return (
    <>
      <Header />
      <div className="bg-[#e8e8e8] ">
        <div className=" flex h-screen flex-col items-center justify-center max-lg:h-auto">
          <div className=" w-3/4 rounded-lg border border-gray-300 bg-white p-6 shadow-md max-lg:mb-20 max-lg:mt-20">
            <h2 className=" mb-4 text-center text-2xl font-bold text-gray-900 max-lg:ml-0 max-lg:text-center">
              Add Article
            </h2>
            <div className="grid grid-cols-2 max-lg:grid-cols-1 ">
              <form className="ml-10 flex flex-col max-lg:mx-auto">
                <input
                  required
                  type="text"
                  className="mb-4 rounded-md border border-gray-400 bg-gray-100 p-2 text-gray-900 transition duration-150 ease-in-out focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 max-lg:w-max"
                  placeholder="Type de l'article"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
                <input
                  required
                  type="text"
                  className="mb-4 rounded-md border border-gray-400 bg-gray-100 p-2 text-gray-900 transition duration-150 ease-in-out focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 max-lg:w-max"
                  placeholder="Auteur"
                  value={auteur}
                  onChange={(e) => setAuteur(e.target.value)}
                />
                <input
                  required
                  type="text"
                  className="mb-4 rounded-md border border-gray-400 bg-gray-100 p-2 text-gray-900 transition duration-150 ease-in-out focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 max-lg:w-max"
                  placeholder="Info Article"
                  value={infoArticle}
                  onChange={(e) => setInfoArticle(e.target.value)}
                />
                <input
                  required
                  type="text"
                  className="mb-4 rounded-md border border-gray-400 bg-gray-100 p-2 text-gray-900 transition duration-150 ease-in-out focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 max-lg:w-max"
                  placeholder="Prix"
                  value={prix}
                  onChange={(e) => setPrix(e.target.value)}
                />
                <input
                  required
                  type="text"
                  className="mb-4 rounded-md border border-gray-400 bg-gray-100 p-2 text-gray-900 transition duration-150 ease-in-out focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 max-lg:w-max"
                  placeholder="Achat ou Dépôt"
                  value={etat}
                  onChange={(e) => setEtat(e.target.value)}
                />
                <input
                  required
                  type="text"
                  className="mb-4 rounded-md border border-gray-400 bg-gray-100 p-2 text-gray-900 transition duration-150 ease-in-out focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 max-lg:w-max"
                  placeholder="Best Deal ?"
                  value={bestDeal}
                  onChange={(e) => setBestDeal(e.target.value)}
                />
                <input
                  required
                  type="text"
                  className="mb-4 rounded-md border border-gray-400 bg-gray-100 p-2 text-gray-900 transition duration-150 ease-in-out focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 max-lg:w-max"
                  placeholder="Code Article"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />

                {/* Dropping the image will store it in the imageFile state variable */}
                <Dropzone
                  onDrop={(acceptedFiles) => setImageFile(acceptedFiles[0])}
                  useFsAccessApi={false} //required to work on all mobile devices
                >
                  {({ getRootProps, getInputProps }) => (
                    <div
                      className="flex h-16 items-center justify-center border border-slate-400 max-lg:mt-5 max-lg:w-max"
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      <p>
                        Drag & drop an image here, <br />
                        Or click to select one
                      </p>
                    </div>
                  )}
                </Dropzone>

                <div className="flex justify-center max-lg:flex-col max-lg:items-center">
                  <Link to="/toDashboard">
                    <button className=" mt-4 w-32 rounded-md bg-blue-500 px-4 py-2 font-bold text-white transition duration-150 ease-in-out hover:bg-blue-600">
                      Dashboard
                    </button>
                  </Link>

                  <button
                    className="mt-4 w-32 rounded-md bg-green-500 px-4 py-2 font-bold text-white transition duration-150 ease-in-out hover:bg-green-600 lg:ml-10"
                    onClick={handleSubmit}
                  >
                    Send Article
                  </button>
                </div>
              </form>

              <div className="ml-16 mt-6 flex h-96 w-96 items-center justify-center border border-gray-400 max-lg:ml-0 max-lg:h-48 max-lg:w-auto">
                {/*Pour que l'image n'apparaisse que si imageFile contient une image */}
                {imageFile && (
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="image uploaded"
                    className="max-h-full max-w-full"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AddArticle;
