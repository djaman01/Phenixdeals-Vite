import Footer from "./components/Footer";
import Header from "./components/Header";
import NewArticles from "./HomeSections/NewArticles";
import ScrollPage from "./HomeSections/ScrollPage";

const HomePage = () => {
  return (
    //overflow-hidden pour ne pas avoir de scrollbar horizontale
    <main className="overflow-hidden"> 
      <header>
        <Header />
      </header>

      <section className="bg-[#EDF1FF] rounded-2xl">
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
