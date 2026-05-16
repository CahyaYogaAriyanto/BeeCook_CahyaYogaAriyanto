import type { Category } from '../types/category'
import Appetizer from '../assets/category/category-appetizer.png'
import Beverages from '../assets/category/category-beverages.png'
import Dessert from '../assets/category/category-dessert.png'
import  MainCourse from '../assets/category/category-main-course.png'
import  SideDish from '../assets/category/category-side-dish.png'

interface Props {
  category: Category
}

const CategoryCard = ({ category }: Props) => {
  const imageUrl = category.name === 'Appetizer' ? Appetizer : category.name === 'Beverages' ? Beverages
                : category.name === 'Dessert' ? Dessert : category.name === 'Side Dish' ? SideDish :category.name === 'Main Course'? MainCourse: ''
  return (
    <div className="flex flex-col items-center gap-3 min-w-22.5">
      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
        <img
          src={imageUrl}
          alt={category.name}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="font-medium text-sm">{category.name}</p>
    </div>
  )
}
export default CategoryCard