import offer1 from "../assets/cardoffer1.png"
import offer2 from "../assets/offer2.png"
import offer3 from "../assets/offer3.png"

function OfferCards() {
  return (
    <div className="mt-5">
        <div className={`flex overflow-x-scroll hide-scrollbar w-full lap:overflow-hidden lap:flex-wrap lap:gap-y-4 lap:justify-center lap:gap-2`} >
             <div className="h-32 w-64 bg-amber-300 rounded-3xl mx-3 flex-shrink-0 relative flex items-center justify-start">
                    <img src={offer1} alt="offers" className="absolute right-1 top-[15%] h-[70%] w-[50%] "/>
                    <div className="ml-3 h-[90%] w-[50%] flex flex-col justify-between">
                        <p className="text-white  font-bold">Get 50% off on your first order</p>
                        {/* <button className="text-white h-7 w-[60%] mt-3 self-start  bg-green-300 rounded-lg  text-xs">Order Now</button> */}
                    </div>
             </div>

             <div className="h-32 w-64 bg-red-300 rounded-3xl mx-3 flex-shrink-0 relative  flex items-center">
                    <img src={offer2} alt="offers" className="absolute right-1 top-[15%] h-[70%] w-[35%] "/>
                    <div className="ml-3 h-[90%] w-[50%] flex flex-col justify-between">
                        <p className="text-white  font-bold">Everyday fresh & clean with our products</p>
                        {/* <button className="text-white h-7 w-[60%] mt-3 self-start  bg-green-300 rounded-lg  text-xs">Shop Now</button> */}
                    </div>
            </div>
            
            <div className="h-32 w-64 bg-orange-300 rounded-3xl mx-3 flex-shrink-0 relative flex items-center ">
                    <img src={offer3} alt="offers" className="absolute right-1 top-[15%] h-[70%] w-[40%] "/>
                    <div className="ml-3 h-[90%] w-[60%] flex flex-col justify-between ">
                        <p className="text-white  font-bold">Make Your Breakfast Healthy and Easy</p>
                        {/* <button className="text-white h-7 w-[60%] mt-3 self-start  bg-green-300 rounded-lg  text-xs">Shop Now</button> */}
                    </div>
            </div>
        </div>
    </div>
  )
}

export default OfferCards
