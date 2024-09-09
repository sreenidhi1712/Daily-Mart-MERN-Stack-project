
import  { useState, useEffect, useContext } from 'react';
import Loader from '../Loader';
import { Context } from './Context/Context';
import ProductforMainPage from './ProductforMainPage';
import Products from './Products';
import { FaRegUser } from "react-icons/fa";
import axios from 'axios';


const url = import.meta.env.VITE_BACKEND_URL;
const token = localStorage.getItem('token');


const Navbar = () => {


  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const {

    loading,
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



  useEffect(() => {
    if (searchTerm) {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products]);
  const name = localStorage.getItem("name");

  return (
    <>
      {loading ? <Loader /> :
        <div className="bg-white w-screen h-auto flex justify-center">
          <div className='w-full hidden lap:flex flex-col'>
          <div className='w-full bg-[#BFF6C3]  min-h-16 rounded-b-3xl flex items-center justify-between'>
               <div className='px-1'>
                      <p  className='text-green-500 font-bold text-2xl lapl:text-3xl'>Daily Mart</p>
               </div>
               <div className='h-full items-center flex px-3'>
               <input
                type="text"
                placeholder="enter name of product "
                className="w-72 h-10 rounded-3xl bg-white lapl:w-96   px-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
               </div>             
          </div>
            <div className="w-full px-2 justify-center grid grid-cols-2 mm:grid-cols-2 ml:grid-cols-2 tab:grid-cols-3 lap:grid-cols-4 lapl:grid-cols-5 mon:grid-cols-6  mt-5">
            { filteredProducts.map(product => (
               <Products key={product._id} items={product} addToCart={addToCart} favouritings={addtofavourites} favourites={favourite}/>
            ))}
            </div>
            {!filteredProducts.length > 0 && searchTerm !== '' ? <div className='w-full  flex justify-center mb-10'><p className='text-xl font-bold '>{`! Sorry we don't have products you searching for`}</p></div>:<div></div>}
          </div>

          <div className=' w-full  flex flex-col items-center lap:hidden'>
          <div className="w-full h-auto p-2 flex justify-start items-center ">
            <div className="h-10 w-10 rounded-full bg-slate-200 border-2 flex justify-center items-center"><FaRegUser/></div>
            <p className="text-2xl font-bold ml-2">Hello {name}</p>
          </div>
          <div className="p-3 w-[90%] bg-[#BFF6C3] rounded-3xl mt-3 flex flex-col items-center">
            <p className="text-4xl font-bold text-green-900 ml-5">What would you like to order</p>
            <div className="w-full ">
              <input
                type="text"
                placeholder="enter name of product "
                className="w-[95%] h-10 rounded-3xl bg-white mt-5  px-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className=" flex overflow-x-scroll hide-scrollbar w-full lap:overflow-hidden lap:flex-wrap lap:justify-evenly">
            {filteredProducts.length > 0 ? filteredProducts.map(product => (
               <ProductforMainPage key={product._id} items={product} addToCart={addToCart} favouritings={addtofavourites} favourites={favourite}/>
            )) : searchTerm !== ''? <div className='w-full flex justify-center mb-5 px-2'><p className='font-bold'>{`! Sorry we don't have products you searching for`}</p></div>:<div></div>}
          </div>
          </div>
        </div>
      }
    </>
  );
};

export default Navbar;