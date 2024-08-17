import Footer from "../components/Footer";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";

const SignUp = () => {
  return (
    <>
      <Header />

      <LoginForm
        route="signUp"
        success="Identifiants enregistrés"
        successRedirect="/toLogin"
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
