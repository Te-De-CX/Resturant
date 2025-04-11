import Image from "next/image";
import BgImg from "../../../../public/images/home/map/map.jpg"

const Location = () => {
    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
                    Visit us and book a table
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="h-96 rounded-xl overflow-hidden shadow-lg">
                        <div className="w-full h-full flex items-center justify-center text-gray-600 relative">
                            <Image
                                src={BgImg}
                                alt="bg"
                                // fill
                                className="absolute z-10"
                            />
                            <div className="z-20 text-xl font-semibold stroke-black stroke-2 text-stone-900">
                                Google Map Integration ...
                            </div>
                        </div>
                    </div>
                    
                    {/* Restaurant Info */}
                    <div className="flex flex-col justify-center">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
                            Our restaurants - where to find us?
                        </h3>
                        <p className="text-lg text-gray-600 mb-6">
                            Want to have a superb meal in an exceptional setting with family, friends or work colleagues, here are the addresses of our restaurants.
                        </p>
                        <button className="w-full sm:w-auto px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg">
                            Find the nearest Cheffest
                        </button>
                    </div>
                </div>
                
                {/* Additional Locations (optional) */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Location Card 1 */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <h4 className="text-xl font-bold mb-2 text-gray-800">Downtown</h4>
                        <p className="text-gray-600 mb-4">123 Main Street, New York, NY</p>
                        <p className="text-gray-600 mb-4">Open: 11:00 AM - 11:00 PM</p>
                        <button className="text-amber-600 font-medium hover:text-amber-700">
                            Book a table →
                        </button>
                    </div>
                    
                    {/* Location Card 2 */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <h4 className="text-xl font-bold mb-2 text-gray-800">Uptown</h4>
                        <p className="text-gray-600 mb-4">456 Central Avenue, New York, NY</p>
                        <p className="text-gray-600 mb-4">Open: 10:00 AM - 10:00 PM</p>
                        <button className="text-amber-600 font-medium hover:text-amber-700">
                            Book a table →
                        </button>
                    </div>
                    
                    {/* Location Card 3 */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <h4 className="text-xl font-bold mb-2 text-gray-800">Waterfront</h4>
                        <p className="text-gray-600 mb-4">789 Harbor Drive, New York, NY</p>
                        <p className="text-gray-600 mb-4">Open: 12:00 PM - 12:00 AM</p>
                        <button className="text-amber-600 font-medium hover:text-amber-700">
                            Book a table →
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Location;