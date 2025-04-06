import Image from 'next/image';
import HeroImg from '../../../../public/images/about/hero/bg.png';

const Started = () => {

    const started = (
        <>
            <article>
                <h3>
                    how it all started
                </h3>
                <div>
                    <p>
                    It is a long established fact that a reader will be distracted layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for &apos;lorem ipsum&apos; will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The normal distribution of letters, as opposed to using &apos;Content  Many desktop publishing packages and web page editors search for &apos;lorem ipsum&apos; will uncover many web sites still in  humour and the like. Read More
                    </p>
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
                </div>
            </article> 
        </>
    )

    return started;
}

export default Started;