import { useContext, useEffect } from 'react';
import { Context } from './Context/Context';
import axios from 'axios';

const url = import.meta.env.VITE_BACKEND_URL;

const Orders = () => {
  const { orders, products ,setOrders,setLoading} = useContext(Context);
const token = localStorage.getItem('token');




  useEffect(() => {
    const getOrders = async () => {
      try {
        const response =await axios.post(`${url}/api/order/userorders`, {},
          { headers : { token } })
        const Orders =  response.data.data; 
        setOrders(Orders);
      } catch (error) {
        console.error('Error fetching user data', error);
      }finally{
        setLoading(false);
      }
    }

    getOrders();
  }, [ setLoading, setOrders, token]);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-green-600">Your Orders</h1>
      <div className="container mx-auto px-4 mb-10 ">
        {orders.length > 0 ? (
          <div className="grid grid-cols-1 lap:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {orders.map((order) => (
              <div key={order._id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Order ID: {order._id}</h2>
                <p className="text-gray-700 mb-2">Total Amount: <span className="font-medium text-gray-900">Rs {order.amount}</span></p>
                <p className="text-gray-700 mb-2">Payment Status: <span className={`font-medium ${order.payment ? 'text-green-600' : 'text-red-600'}`}>{order.payment ? "Paid" : "Not Paid"}</span></p>
                <p className="text-gray-700 mb-2">Payment Type: <span className="font-medium text-gray-900">Cash on Delivery</span></p>
                <p className="text-gray-700 mb-2">Order Date: <span className="font-medium text-gray-900">{new Date(order.date).toLocaleDateString()}</span></p>
                <p className="text-gray-700 mb-2">Status: <span className="font-medium text-gray-900">{order.status}</span></p>
                <p className="text-gray-700 mb-2">Address: <span className="font-medium text-gray-900">{order.address}</span></p>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Ordered Items:</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {order.orderItems.map((item, index) => {
                      const product = products.find(p => p._id === item.item);
                      return (
                        <li key={index} className="text-gray-700 flex items-center space-x-4">
                          {product && (
                            <div className='w-[99%] flex justify-between p-2 bg-slate-200 rounded-lg'>
                              <img src={`${url}/images/${product.image}`} alt={product.name} className="w-16 h-16 object-cover rounded-lg shadow-sm" />
                              <div>
                                <p className="font-bold text-gray-900">{product.name}</p>
                                <p className='font-bold'><span className="font-bold text-green-500"> Quantity : </span>{item.quantity} </p>
                                <p  className='font-bold'><span className="font-bold text-green-500"> Price for each :  </span> Rs {product.price}</p>
                              </div>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-700">
            <p className="text-xl">No orders placed yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;