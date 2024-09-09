import { IoMdHome } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { IoBagOutline } from "react-icons/io5";
import { useContext } from "react";
import { Context } from "./Context/Context";
// import { viewarticle } from '../Store-for-redux/IndividualArticle';
// import { useSelector } from 'react-redux';

function FooterMenu() {
  const navigate = useNavigate();
  const {cart,favourite} = useContext(Context);

  return (
    <div className='bottom-0 left-0 fixed w-screen h-14 rounded-t-3xl bg-[#BFF6C3] flex justify-center'>
      <div className="h-full lap:w-[60%] w-full flex items-center justify-evenly">
      <div className="p-2 bg-gray-50 rounded-full ">
             <IoMdHome className='h-5 w-5 text-black' onClick={()=>navigate('/')}/>
              
      </div>
      <div className="p-2 bg-gray-50 rounded-full relative">
            <IoCartOutline  className='h-5 w-5 text-black' onClick={()=>navigate('/cart')}/>
              {cart.length > 0 && (
            <div className="absolute top-[-8px] right-[-10px] py-1 px-2  rounded-full bg-blue-100">
            <p className=" font-bold text-xs text-blue-700">{cart.length}</p>
              </div>
              )}
      </div>
       <div className="p-2 bg-gray-50 rounded-full relative">
            <FaRegHeart  className='h-5 w-5  text-black' onClick={()=>navigate('/favourite')}/>
              {favourite.length > 0 && (
            <div className="absolute top-[-8px] right-[-10px] py-1 px-2  rounded-full bg-red-100">
            <p className=" font-bold text-xs text-red-700">{favourite.length}</p>
              </div>
              )}
       </div>
       <div className="p-2 bg-gray-50 rounded-full">
            <IoBagOutline  className='h-5 w-5  text-black' onClick={()=>navigate('/orders')}/>
       </div>

      </div>
    </div>
  )
}

export default FooterMenu
