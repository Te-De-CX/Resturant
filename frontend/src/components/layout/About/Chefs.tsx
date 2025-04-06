import Image from 'next/image';
import HeroImg from '../../../../public/images/about/hero/bg.png';
import { chefsData } from '@/lib/data/about/Chefs';
import ChefCard from './components/ChefCard';

const Chefs = () => {

    const chefs = (
        <>
           <section>
            <h5>top notch chefs</h5>
            <div>
                <div>
                    <Image
                        src={HeroImg}
                        alt="Noodles background"
                        fill
                        className="object-cover"
                        quality={100}
                        priority
                    />
                </div>
                <div>
                    {
                        chefsData.map( value => (
                            <ChefCard
                                key={value.id}
                                img={value.img}
                                name={value.name}
                                text={value.text}
                            />
                        ))
                    }
                </div>
            </div>
           </section>
        </>
    )

    return chefs;
}

export default Chefs;