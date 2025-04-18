
import Nav from "@/components/UI/Nav/Nav";
import Footer from "@/components/UI/Footer/Footer";
import Hero from "@/components/layout/Menu/Hero";
import MenuPage from "@/components/layout/Menu/MenusList";

const Menu = () => {

  const menu = (
      <>
         <Nav />
         <Hero />
         <MenuPage />
         <Footer />
      </>
  )

  return menu;
}

export default Menu;