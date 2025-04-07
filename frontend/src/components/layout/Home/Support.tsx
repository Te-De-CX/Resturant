import Image from 'next/image'
import SupportImage from '../../../../public/images/home/support/bg.jpg'

const Support = () => {

    const support = (
        <>
        
        <section className='absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-4 text-white bg-black/50'>
           <Image
                src={SupportImage}
                alt="support"
                className='w-full h-full object-cover'
                priority
                fill   
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div>
                randomized image
            </div>
            <div>
                <h3>
                    for more support
                </h3>
                <div>
                    <input type="text" placeholder="enter email" />
                    <button>subscribe</button>
                </div>
            </div>
            <div>
                randomized image
            </div>
           </section>
        </>
    )

    return support;
}

export default Support;