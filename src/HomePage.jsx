import Header from "./components/Header";
import NewProducts from "./components/NewProducts";

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
