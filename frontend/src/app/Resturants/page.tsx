import Nav from "@/components/UI/Nav/Nav";
import Hero from "@/components/layout/Resturant/Hero";
import Map from "@/components/layout/Resturant/Map";
import Footer from "@/components/UI/Footer/Footer";

const Resturants = () => {

    const resturants = (
        <>
           <Nav />
           <Hero />
           <Map />
           <Footer />
        </>
    )

    return resturants;
}

export default Resturants;