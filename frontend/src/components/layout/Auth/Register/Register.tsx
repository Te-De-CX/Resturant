import Image from 'next/image';
import HeroImg from '../../../../public/images/about/hero/bg.png';

const Register = () => {

    const register = (
        <>
           <section>
            <div>
                <Image
                    src={HeroImg}
                    alt="Noodles background"
                    className="object-cover"
                    quality={100}
                    priority
                />
            </div>
            <div>
                <div>
                    <h3>Register</h3>
                    <form action="">
                        <input type="text" placeholder='enter UserName' />
                        <input type="text" placeholder='enter password' />
                        <input type="text" placeholder='enter email' />
                        <div>
                            <p>don&apos;t have an account?</p>
                            <a href="">sign up</a>
                        </div>
                        <button type="submit">Sign In</button>
                    </form>
                </div>
                <div>
                    <Image
                        src={HeroImg}
                        alt="Noodles background"
                        className="object-cover"
                        quality={100}
                        priority
                    />
                    <h3>tamang foodservice</h3>
                </div>
            </div>
           </section>
        </>
    )

    return register;
}

export default Register;