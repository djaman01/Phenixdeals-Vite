import Footer from "./components/Footer";
import Header from "./components/Header";
import NewArticles from "./HomeSections/NewArticles";

const HomePage = () => {
  return (
    <main>
      <header>
        <Header />
      </header>

      <section>
        <NewArticles />
      </section>

      <section></section>

      <footer>
        <Footer />
      </footer>
    </main>
  );
};

export default HomePage;
