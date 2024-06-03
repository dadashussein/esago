// Desc: Home page component
import Landing from "~/components/Landing";
import Hero from "../../components/Hero";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

const HomePage = () => {
  return (
    <div>
      <Header />
      <Landing />
      <Footer />
    </div>
  );
};

export default HomePage;
