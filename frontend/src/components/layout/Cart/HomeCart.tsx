'use client';
import { useCartStore } from '@/lib/store/cartStore';

const HomeCart = () => {

    const { items, total, subFromCart,addToCart, clearCart } = useCartStore();

    const homeCart = (
        <>
           <section>
            <div>
                <h2 className='text-xl font-bold text-center' >
                    Orders
                </h2>
                <div>
                {items.length > 0 ? (
                    <>
                        {items.map((item) => (
                        <div key={item.id} >
                            <div className="flex items-center justify-between p-4 border-b w-full" >
                                    <div className='text-sm font-semibold flex flex-col' >
                                        <h3 className="font-medium">{item.name}</h3>
                                        <p>${item.price.toFixed(2)}</p>
                                    </div>
                                
                                <div className="flex items-center text-sm gap-1  bg-yellow-400 px-1 rounded-3xl">
                                    <button 
                                    onClick={() => subFromCart(item.id)}
                                    className=" h-3 w-3 text-black flex items-center justify-center bg-white font-semibold rounded-full text-sm"
                                    >
                                    -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button 
                                    onClick={() => addToCart(item)}
                                    className=" h-3 w-3 text-black text-center flex items-center justify-center bg-white font-semibold rounded-full text-sm"
                                    >
                                    +
                                    </button>
                                </div>
                            </div>
                        </div>
                        ))}
                    <div className="mt-4 font-bold text-lg">
                        Total: ${total ? total.toFixed(2) : "0.00"}
                    </div>
                    <button
                        onClick={clearCart}
                        className="mt-4 w-full bg-red-500 text-white py-2 rounded"
                    >
                        Clear Cart
                    </button>
                    </>
                ) : (
                    <p>Your cart is empty</p>
                )}
                </div>
            </div>
           </section>
        </>
    )

    return homeCart;
}

export default HomeCart;