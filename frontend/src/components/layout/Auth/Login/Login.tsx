import Image from 'next/image';
import HeroImg from '../../../../../public/images/auth/register/bg.jpg';

const Login = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={HeroImg}
                    alt="Noodles background"
                    className="object-cover w-full h-full"
                    quality={100}
                    priority
                    fill
                />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-4 py-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Login Form */}
                    <div className="backdrop-blur-sm bg-white/10 p-8 rounded-2xl shadow-xl border border-white/20">
                        <h3 className="text-3xl font-bold text-white mb-6 text-center">Login</h3>
                        <form className="space-y-6">
                            <div>
                                <input 
                                    type="text" 
                                    placeholder="Username or Email"
                                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <input 
                                    type="password" 
                                    placeholder="Password"
                                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-white/80 text-sm">Already have an account?</p>
                                <a href="#" className="text-amber-300 hover:text-amber-200 text-sm font-medium transition-colors">
                                    Sign in
                                </a>
                            </div>
                            <button 
                                type="submit" 
                                className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
                            >
                                Sign In
                            </button>
                        </form>
                    </div>

                    {/* Right Side Image */}
                    <div className="relative h-96 lg:h-full rounded-2xl overflow-hidden shadow-xl">
                        <Image
                            src={HeroImg}
                            alt="Noodles background"
                            className="object-cover"
                            quality={100}
                            priority
                            fill
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <h3 className="text-4xl font-bold text-white text-center">Tamang Foodservice</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;