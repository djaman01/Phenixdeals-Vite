import Footer from "../components/Footer";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  //!!!!!!!!!!!!!!! Pour activer le code qui store le token dans le cookie
  axios.defaults.withCredentials = true; 
  
  //State variable pour stocker les valeurs des inputs email et password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); //Function qui permet de mener vers un lien sous condition / Si condition vraie, navigate(/...) pour aller au login si sign up bien

  //Pour donner des values aux states qu'on va envoyer avec post dans la base de donnée
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password) { //pas besoin de formData car on envoie pas de file, juste des texte

      try {
        //On utilise aussi .post pour le login car: The POST method is used to send data to the server to be processed. Even though you're not creating or modifying database records, you are sending login credentials for the server to verify. The POST method is appropriate for this kind of operation 
        const response = await axios.post( `http://localhost:3005/logIn`, {email, password});
        console.log(response.data);
        (response.data.status==='Success') ? navigate('/toDashboard') : alert('Error during login');
      } 
      catch (error) {
        console.error("Erreur lors du login", error);
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
        heading="Log in"
        SignOrLog1="Don't have an account ? "
        link="/toSignUp"
        SignOrLog2="Sign up"
        SignOrLog3="Log in"
      />

      <Footer />
    </>
  );
};

export default Login;
