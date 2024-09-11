import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  
  //function pour envoyer données formulaire à emailJs
  const sendEmail = (data) => { //we pass to the "data" parameter, the values of the Form captured by Formik thanks to the "values" property in onSubmit
    return emailjs.send( //respecter cet ordre: 1)service_id 2) template_id 3) values du formulaire 4) publicKey
      "service_pjw8ixl", // service_id => A trouver dans Section Email services
      "template_yp3au9f", // template_id => A trouver dans section Email templates => Settings
      data, //values of the Form
      "jbn6FFUwLocXKxqvT", // publicKey: A trouver dans account => API Keys
    );
  };

  return (
    <>
      <div className="mx-auto mb-4 max-w-md rounded bg-gray-50 px-8 pb-8 pt-6 shadow-2xl max-lg:mx-6 max-lg:mb-12 max-lg:border max-lg:border-slate-400">
        
        <div className="prose mb-4 text-center">
          <h2 className="text-green-500">Quelle est votre demande ?</h2>
        </div>

        <Formik

          initialValues={{
            lastName: "",
            firstName: "",
            email: "",
            phone: "",
            message: "",
          }}

          validationSchema={Yup.object({
            lastName: Yup.string()
              .max(30, "Doit comporter 30 caractères maximum")
              .required("Requis"),
            firstName: Yup.string()
              .max(20, "Doit comporter 20 caractères maximum")
              .required("Requis"),
            email: Yup.string()
              .email("Adresse email invalide")
              .required("Requis"),
            phone: Yup.string().required("Requis"),
            message: Yup.string()
              .min(30, "Doit comporter 30 caractères minimum")
              .required("Requis"),
          })}

          onSubmit={async (values, { resetForm }) => {// En 1er: le paramètre "values" capture les valeurs écrites dans le formulaire, donc même si on reset le form avant envoie, values stockera toujours les valeurs
            alert('Formulaire envoyé:\nNous vous répondrons dès que possible'); 
            console.log('Form submitted with values: ', values); //Permet de voir dans la console ce qui a été rempli dans le formulaire après avoir cliquer sur envoyer
            resetForm(); //Reset l'affichage des valeurs sur la page, mais values store toujours les valeurs écrites dans le formulaire

            try {
              const result = await sendEmail(values);//Appel de la function sendEmail avec pour argument 'values' => valeurs du formulaire capturés par Formik
              console.log('Email sent successfully', result);
            } 
            catch (error) {
              console.error('Error sending Email:', error);
            } 
          }}
        >
          <Form>

            <div className="mb-2">
              <label htmlFor="lastName">Nom</label>
              <Field
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Votre Nom de famille"
                className="block w-full rounded border-2 px-3 py-2 leading-tight focus:border-blue-500 focus:outline-none"
              />
              {/* ErrorMessage est ce qui permet de voir "Requis", si on appuie sur le champ mais qu'on ne le remplit pas et qu'on passe à un autre champ */}
              <ErrorMessage name="lastName" component="div" className="error text-sm text-red-500" />
            </div>

            <div className="mb-2">
              <label htmlFor="firstName">Prénom</label>
              <Field
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Votre Prénom"
                className="block w-full rounded border-2 px-3 py-2 leading-tight focus:border-blue-500 focus:outline-none"
              />
              <ErrorMessage name="firstName" component="div" className="error text-sm text-red-500" />
            </div>

            <div className="mb-2">
              <label htmlFor="email">E-mail</label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Votre e-mail"
                className="block w-full rounded border-2 px-3 py-2 leading-tight focus:border-blue-500 focus:outline-none"
              />
              <ErrorMessage name="email" component="div" className="error text-sm text-red-500" />
            </div>

            <div className="mb-2">
              <label htmlFor="phone">Téléphone</label>
              <Field
                id="phone"
                name="phone"
                type="tel"
                placeholder="Votre numéro"
                className="block w-full rounded border-2 px-3 py-2 leading-tight focus:border-blue-500 focus:outline-none"
              />
              <ErrorMessage name="phone" component="div" className="error text-sm text-red-500" />
            </div>

            <div className="mb-2">
              <label htmlFor="message">Message</label>
              <Field
                id="message"
                name="message"
                as="textarea"
                placeholder="Votre message"
                rows="5"
                className="block w-full rounded border-2 px-3 py-2 leading-tight focus:border-blue-500 focus:outline-none"
              />
              <ErrorMessage name="message" component="div" className="error text-sm text-red-500" />
            </div>

            <button
              type="submit"
              className="mt-5 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring-blue-500"
            >
              Envoyer
            </button>

          </Form>

        </Formik>
      </div>
    </>
  );
};

export default ContactForm;
