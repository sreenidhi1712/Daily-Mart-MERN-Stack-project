
import fruit from "../assets/fruitcategory.png";
import meat from "../assets/meatcategory.png";
import dairy from "../assets/dairycategory.png";
import bakery from "../assets/bakerycategory.png";
import veggies from "../assets/veggiecategory.png";
import { useNavigate } from "react-router-dom";

const categories = [
    {
        name: "Vegetables",
        image:veggies
    },
    {
        name: "Fruits",
        image: fruit
    },
    {
        name: "Meat",
        image: meat
    },
    {
        name: "Dairy",
        image: dairy
    },
    {
        name: "Bakery",
        image: bakery
    }
]



function Category() {

    const navigate = useNavigate();
  return (
    <div className="w-full flex justify-evenly mt-3">
        {categories.map((category) => (
            <div key={category.name} className="flex flex-col items-center" onClick={()=>navigate(`/individualcategory/${category.name}`)}>
                <div className="h-12 w-12 rounded-full border-2 bg-green-100 flex items-center justify-center">
                    <img src={category.image} alt="" className="h-[70%] w-[70%] object-cover rounded-full"/>
                </div>
                <p className="text-xs font-semibold">{category.name}</p>
            </div>
        ))}
      
    </div>
  )
}

export default Category
