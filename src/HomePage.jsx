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

      <section className="bg-[#e8e8e8] rounded-2xl">
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
