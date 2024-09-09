import { Formik, Form, useField, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useRef } from "react";
import emailjs from "@emailjs/browser";

//MyTextInput= custom component that is a schema model for inputs and labels in Formik so that we don't have to re-write them:
//Destructuring label allows us to use the label prop to change the name of the label.
//Destructuring the rest of the props with the spread operator (...props) enables us to use any valid props in the input like: name, type, or placeholder.

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-2">
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />

      {meta.touched && meta.error ? (
        <div className="error text-sm text-red-500 ">{meta.error}</div>
      ) : null}
    </div>
  );
};

const ContactForm = () => {

  const formValues = useRef(); //référence à donner au <Form ref={formValues}, pour capturer les infos entrés par le visiteur du site

  const sendEmail = () => {

    console.log("sendEmail function called")

    return emailjs.sendForm(
      "service_pjw8ixl", //service_id => A trouver dans Section Email services
      "template_yp3au9f", //template_id => A trouver dans section Email templates => Settings
      formValues.current, //= valeurs du formulaire: Lorsqu'on a attaché la ref "formValues" au formulaire qui est un élément du DOM, React garde les valeurs de cet éléments dans formValues.current. Ces valeurs vont restés accessibles tant que le formulaire lui-même n'est pas complètement effacé
      {
        publicKey: "jbn6FFUwLocXKxqvT", //publicKey: A trouver dans account => API Keys
      },
    );
  };


  

  return (
    <>
      <div className=" mx-auto mb-4 max-w-md rounded bg-gray-50 px-8 pb-8 pt-6 shadow-2xl max-lg:mx-6 max-lg:mb-12 max-lg:border max-lg:border-slate-400">
        <div className="prose mb-4 text-center">
          <h2 className="text-green-500">Quelle est votre demande ?</h2>
        </div>

        {/* The initialValues in Formik are used to define the default values for the form fields */}
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
              .email("Invalid email address")
              .required("Requis"),
            phone: Yup.string().required("Requis"),
            message: Yup.string()
              .min(10, "Doit comporter 10 caractères minimum")
              .required("Requis"),
          })}

          onSubmit= { async (values, {setSubmitting, resetForm}) => { //Formik collecte d'abord les valeurs des champs et les stocke dans l'objet values, donc même si on reset l'affichage du formulaire avant l'envoie, les données sont déjà collectés

            alert('Formulaire envoyé:\nNous vous répondrons dès que possible'); //Affiche l'alert immédiatement après avoir cliqué sur submit
            console.log('Form submitted with values: ', values);
            resetForm();//Change seulement l'affichage des champs du formulaire sur la page; mais les valeurs sont déjà capturées dans values et on peut les lire dans formValues.current pour envoie dans email.js

            try {
              const result = await sendEmail(); // Attends la résolution de la promesse qui est l'application de la function sendEmail
              console.log('Email sent successfully', result);
             
            } 
            catch (error) {
              console.error('Error sending Email:', error); 
            }
            finally{
              setSubmitting(false); //Assure de stopper onSubmit
            }
          }
        } //1)1) Formik capture les valeurs du formulaire et les stock dans values 2) L'alert s'active puis l'affichage des valeurs du formulaire s'effacent (Cela n'affecte pas les valeurs déjà capturées par Formik dans values ou la référence du formulaire dans formValues.current) 3) Et enfin, l'email s'envoi 
      
        >
          {/* !!! The name property in the MyTextInput component is crucial for Formik to link the input field to its corresponding value in initialValues. Without it it'd not work correctly  */}
          <Form ref={formValues}>
            <MyTextInput
              label="Nom"
              name="lastName"
              type="text"
              placeholder="Votre Nom de famille"
              className=" block  w-full rounded border-2 px-3 py-2 leading-tight focus:border-blue-500 focus:outline-none" //focus:outline-none est obligé pour enlever le border par défaut quand on clique sur l'input et que le border bleu qu'on veut s'applique quand on clique
            />

            <MyTextInput
              label="Prénom"
              name="firstName"
              type="text"
              placeholder="Votre Prénom"
              className=" block  w-full rounded border-2 px-3 py-2 leading-tight focus:border-blue-500 focus:outline-none"
            />

            <MyTextInput
              label="E-mail"
              name="email"
              type="email"
              placeholder="Votre e-mail"
              className=" block  w-full rounded border-2 px-3 py-2 leading-tight focus:border-blue-500 focus:outline-none"
            />

            <MyTextInput
              label="Téléphone"
              name="phone"
              type="tel"
              placeholder="Votre numéro"
              className=" block  w-full rounded border-2 px-3 py-2 leading-tight focus:border-blue-500 focus:outline-none"
            />

            <div>
              <label htmlFor="message">Message</label>
              <Field
                id="message"
                name="message"
                as="textarea"
                placeholder="Votre message"
                rows="5"
                className=" block  w-full rounded border-2 px-3 py-2 leading-tight focus:border-blue-500 focus:outline-none"
              />
              <ErrorMessage
                name="message"
                component="div"
                className="error text-sm text-red-500"
              />
            </div>

            <button
              type="submit"
              className="mt-5 rounded  bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring-blue-500"
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
