import { useContext, useEffect, useState } from "react";
import { Context } from "./Context/Context";
import { useParams } from "react-router-dom";
import Products from "./Products";
import { RiDeleteBin6Line } from "react-icons/ri";

import { FaHeart } from "react-icons/fa";
import ProductforMainPage from "./ProductforMainPage";
import axios from "axios";


const url = import.meta.env.VITE_BACKEND_URL;
const token = localStorage.getItem('token');

function IndividualProduct() {
  const { products , cart,  favourite, setCart, setFavourite} = useContext(Context);
  const { id } = useParams();
  const [toggleAddtoCart, setToggleAddtoCart] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);


  const addToCart =  async (item) => {
    try {
      const cartItems = [{ item: item._id, quantity: 1 }];
       await axios.post(`${url}/api/cart/add`, { cart: cartItems },{headers: { token }});

           // Update local state
           setCart((prevCart) => {
      const isItemPresent = prevCart.find((cartItem) => cartItem.item === item._id);
      if (isItemPresent) {
        return prevCart.map((cartItem) =>
          cartItem.item === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { item: item._id, quantity: 1 }];
      }
    });

      
     } catch (error) {
       console.error('Error incrementing item', error);
     }
  
   };

   const addtofavourites =  async (item) => {
    const isItemPresent = favourite.find((favouriteItem) => favouriteItem.favouriteProduct === item._id);
    console.log(isItemPresent);
    if(isItemPresent){
      try {
        await axios.post(`${url}/api/favourite/remove`, {
          itemId: item._id,
        },{headers: { token }});
         // Update local state
         setFavourite((prevFavourites) =>
        prevFavourites.filter((favouriteItem) => favouriteItem.favouriteProduct !== item._id)
      );

      } catch (error) {
        console.error('Error incrementing item', error);
      }
    }else{
      try {
        const favouriteItems = [{ favouriteProduct: item._id }];
         await axios.post(`${url}/api/favourite/add`, {
          favouriteItems,
         },{headers: { token }});
           // Update local state
      setFavourite((prevFavourites) => [
        ...prevFavourites,
        { favouriteProduct: item._id },
      ]);

        
       } catch (error) {
         console.error('Error incrementing item', error);
       }
    }
    }
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

  const individualProduct = products.find((product) => product._id === id);
  const relatedProducts = products.filter(
    (product) =>
      product.category === individualProduct.category && product._id !== id
  );

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    const isCurrentItemInCart = cart.some(
      (item) => item.item === individualProduct._id
    );
    if (isCurrentItemInCart) {
      setToggleAddtoCart(true);
      // eslint-disable-next-line react/prop-types
      setCurrentItem(
        cart.find((item) => item.item === individualProduct._id)
      );
    } else {
      setToggleAddtoCart(false);
    }
    {
      /* eslint-disable-next-line react/prop-types */
    }
  }, [cart, individualProduct._id]);

  return (
    <div className="flex flex-col  w-full items-center bg-slate-200">

      <div className="p-2 rounded-b-3xl bg-white w-full flex justify-center">
        <p className="text-2xl font-bold ">{individualProduct.name}</p>
      </div>

      <div className="flex flex-col tab:w-[65%] lap:w-[45%] w-[92%] mt-3 items-center rounded-lg bg-white relative">
        <div className="h-40 w-[95%]  rounded-lg mt-5 border-2">
          <img
            src={`${url}/images/${individualProduct.image}`}
            alt={individualProduct.name}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="flex w-[95%] rounded-lg border-2 my-2">
          <div className="flex flex-col w-[50%] px-2">
            <p>{individualProduct.name}</p>
            <p><span className="font-bold">Price :</span>${individualProduct.price}</p>
          </div>
          <div className="w-[50%] flex justify-center">
            {toggleAddtoCart ? (
              <div className="flex gap-2 items-center mt-3 mb-2">
                <div className="flex items-center mt-3 mb-2 gap-2 border-2  h-7 w-20 justify-evenly rounded-md">
                        <div className="flex items-center justify-center border-r-2 px-2">
                                <p className="font-bold text-lg" onClick={() => decrement(individualProduct)}>-</p>
                        </div>
                        <div>
                                <p className="font-bold">{currentItem?.quantity}</p>
                        </div>
                        <div className="flex items-center justify-center border-l-2 px-2">
                            <p  className="font-bold text-lg"  onClick={() =>increment(individualProduct)}>+</p>
                        </div>
                </div>
                <RiDeleteBin6Line
                  className={`h-5 w-5 fill-red-600`}
                  onClick={() => RemoveItem(individualProduct)}
                >
                  delete
                </RiDeleteBin6Line>
              </div>
            ) : (
              <button
                className={`text-green-500 h-8 w-[80%] mt-3 mb-2 bg-white border-2 font-extrabold rounded-lg self-center text-xs`}
                onClick={() => addToCart(individualProduct)}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
            {/* eslint-disable-next-line react/prop-types */}
                           <div className={`absolute right-1 top-2 p-2 rounded-full  flex items-center justify-center ${favourite.some((favItem) => favItem.favouriteProduct === individualProduct._id) ? 'bg-red-100' : 'bg-green-200'} `}>
                 {/* eslint-disable-next-line react/prop-types */}
                <FaHeart className={` h-4 w-4 cursor-pointer ${favourite.some((favItem) => favItem.favouriteProduct === individualProduct._id) ? 'text-red-500' : 'text-green-600'}`} onClick={()=>
                {
                    addtofavourites(individualProduct);  
                }}/>
                </div>
      </div>

      <div className="flex tab:w-[65%] lap:w-[45%] flex-col w-[92%] mt-3 items-center rounded-lg bg-white p-4">
        <p className="text-justify">{individualProduct.description}</p>
      </div>

      <p className="self-start ml-3 font-bold mt-2 text-xl">Related Products</p>
      <div className="lap:hidden  flex overflow-x-scroll hide-scrollbar w-full lap:overflow-hidden lap:flex-wrap lap:justify-evenly mb-16">
        {relatedProducts.map((items) => {
          return (
            <ProductforMainPage
              key={items._id}
              items={items}
              addToCart={addToCart}
              favouritings={addtofavourites}
              favourites={favourite}
            />
          );
        })}
      </div>
      <div className="mb-14 hidden w-full px-2 lap:grid grid-cols-2 mm:grid-cols-2 ml:grid-cols-2 tab:grid-cols-3 lap:grid-cols-4 lapl:grid-cols-5 mon:grid-cols-6  mt-5">
          {/* Products start here */}
          {relatedProducts.map((items) => {
            return <Products key={items._id} items={items} addToCart={addToCart} favouritings={addtofavourites} favourites={favourite} />
          })}
        </div>
    </div>
  );
}

export default IndividualProduct;
