import { useEffect, useState } from 'react'
import { menuService } from '../service/menu_service'
import toast from 'react-hot-toast'

interface RecipeFormProps {
  onSubmit?: (data: any) => void
  onCancel?: () => void
  dataEdit?: any
}

const FormResep = ({ onSubmit,dataEdit }: RecipeFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category_id: '',
    cooking_duration: ''
  })
  const [ingredients, setIngredients] = useState(['', '', ''])
  const [instructions, setInstructions] = useState(['', '', ''])
  useEffect(() => {
    if(dataEdit){
      setFormData({
        name: dataEdit.name,
        description: dataEdit.description,
        category_id: dataEdit.category_id,
        cooking_duration: dataEdit.cooking_duration,
      })
       fetchDetail();
    }
  }, [])
  const fetchDetail = async () => {
    try{
      const response = await menuService.getBySlug(dataEdit.slug)
      const dataDetail = response.data.menu
      const mapIngredients = dataDetail.ingredients.map(
        (ing: any) => ing.description
      )
      const mapInstructions = dataDetail.recipes.map(
        (rec: any) => rec.description
      )
      setIngredients(mapIngredients)
      setInstructions(mapInstructions)
    }
    catch{
      toast.error('Gagal load resep')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit({
        ...formData,
        ingredients: ingredients.filter(i => i.trim() !== ''),
        instructions: instructions.filter(i => i.trim() !== '')
      })
    }
  }
  const addIngredient = () => {
    setIngredients([...ingredients, ''])
  }

  const addInstruction = () => {
    setInstructions([...instructions, ''])
  }

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = value
    setIngredients(newIngredients)
  }

  const updateInstruction = (index: number, value: string) => {
    const newInstructions = [...instructions]
    newInstructions[index] = value
    setInstructions(newInstructions)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-gray-50 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-6">Informasi Utama</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Resep
            </label>
            <input
              type="text"
              placeholder="Nama Resep"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#E8B431] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi
            </label>
            <input
              type="text"
              placeholder="Isi deskripsi singkat tentang makanan"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#E8B431] transition-colors"
            />
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kategori
          </label>
          <select
            value={formData.category_id}
            onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
            className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#E8B431] transition-colors appearance-none cursor-pointer"
          >
            <option value="">Kategori</option>
            <option value="1">Appetizer</option>
            <option value="2">Main Course</option>
            <option value="3">Dessert</option>
            <option value="4">Beverages</option>
            <option value="5">Side Dish</option>
          </select>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Durasi Masak
          </label>
          <div className="relative w-full md:w-1/2">
            <input
              type="number"
              placeholder="60 menit"
              value={formData.cooking_duration}
              onChange={(e) => setFormData({ ...formData, cooking_duration: e.target.value })}
              className="w-full px-4 py-3 pr-16 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#E8B431] transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />

            {formData.cooking_duration && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">
              menit
            </span>}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-700">Bahan - Bahan</h3>
            <button
              type="button"
              onClick={addIngredient}
              className="text-sm text-gray-600 hover:text-[#E8B431] font-medium transition-colors"
            >
              Tambah Bahan
            </button>
          </div>
          
          <div className="space-y-4">
            {ingredients.map((ingredient, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Bahan ${index + 1}`}
                value={ingredient}
                onChange={(e) => updateIngredient(index, e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#E8B431] transition-colors"
              />
            ))}
          </div>
        </div>
        <div className="bg-gray-50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-700">Instruksi Masak</h3>
            <button
              type="button"
              onClick={addInstruction}
              className="text-sm text-gray-600 hover:text-[#E8B431] font-medium transition-colors"
            >
              Tambah Instruksi
            </button>
          </div>
          <div className="space-y-4">
            {instructions.map((instruction, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Instruksi ${index + 1}`}
                value={instruction}
                onChange={(e) => updateInstruction(index, e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#E8B431] transition-colors"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-[#E8B431] hover:bg-[#d4a229] text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-lg"
        >
          {dataEdit ? 'Update Resep' : 'Simpan Resep'}
        </button>
      </div>
    </form>
  )
}

export default FormResep
