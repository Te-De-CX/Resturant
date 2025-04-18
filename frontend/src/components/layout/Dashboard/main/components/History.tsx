import { useUserOrders } from '@/lib/hooks/useOrders';
import { orderApi } from '@/lib/api/orders';
import { useCurrentUser } from '@/lib/api/auth';
import { format, parseISO } from 'date-fns';

const History = () => {
  const { data: user } = useCurrentUser();
  const { 
    data: orders, 
    isLoading, 
    error 
  } = useUserOrders(user?.id);
  
  const allOrders = orderApi.getAllOrders();

  // const { 
  //   data: ordered, 
  // } = useOrder(1);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Date unavailable';
    
    try {
      return format(parseISO(dateString), 'MMMM d, yyyy - h:mm a');
    } catch (error) {
      console.warn(`Invalid date format: ${error}`, dateString);
      return 'Date unavailable';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 text-center">
        {error.message || 'Failed to load your order history'}
        {error.details && <p className="text-sm">{error.details}</p>}
      </div>
    );
  }

  console.log(allOrders)

  return (
    <section className="w-full bg-[#191919] min-h-screen text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Your Order History</h1>
        
        {!orders || orders.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400">You haven&apos;t placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-[#2a2a2a] rounded-lg p-4 shadow-md">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="font-semibold text-lg">Order #{order.id}</h2>
                    <p className="text-gray-400 text-sm">
                      {formatDate(order.created_at)}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    order.status.toLowerCase() === 'completed' 
                      ? 'bg-green-900 text-green-300' 
                      : order.status === 'cancelled' 
                        ? 'bg-red-900 text-red-300' 
                        : 'bg-amber-900 text-amber-300'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>

                <div className="border-t border-gray-700 my-3 pt-3">
                  <h3 className="font-medium mb-2">Items:</h3>
                  <ul className="space-y-2">
                    {order.items.map((item) => (
                      <li key={item.product.id} className="flex justify-between">
                        <div className="flex items-center">
                          <span className="text-amber-400 mr-2">×{item.quantity}</span>
                          <span>{item.product.name}</span>
                        </div>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center border-t border-gray-700 pt-3">
                  <span className="font-medium">Total:</span>
                  <span className="text-xl font-bold">${order.total.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default History;