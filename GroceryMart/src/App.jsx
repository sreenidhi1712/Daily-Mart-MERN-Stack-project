
import './App.css'
import Mainpage from './ApplicationPage/Mainpage'
import  { Context } from './Components/Context/Context'
import { BrowserRouter } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import axios from 'axios'



const url = import.meta.env.VITE_BACKEND_URL;


function App() {

  const token = localStorage.getItem('token');
  const {
    setProducts,
    setLoading,
    setCart,
    setFavourite,
  } = useContext(Context);


  


  
  useEffect(() => {

    const getUser = async () => {
      try {
        const response = await axios.post(`${url}/api/user/getUser`, {},{
          headers: { token }
        });
     
        const productsResponse = await axios.get(`${url}/api/product/list`); 
        const Products = productsResponse.data.data; 
        setCart(response.data.user.cartData);
        setFavourite(response.data.user.favouriteItem);
        setProducts(Products);
      } catch (error) {
        console.error('Error fetching user data', error);
      }finally{
        setLoading(false);
      }
    }

    getUser();
  }, [ setCart, setFavourite, setLoading, setProducts, token]);


 

  return (

    <BrowserRouter>
     <Mainpage/>
    </BrowserRouter>

   
  )
}

export default App
