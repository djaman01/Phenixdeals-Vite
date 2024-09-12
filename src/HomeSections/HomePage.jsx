import Footer from "../components/Footer";
import Header from "../components/Header";
import NewArticles from "./NewArticles";
import ScrollPage from "./ScrollPage";

const HomePage = () => {
  return (
    //overflow-hidden pour ne pas avoir de scrollbar horizontale
    <main className="overflow-hidden"> 
      <header className="mt-3 mb-5">
        <Header />
      </header>

      <section className="bg-[#EDF1FF] rounded-2xl">
        <ScrollPage />
      </section>

      <section className="mt-5">
        <NewArticles />
      </section>


      <footer className="pt-8">
        <Footer />
      </footer>

    </main>
  );
};

export default HomePage;
