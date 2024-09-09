import  { useContext, useEffect, useState } from 'react'
import Products from './Products'
import { CiHeart } from "react-icons/ci";
import { Context } from './Context/Context';
import axios from 'axios';


const url = import.meta.env.VITE_BACKEND_URL;
const token = localStorage.getItem('token');


function FavouriteItem() {
 
  const [favouriteProduct, setFavouriteProduct] = useState([]);

 const {
  products,
  favourite,
  setCart,
  setFavourite
} = useContext(Context);


  
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



   const removefavourites =  async (item) => {
     try {
        await axios.post(`${url}/api/favourite/remove`, {
          itemId: item._id,
        },{headers: { token }});

        setFavourite((prevFavourites) =>
          prevFavourites.filter((favouriteItem) => favouriteItem.favouriteProduct !== item._id)
        );
  
       
      } catch (error) {
        console.error('Error incrementing item', error);
      }
  
    };
 
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Map cart items to include product details
        const favouriteItemWithDetails = favourite.map(favouriteItem => {
          const product = products.find(item => item._id === favouriteItem.favouriteProduct);
          return {
            ...product,
          };
        });
  
        setFavouriteProduct(favouriteItemWithDetails);
      } catch (error) {
        console.error('Error fetching product details', error);
      }
    };
  
    fetchProductDetails();
  }, [favourite, products]);

  return (
   <div className=' mt-10 flex flex-col items-center mb-14'>
   <div>
    <p className='mt-10 text-black text-7xl '>Favourites</p>
   </div>
{favouriteProduct.length === 0 && <div className='flex  flex-col items-center mt-20'> <CiHeart  className='h-28 w-28 '/><p className='text-4xl  mt-10'>No favourites,please add some</p></div> }

<div className="w-full px-2 grid grid-cols-2 mm:grid-cols-2 ml:grid-cols-2 tab:grid-cols-3 lap:grid-cols-4 lapl:grid-cols-5 mon:grid-cols-6  mt-5">
   {favouriteProduct.map((items)=>{
           return <Products key={items._id} items={items} addToCart={addToCart} favouritings={removefavourites} favourites={favourite}/>  
                })}
                
             </div> 
   </div>
  )
}

export default FavouriteItem
