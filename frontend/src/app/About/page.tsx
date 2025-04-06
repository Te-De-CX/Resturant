import Nav from "@/components/UI/Nav/Nav";
import Hero from "@/components/layout/About/Hero";
import Started from "@/components/layout/About/Started";
import Delicious from "@/components/layout/About/Delicious";
import Chefs from "@/components/layout/About/Chefs";
import Footer from "@/components/UI/Footer/Footer";

const AboutPage = () => {

    const aboutPage = (
        <>
            <Nav />
            <Hero />
            <Started />
            <Delicious />
            <Chefs />
            <Footer />
        </>
    )

    return aboutPage;
}

export default AboutPage;