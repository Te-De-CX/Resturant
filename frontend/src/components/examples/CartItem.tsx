// // components/CartItem.tsx
// 'use client';
// // import Image from 'next/image';
// // import { useRemoveFromCart } from '@/lib/hooks/useCart';
// // import { CartItem } from '@/lib';

// type CartItem = {
//     id: number;
//     product: {
//       id: number;
//       name: string;
//       price: number;
//       image?: string | null;
//     };
//     quantity: number;
//   };

// export default function CartItem({ item }: { item: CartItem }) {
//   // const { mutate: removeFromCart } = useRemoveFromCart();

//   return (
//     <div className="flex items-center gap-4 border-b py-4">
//       <div className="relative h-16 w-16">
//         {/* {item.product.image && (
//         //   <Image
//         //     src={item.product.image}
//         //     alt={item.product.name}
//         //     fill
//         //     className="object-cover rounded"
//         //   />
//         )} */}
//       </div>
//       <div className="flex-1">
//         <h3 className="font-medium">{item.product.name}</h3>
//         <p className="text-gray-600">${item.product.price.toFixed(2)} × {item.quantity}</p>
//       </div>
//       <button 
//         onClick={() => removeFromCart(item.product.id)}
//         className="text-red-500 hover:text-red-700"
//       >
//         Remove
//       </button>
//     </div>
//   );
// }