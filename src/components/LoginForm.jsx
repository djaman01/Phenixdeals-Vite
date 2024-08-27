import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({
  route,
  success,
  successRedirect,
  heading,
  SignOrLog1,
  link,
  SignOrLog2,
  SignOrLog3,
}) => {

//!!!!!!!!!!!!!!! Pour activer le code qui store le token dans le cookie
  axios.defaults.withCredentials = true; 
  
  //State variable pour stocker les valeurs des inputs email et password
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate(); //Function qui permet de mener vers un lien sous condition / Si condition vraie, navigate(/...) pour aller au login si sign up bien

  //Pour donner des values aux states qu'on va envoyer avec post dans la base de donnée
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password) { //pas besoin de formData car on envoie pas de file, juste des texte

      try {
        //On utilise aussi .post pour le login car: The POST method is used to send data to the server to be processed. Even though you're not creating or modifying database records, you are sending login credentials for the server to verify. The POST method is appropriate for this kind of operation 
        //On stocke le .post dans la variable "response" pour pouvoir accéder à la data dans le console.log(response.data)
        const response = await axios.post( `http://localhost:3005/${route}`, {email, password});
        
        console.log("Identifiants envoyés", response.data);
        (route==='signUp') &&  alert({success}); //pour que ça ne mette pas d'alerte quand on login succesfully
        setEmail(""); //clear field Email
        setPassword(""); //clear field Password
        successRedirect && navigate(successRedirect); // Si le props success Redirect a une valeuyr, alors => navigate vers cette valeur
      } 
      catch (error) {
        console.error("Erreur lors de l'envoi des identifiants", error);
      }

    }
  };

  return (
    <>
      <div className="mb-[-150px] flex h-screen flex-col items-center justify-center bg-[#e8e8e8]">
        <div className="mb-44 w-full max-w-md rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            {heading}
          </h2>

          <form className="flex flex-col" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email" //!!! Pour lier la valeur de l'input à la key: email
              className="mb-4 rounded-md border-0 bg-gray-100 p-2 text-gray-900 transition duration-150 ease-in-out focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Email address"
              onChange={handleEmail}
              required
            />
            <input
              type="password"
              name="password"
              className="mb-4 rounded-md border-0 bg-gray-100 p-2 text-gray-900 transition duration-150 ease-in-out focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Password"
              onChange={handlePassword}
              required
            />
            <div className="flex flex-wrap items-center justify-between">
              <label
                htmlFor="remember-me" // on donne le même nom que id, pour que le nom "Remember me" soit cliquable
                className="cursor-pointer text-sm text-gray-900"
              >
                <input type="checkbox" id="remember-me" className="mr-2" />
                Remember me
              </label>
              <a
                href="#"
                className="mb-0.5 text-sm text-blue-500 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <p className="text-md mt-8 text-gray-900">
              {SignOrLog1}
              <a
                href= {link}
                className=" text-md ml-5 text-blue-500 hover:underline"
              >
                {SignOrLog2}
              </a>
            </p>
            <button
              type="submit"
              className="mt-8 rounded-md bg-gradient-to-r from-indigo-500 to-blue-500 px-4 py-2 font-bold text-white transition duration-150 ease-in-out hover:bg-indigo-600 hover:to-blue-600"
            >
              {SignOrLog3}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
