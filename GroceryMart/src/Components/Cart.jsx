
import { useState, useEffect, useContext } from 'react';
import { MdOutlineCancel } from "react-icons/md";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { BsFillBagPlusFill } from "react-icons/bs";
import { Context } from './Context/Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const url = import.meta.env.VITE_BACKEND_URL;
const token = localStorage.getItem('token');

function Cart() {
  const { products ,cart,setCart} = useContext(Context);
  const navigate = useNavigate();

  const [total, setTotal] = useState(0);
  const [productWithDetails, setProductWithDetails] = useState([]);
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const cartWithDetails = cart.map(cartItem => {
          const product = products.find(item => item._id === cartItem.item);
          return {
            ...product,
            quantity: cartItem.quantity,
          };
        });

        setProductWithDetails(cartWithDetails);

        let newTotal = 0;
        cartWithDetails.forEach(item => {
          newTotal += item.quantity * item.price;
        });
        setTotal(newTotal);
      } catch (error) {
        console.error('Error fetching product details', error);
      }
    };

    fetchProductDetails();
  }, [ cart, products]);

 

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
  const sendOrder = async () => {
    try {
      const response = await axios.post(`${url}/api/order/place`, {
        items: cart,
        amount: total,
        address,
      }, {
        headers: { token }
      });

      if (response.data.success) {
        alert('Order Placed!');
        try {
         await axios.post(`${url}/api/cart/clear`, {}, {
            headers: { token }
          });
          navigate("/orders");
        } catch (error) {
          console.error('Error emptying cart', error);
        }
      }
    } catch (error) {
      console.error('Error placing order', error);
    }
  };

  return (
    <div className='h-auto w-screen'>
      <div className='flex h-50 w-full items-center justify-center mt-20'>
        <h1 className='text-4xl font-semibold tab:text-5xl lapl:text-7xl py-5'>Cart</h1>
      </div>
      <div className="flex flex-col items-center bg-slate-100 w-full">
        <div className='hidden lap:flex w-[95%]'>
          {cart.length > 0 && (
            <div className={`flex flex-col w-full mt-10 lap:flex lap:flex-row`}>
              <div className='h-14 w-full flex items-center justify-end'></div>
              <div className='h-auto py-5 w-full flex justify-center'></div>
              <div className='h-14 w-full flex justify-center'><p>Products</p></div>
              <div className='h-14 w-full flex justify-center'><p>Price</p></div>
              <div className='h-14 w-full flex justify-center'><p>Quantity</p></div>
              <div className='h-14 w-full border-b-slate-200 flex justify-center'><p>SubTotal</p></div>
            </div>
          )}
        </div>
        {productWithDetails.map((items) => (
          <CartItem key={items._id} items={items} RemoveItem={RemoveItem} incrementItem={increment} decrementItem={decrement} />
        ))}
      </div>
      {cart.length > 0 ? (
        <div className='flex flex-col w-full items-center my-10 lap:items-end'>
          <div className='w-[80%] flex justify-center border-[0.5px] lap:w-[30%] lap:mr-20'>
            <p className='py-5'>Cart Totals</p>
          </div>
          <div className='w-[80%] flex flex-col items-center border-[0.5px] lap:w-[30%] lap:mr-20'>
            <div className='flex justify-between w-[90%] py-5 border-b-[0.5px]'>
              <p>Subtotal</p>
              <p>Rs {total}</p>
            </div>
            <div className='flex justify-between w-[90%] py-5 border-b-[0.5px]'>
              <p>Total</p>
              <p>Rs {total}</p>
            </div>
            <div className='flex justify-center w-[90%] py-5 border-b-[0.5px]'><p className='font-bold'>Kindly Note - Accepting orders only on COD</p></div>
            <input
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className='w-[90%] h-10 mt-5 mb-5 p-2 border'
            />
            <button
              className='w-[90%] h-10 bg-blue-600 mt-5 mb-5 disabled:bg-gray-400'
              onClick={sendOrder}
              disabled={!address}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center mt-20'>
          <BsFillBagPlusFill className='h-28 w-28' />
          <p className='text-4xl mt-10'>Your Cart is Empty</p>
        </div>
      )}
    </div>
  );
}

export default Cart;

// eslint-disable-next-line react/prop-types
const CartItem = ({ items, RemoveItem, incrementItem, decrementItem }) => {
  return (
    <>
      <div className='flex flex-col w-[80%] mt-10 lap:mt-0 lap:flex lap:flex-row lap:w-[95%]'>
        <div className='h-14 w-full border-t-[0.5px] flex items-center justify-end lap:justify-center lap:py-5'>
          <MdOutlineCancel onClick={() => {
            RemoveItem(items);
            navigator.vibrate(100);
          }} className='h-5 w-5 cursor-pointer' />
        </div>
        <div className='h-auto py-5 w-full border-t-[0.5px] flex justify-center lap:items-center lap:py-5'>
            {/*  eslint-disable-next-line react/prop-types */}
          <img src={`${url}/images/${items.image}`} alt="" className="h-14 w-14 object-cover" />
        </div>
        <div className='h-14 w-full border-t-[0.5px] flex justify-between lap:justify-center lap:items-center lap:py-5'>
          <p className='lap:hidden'>Products</p>
            {/*  eslint-disable-next-line react/prop-types */}
          <p className='font-bold'>{items.name}</p>
        </div>
        <div className='h-14 w-full border-t-[0.5px] flex justify-between lap:justify-center lap:items-center lap:py-5'>
          <p className='lap:hidden'>Price</p>
            {/*  eslint-disable-next-line react/prop-types */}
          <p className='font-bold'>Rs {items.price}</p>
        </div>
        <div className='h-14 w-full border-t-[0.5px] flex justify-between lap:justify-center lap:items-center lap:py-5'>
          <p className='lap:hidden'>Quantity</p>
          <div className='flex gap-5 items-center lap:justify-center lap:py-5'>
            <button className='font-bold cursor-pointer' onClick={() => {
              incrementItem(items);
            }}><CiCirclePlus /></button>
              {/*  eslint-disable-next-line react/prop-types */}
            <p className='font-bold'>{items.quantity}</p>
            <button className='font-bold cursor-pointer' onClick={() => {
              decrementItem(items);
            }}><CiCircleMinus /></button>
          </div>
        </div>
        <div className='h-14 w-full border-t-[0.5px] border-b-slate-200 flex justify-between lap:justify-center lap:items-center lap:py-5'>
          <p className='lap:hidden'>SubTotal</p>
          {/*  eslint-disable-next-line react/prop-types */}
          <p className='font-bold'>Rs {items.quantity * items.price}</p>
        </div>
      </div>
    </>
  );
};