
import { CiDiscount1 } from "react-icons/ci";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { FaGooglePlay } from "react-icons/fa6";
import { FaApple } from "react-icons/fa";


function FooterPart() {
  
  
  
  return (
    <div className="h-auto w-full  flex flex-col items-center mb-14 mt-5 " >
          <div className="w-[95%] h-20 rounded-3xl bg-white flex justify-between px-2 drop-shadow-xl lap:w-[70%] lapl:w-[50%]">
                    <div className="h-full flex flex-col items-center">
                          <CiDeliveryTruck className="h-7 w-7" />
                          <p  className="font-light text-sm">Free Delivery</p>
                    </div>
                    <div className="h-full flex flex-col items-center">
                        <VscWorkspaceTrusted className="h-7 w-6" />
                        <p  className="font-light text-sm">Secure Payments</p>
                    </div>
                    <div className="h-full flex flex-col items-center">
                          <CiDiscount1 className="h-6 w-6" />
                          <p  className="font-light text-sm">Best  Deals</p>
                    </div>
          </div>
          <div className="w-full flex flex-col items-center p-2 bg-orange-400 mt-6">
                  <p className="text-white font-light">
                    follow us 
                  </p>
                  <div className="w-full flex justify-between mt-2 lap:w-[30%] tab:w-[50%]">
                          <FaFacebookF className="h-6 w-6 mx-2 text-white" />
                          <FaTwitter className="h-6 w-6 mx-2 text-white" />
                          <FaInstagram className="h-6 w-6 mx-2 text-white" />
                          <FaGooglePlay className="h-6 w-6 mx-2 text-white" />
                          <FaApple className="h-6 w-6 mx-2 text-white" />
                  </div> 
          </div>
          <div className="w-full p-2 flex items-center justify-center bg-black">
                    <p className="text-white text-xs font-thin">Copyrights @Sreenidhid, All rights reserved</p>
          </div>
    </div>
  );
}

export default FooterPart;

