
const Footer = () => {

    const year = new Date().getFullYear()

    const products =[
        {
            id:1,
            name: "menus",
        },
        {
            id:2,
            name: "burgers",
        },
        {
            id:1,
            name: "times slides",
        },
        {
            id:1,
            name: "nanadwiches",
        },
    ]

    const legal = [
        {
            id:1,
            name: "legal notice",
        },
        {
            id:2,
            name: "terms of services",
        },
    ]

    const contact = [
        {
            id: 1,
            name: "contacts",
        },
        {
            id: 1,
            name: "addresses",
        },
        {
            id: 1,
            name: "become a times square franchisee",
        },
    ]

    const footer = (
        <>
           <div>
            <h5>products</h5>
            <ul>
                {
                    products.map( value => (
                        <li key={value.id} >
                            {value.name}
                        </li>
                    ))
                }
            </ul>
            <h5>legal information</h5>
            <ul>
                {
                    legal.map( value => (
                        <li key={value.id} >
                            {value.name}
                        </li>
                    ))
                }
            </ul>
            <h5>contact us</h5>
            <ul>
                {
                    contact.map( value => (
                        <li key={value.id} >
                            {value.name}
                        </li>
                    ))
                }
            </ul>
            <h5>we accept</h5>
            <div>
                services images
            </div>
           </div>
           <hr />
           <div>
            <div>
                socials icons
            </div>
            <div>
                &copy; {year} TeDeCX all rignhts reserved
            </div>
           </div>
        </>
    )

    return footer;
}

export default Footer;