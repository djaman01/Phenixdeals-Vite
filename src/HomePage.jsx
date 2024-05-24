import Header from "./components/Header";
import NewArticles from "./HomeSections/NewArticles";

const HomePage = () => {
  return (
    <main>
      <header>
        <Header />
      </header>

      <section className="padding">
        <NewArticles />
      </section>

      <section></section>

      <footer></footer>
    </main>
  );
};

export default HomePage;
