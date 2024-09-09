import { useParams } from "react-router-dom"
import  { useContext, useEffect ,useState} from "react";
import './Style.css';
import { Context } from "./Context/Context";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Products from "./Products";
import Loader from "../Loader";
import axios from "axios";


const url = import.meta.env.VITE_BACKEND_URL;
const token = localStorage.getItem('token');

function IndividualCategory() {

    const {category} = useParams();

    
  const [data, setData] = useState([]);

  const {
    loading,
    setLoading,
    products,
    favourite,
    setCart,
    setFavourite
    
  } = useContext(Context);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
      
        if(category === 'Bakery'){
          const filteredData = products.filter((item) => item.category !== 'Fruits' && item.category !== 'Vegetables' && item.category !== 'Meat' && item.category !== 'Dairy' && item.category !== 'Cooking Essentials'&& item.category !== 'Oil');
          setData(filteredData);
        }else {const filteredData = products.filter((item) => item.category === category);
        setData(filteredData);
        }
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    };

    fetchData();
  }, [category, products, setLoading]);

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
    <div className="flex flex-col items-center w-full mb-14 bg-slate-100">
        <p className="mt-10 font-light text-2xl text-center font-serif">{`Get all your favourite  ${category}  here`}</p>
     
         {loading ? <Loader/> : <div className="w-full px-2 grid grid-cols-2 mm:grid-cols-2 ml:grid-cols-2 tab:grid-cols-3 lap:grid-cols-4 lapl:grid-cols-5 mon:grid-cols-6  mt-5">
            {/* Products start here */}
            {data.map((items)=>{
            
              return <Products key={items._id} items={items} addToCart={addToCart} favouritings={addtofavourites} favourites={favourite}/>
            
            
             
                })}
          </div>

          
}
</div>
  )
}

export default IndividualCategory
