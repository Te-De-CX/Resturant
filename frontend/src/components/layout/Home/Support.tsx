import Image from 'next/image'
import SupportImage from '../../../../public/images/home/support/bg.jpg'

const Support = () => {
  return (
    <section className="relative w-full min-h-[500px] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={SupportImage}
          alt="support background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-white text-center">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left randomized image (hidden on mobile) */}
          <div className="hidden md:block w-1/4">
            <div className="bg-white/20 rounded-lg h-40 w-full backdrop-blur-sm" />
          </div>

          {/* Main content */}
          <div className="flex-1 max-w-2xl">
            <h3 className="text-3xl sm:text-4xl font-bold mb-6">
              For More Support
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button className="px-6 py-3 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>

          {/* Right randomized image (hidden on mobile) */}
          <div className="hidden md:block w-1/4">
            <div className="bg-white/20 rounded-lg h-40 w-full backdrop-blur-sm" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Support