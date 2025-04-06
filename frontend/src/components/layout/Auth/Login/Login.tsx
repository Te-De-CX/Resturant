import Image from 'next/image';
import HeroImg from '../../../../public/images/about/hero/bg.png';

const Login = () => {

    const login = (
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
                    <h3>Login</h3>
                    <form action="">
                        <input type="text" />
                        <input type="text" />
                        <div>
                            <p>already have an account?</p>
                            <a href="">sign in</a>
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

    return login;
}

export default Login;