
import { FaHeart } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "./Context/Context";




const url = import.meta.env.VITE_BACKEND_URL;
const token = localStorage.getItem('token');

// eslint-disable-next-line react/prop-types
function ProductforMainPage({ items, addToCart, favouritings, favourites }) {
  const [toggleAddtoCart, setToggleAddtoCart] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const { cart,setCart } = useContext(Context);
  const navigate = useNavigate();

  const increment = async (item) => {
    try {
       await axios.post(`${url}/api/cart/increment`, {
         itemId: item._id,
       },{headers: { token }});

       setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.item === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
      
     } catch (error) {
       console.error('Error incrementing item', error);
     }
 
   };
   const decrement = async (item) => {
    try {
       await axios.post(`${url}/api/cart/decrement`, {
         itemId: item._id,
       },{headers: { token }});

       const itemIndex = cart.findIndex(cartItem => cartItem.item === item._id);
       if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
          setCart((prevCart) =>
            prevCart.map((cartItem) =>
              cartItem.item === item._id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
            )
          );
        } else if (cart[itemIndex].quantity === 1) {
          setCart((prevCart) =>
            prevCart.filter((cartItem) => cartItem.item !== item._id)
          );
        }
      } else {
       console.error('Item not found in cart');
      }
      
     } catch (error) {
       console.error('Error decrementing item', error);
     }
 
   };

   const RemoveItem =  async (item) => {
    try {
       await axios.post(`${url}/api/cart/remove`, {
         itemId: item._id,
       },{headers: { token }});

         // Update local state
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.item !== item._id)
    );
      
     } catch (error) {
       console.error('Error incrementing item', error);
     }
    };

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    const isCurrentItemInCart = cart.some((item) => item.item === items._id);
    if (isCurrentItemInCart) {
      setToggleAddtoCart(true);
      // eslint-disable-next-line react/prop-types
      setCurrentItem(cart.find((item) => item.item === items._id));
    } else {
      setToggleAddtoCart(false);
    }
    // eslint-disable-next-line react/prop-types
  }, [cart, items._id]);

  return (
    // eslint-disable-next-line react/prop-types
    <div className="w-[40%] tab:w-[30%]  lap:w-[15%]  flex flex-col rounded-lg  items-center  mx-2 my-2 group relative bg-white flex-shrink-0 shadow-lg h-72" key={items._id}>
      {/* eslint-disable-next-line react/prop-types */}
      <div className='py-6 w-[96%] mt-1 flex items-center justify-center rounded-t-lg bg-green-100 cursor-pointer' onClick={() => navigate(`/individualProduct/${items._id}`)}>
        {/* eslint-disable-next-line react/prop-types */}
        <img src={`${url}/images/${items.image}`} alt={items.name} className="h-20 w-20 object-cover rounded-full" />
      </div>
      <div className='w-full flex flex-col items-start p-4 overflow-hidden'>
        {/* eslint-disable-next-line react/prop-types */}
        <p className=" font-semibold text-sm cursor-pointer " onClick={() => navigate(`/individualProduct/${items._id}`)}>{items.name}</p>
        {/* eslint-disable-next-line react/prop-types */}
        <p className="text-xs text-gray-600 cursor-pointer " onClick={() => navigate(`/individualProduct/${items._id}`)}>{items.category}</p>
        {/* eslint-disable-next-line react/prop-types */}
        <p className="text-green-700 font-bold cursor-pointer" onClick={() => navigate(`/individualProduct/${items._id}`)}>Rs {items.price}</p>
      </div>
      {/* eslint-disable-next-line react/prop-types */}
      <div className={`absolute right-2 top-2 p-2 rounded-full flex items-center justify-center ${favourites.some((favItem) => favItem.favouriteProduct === items._id) ? 'bg-red-100' : 'bg-green-200'}`}>
        {/* eslint-disable-next-line react/prop-types */}
        <FaHeart className={` h-4 w-4 cursor-pointer ${favourites.some((favItem) => favItem.favouriteProduct === items._id) ? 'text-red-500' : 'text-green-500'}`} onClick={() => {
          favouritings(items);
        }} />
      </div>
      <div className="absolute bottom-3 flex justify-center w-full">
      {toggleAddtoCart ? (
          <div className="flex gap-2 items-center mt-3 ">
            <div className="flex items-center gap-2 border-2 h-7 w-20 justify-evenly rounded-md">
              <div className="flex items-center justify-center border-r-2 px-2">
                <p className="font-bold text-lg" onClick={() => decrement(items)}>-</p>
              </div>
              <div>
                <p className="font-bold">{currentItem?.quantity}</p>
              </div>
              <div className="flex items-center justify-center border-l-2 px-2">
                <p className="font-bold text-lg" onClick={() => increment(items)}>+</p>
              </div>
            </div>
            <RiDeleteBin6Line className="h-5 w-5 fill-red-600 cursor-pointer" onClick={() => RemoveItem(items)} />
          </div>
        ) : (
          <button className="text-green-500 h-7 w-[80%] mt-3  bg-white border-2 font-extrabold rounded-lg self-center text-xs" onClick={() => addToCart(items)}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductforMainPage;