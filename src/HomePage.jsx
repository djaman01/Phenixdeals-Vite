import Header from "./components/Header";
import NewProducts from "./HomeSections/NewArticles";

const HomePage = () => {
  return (
    <main>
      <header>
        <Header />
      </header>

      <section className="padding">
        <NewProducts />
      </section>

      <section></section>

      <footer></footer>
    </main>
  );
};

export default HomePage;
