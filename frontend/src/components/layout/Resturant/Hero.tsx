import Image from 'next/image';
import HeroImg from '../../../../public/images/about/hero/bg.png';


const Hero = () => {

    const hero = (
        <>
           <section>
            <div>
                <h3>
                    find the nearest resturants around you
                </h3>
                <input type="text" placeholder='search here' />
                <div>
                    <p>state</p>
                    <p>country</p>
                </div>
            </div>
            <div>
                <Image
                    src={HeroImg}
                    alt="Noodles background"
                    className="object-cover"
                    quality={100}
                    priority
                />
            </div>
           </section>
        </>
    )

    return hero;
}

export default Hero;