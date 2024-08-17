import Footer from "../components/Footer";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <>
      <Header />

      <LoginForm
        route="logIn"
        successRedirect="/toDashboard"
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
