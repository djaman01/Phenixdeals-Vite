import Footer from "./components/Footer";
import Header from "./components/Header";
import NewArticles from "./HomeSections/NewArticles";
import ScrollPage from "./HomeSections/ScrollPage";

const HomePage = () => {
  return (
    <main>
      <header>
        <Header />
      </header>

      <section>
        <ScrollPage />
      </section>

      <section>
        <NewArticles />
      </section>


      <footer>
        <Footer />
      </footer>
    </main>
  );
};

export default HomePage;
