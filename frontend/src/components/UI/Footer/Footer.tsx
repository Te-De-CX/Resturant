const Footer = () => {
    const year = new Date().getFullYear()

    const products = [
        {
            id: 1,
            name: "menus",
        },
        {
            id: 2,
            name: "burgers",
        },
        {
            id: 3,
            name: "time slides",
        },
        {
            id: 4,
            name: "sandwiches",
        },
    ]

    const legal = [
        {
            id: 1,
            name: "legal notice",
        },
        {
            id: 2,
            name: "terms of services",
        },
    ]

    const contact = [
        {
            id: 1,
            name: "contacts",
        },
        {
            id: 2,
            name: "addresses",
        },
        {
            id: 3,
            name: "become a times square franchisee",
        },
    ]

    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Products Section */}
                    <div>
                        <h5 className="text-xl font-bold mb-4 uppercase">Products</h5>
                        <ul className="space-y-2">
                            {products.map((value) => (
                                <li key={value.id}>
                                    <a href="#" className="hover:text-gray-300 transition-colors">
                                        {value.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Information Section */}
                    <div>
                        <h5 className="text-xl font-bold mb-4 uppercase">Legal Information</h5>
                        <ul className="space-y-2">
                            {legal.map((value) => (
                                <li key={value.id}>
                                    <a href="#" className="hover:text-gray-300 transition-colors">
                                        {value.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Us Section */}
                    <div>
                        <h5 className="text-xl font-bold mb-4 uppercase">Contact Us</h5>
                        <ul className="space-y-2">
                            {contact.map((value) => (
                                <li key={value.id}>
                                    <a href="#" className="hover:text-gray-300 transition-colors">
                                        {value.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Payment Methods Section */}
                    <div>
                        <h5 className="text-xl font-bold mb-4 uppercase">We Accept</h5>
                        <div className="grid grid-cols-3 gap-4">
                            {/* Replace these with actual payment icons */}
                            <div className="bg-gray-700 h-12 rounded flex items-center justify-center">Visa</div>
                            <div className="bg-gray-700 h-12 rounded flex items-center justify-center">PayPal</div>
                            <div className="bg-gray-700 h-12 rounded flex items-center justify-center">MC</div>
                            <div className="bg-gray-700 h-12 rounded flex items-center justify-center">Apple Pay</div>
                            <div className="bg-gray-700 h-12 rounded flex items-center justify-center">GPay</div>
                        </div>
                    </div>
                </div>

                <hr className="border-gray-700 my-8" />

                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex space-x-4 mb-4 md:mb-0">
                        {/* Social Icons - replace with actual icons */}
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
                            <span>FB</span>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
                            <span>IG</span>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
                            <span>TW</span>
                        </a>
                    </div>
                    <div className="text-gray-400">
                        &copy; {year} TeDeCX all rights reserved
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer