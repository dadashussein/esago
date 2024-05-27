import { useState } from "react";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Footer from "../../components/Footer/Footer";

const HomePage = () => {
  const [login, setLogin] = useState(false);

  return (
    <div>
      <Header setLogin={setLogin} login={login} />
      <Hero login={login} />
      <Footer />
    </div>
  );
};

export default HomePage;
