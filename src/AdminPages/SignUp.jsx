import Footer from "../components/Footer";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  //State variable pour stocker les valeurs des inputs email et password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); //Function qui permet de mener vers un lien sous condition / Si condition vraie, navigate(/...) pour aller au login si sign up bien

  //Pour donner des values aux states qu'on va envoyer avec post dans la base de donnée
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password) {
      //pas besoin de formData car on envoie pas de file, juste des texte

      try {
        //On stocke le .post dans la variable "response" pour pouvoir accéder à la data dans le console.log(response.data)
        const response = await axios.post(
          `https://phenixdeals-back.onrender.com/signUp`,
          { email, password },
        );

        console.log("Identifiants envoyés", response.data);
        alert("Signup Success");
        response.data.message === "Signup Success"
          ? navigate("/toLogin")
          : alert("Error during signup");
        setEmail(""); //clear field Email
        setPassword(""); //clear field Password
      } catch (error) {
        console.error("Erreur lors de l'envoi des identifiants", error);
      }
    }
  };

  return (
    <>
      <Header />

      <LoginForm
        submitProps={handleSubmit}
        emailProps={handleEmail}
        passwordProps={handlePassword}
        heading="Sign up"
        SignOrLog1="Already have an Account ? "
        link="/toLogin"
        SignOrLog2="Sign in"
        SignOrLog3="Sign up"
      />

      <Footer />
    </>
  );
};

export default SignUp;
