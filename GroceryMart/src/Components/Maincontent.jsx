import  { useContext} from "react";
import './Style.css';
import { Context } from "./Context/Context";
import FooterPart from "./FooterPart";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Loader from "../Loader";
import Navbar from "./Navbar";
import OfferCards from "./OfferCards";
import Category from "./Category";
import { useNavigate } from "react-router-dom";
import ProductforMainPage from "./ProductforMainPage";
import axios from "axios";


const url = import.meta.env.VITE_BACKEND_URL;
const token = localStorage.getItem('token');

function Maincontent() {

const navigate = useNavigate();


  const {
    isOpen,
    setIsOpen,
    loading,
    fruitsAndVegetables,
    dairyProduct,
    cookingEssentials,
    beveragesAndSnacks,
    favourite,
    setFavourite,
    setCart

    
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
   

  return (
    <>
    {loading ? <Loader/> : 
      <div className={`h-screen w-auto  lap:mt-0 overflow-x-hidden bg-slate-100`} onClick={() => {
        if (isOpen) {
          setIsOpen(false);
        }
      }}>
        <Navbar/>
        <Category/>
        <div className="flex flex-col items-center  w-full">
        <div className="w-full p-3  flex justify-between items-center lapl:w-[90%]">
          <p className="text-xl font-extrabold">Fresh picks for you</p>
          <p className="text-md text-green-500 font-extrabold hidden lap:block" onClick={()=>navigate("/viewAll/products")}>View All </p>
        </div>
          <div className="lapl:w-[90%] flex  items-center overflow-x-scroll hide-scrollbar w-full lap:overflow-hidden lap:flex-wrap lap:justify-evenly">
            {/* Products start here */}
            {fruitsAndVegetables.slice(0,5).map((items)=>{
            
              return <ProductforMainPage key={items._id} items={items} addToCart={addToCart} favouritings={addtofavourites} favourites={favourite}/>
            
             
                })}
                <div  className="h-14 w-14 px-10 py-10 rounded-full mx-5 lap:hidden  bg-green-100 flex flex-col justify-center items-center"> 
                  <p className="text-xs  text-green-500 font-extrabold" onClick={()=>navigate("/viewAll/products")}>View All </p>
                </div>
          </div>
        </div>
        <OfferCards/>
        <div className="flex flex-col items-center  w-full">
        <div className="w-full p-3  flex justify-between items-center lapl:w-[90%]">
          <p className="text-xl font-extrabold">Beverages and Snacks</p>
          <p className="text-md text-green-500 font-extrabold hidden lap:block" onClick={()=>navigate("/viewAll/beveragesAndSnacks")}>View All </p>
        </div>
         {/* Products here */}
         <div className="lapl:w-[90%] flex items-center overflow-x-scroll hide-scrollbar w-full lap:overflow-hidden lap:flex-wrap lap:justify-evenly">
            {/* Products start here */}
            {beveragesAndSnacks.slice(0,5).map((items)=>{
            
              return <ProductforMainPage key={items._id} items={items} addToCart={addToCart} favouritings={addtofavourites} favourites={favourite}/>
            
             
                })}
                 <div  className="h-14 w-14 px-10 py-10 rounded-full mx-5 lap:hidden  bg-green-100 flex justify-center items-center"> 
                  <p className="text-xs  text-green-500 font-extrabold" onClick={()=>navigate("/viewAll/beveragesAndSnacks")}>View All </p>
                </div>
          </div>
          </div>

          
          <div className="flex flex-col items-center  w-full">
        <div className="w-full p-3  flex justify-between items-center lapl:w-[90%]">
          <p className="text-xl font-extrabold">Dairy Products</p>
          <p className="text-md text-green-500 font-extrabold hidden lap:block" onClick={()=>navigate("/viewAll/Dairy")}>View All </p>
        </div>
        {/* Products here */}
        <div className="lapl:w-[90%] flex items-center overflow-x-scroll hide-scrollbar w-full lap:overflow-hidden lap:flex-wrap lap:justify-evenly">
            {/* Products start here */}
            {dairyProduct.slice(0,5).map((items)=>{
            
              return <ProductforMainPage key={items._id} items={items} addToCart={addToCart} favouritings={addtofavourites} favourites={favourite}/>
            
             
                })}
                  <div  className="h-14 w-14 px-10 py-10 rounded-full mx-5 lap:hidden  bg-green-100 flex justify-center items-center"> 
                  <p className="text-xs  text-green-500 font-extrabold" onClick={()=>navigate("/viewAll/Dairy")}>View All </p>
                </div>
          </div>
          </div>

          <div className="flex flex-col items-center  w-full">

        <div className="w-full p-3  flex justify-between items-center lapl:w-[90%]">
          <p className="text-xl font-extrabold">Cooking Essentials</p>
          <p className="text-md text-green-500 font-extrabold hidden lap:block" onClick={()=>navigate("/viewAll/CookingEssentials")}>View All </p>
        </div>
         {/* Products here */}
         <div className="lapl:w-[90%] flex items-center overflow-x-scroll hide-scrollbar w-full lap:overflow-hidden lap:flex-wrap lap:justify-evenly">
            {/* Products start here */}
            {cookingEssentials.slice(0,5).map((items)=>{
            
              return <ProductforMainPage key={items._id} items={items} addToCart={addToCart} favouritings={addtofavourites} favourites={favourite}/>
            
             
                })}
                  <div  className="h-14 w-14 px-10 py-10 rounded-full mx-5 lap:hidden  bg-green-100 flex justify-center items-center"> 
                  <p className="text-xs  text-green-500 font-extrabold" onClick={()=>navigate("/viewAll/CookingEssentials")}>View All </p>
                </div>
          </div>
          </div>
          <FooterPart/>
       
      </div>
      }
    </>
  );
}

export default Maincontent;


