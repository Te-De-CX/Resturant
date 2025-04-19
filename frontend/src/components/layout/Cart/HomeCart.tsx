'use client';
import { useCartStore } from '@/lib/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';
import { BiTrash } from 'react-icons/bi';

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
                            <div className="flex items-center justify-between p-2 border-b w-full" >
                                    <div className='text-sm font-semibold flex flex-col' >
                                        <div className='flex gap-1'>
                                            <div className='relative h-10 w-10 rounded-full overflow-hidden mx-auto flex items-center border-2 border-white mb-1' >
                                            <Image
                                                src ={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.onerror = null;
                                                    target.src = '/fallback-image.jpg';
                                                }}
                                            />
                                            </div>
                                        <h3 className="font-medium">{item.name}</h3>
                                        </div>
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
                    <div className='flex justify-between items-center mt-4'>
                        <Link
                            href="/payment"
                            className="w-3/4 flex items-center justify-center bg-yellow-400 text-white py-2 rounded"
                        >
                            Make Payment
                        </Link>
                        <BiTrash onClick={clearCart} className='text-2xl text-red-700 cursor-pointer' />
                    </div>
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