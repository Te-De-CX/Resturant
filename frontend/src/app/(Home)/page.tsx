import Menu from "@/components/layout/Home/Menu";
import Hero from "@/components/layout/Home/Hero";
import Marque from "@/components/layout/Home/Marque";
import Chef from "@/components/layout/Home/Chef";
import News from "@/components/layout/Home/News";
import Reviews from "@/components/layout/Home/Reviews";
import Support from "@/components/layout/Home/Support";
import Location from "@/components/layout/Home/Location";
import Footer from "@/components/UI/Footer/Footer";
import Nav from "@/components/UI/Nav/Nav";

const HomePage = () => {

  const homePage =(
    <>
      <Nav />
      <Hero />
      <Marque />
      <Menu />
      <Chef />
      <News />
      <Reviews />
      <Support />
      <Location />
      <Footer />
    </>
  );

  return homePage;
}

export default HomePage;