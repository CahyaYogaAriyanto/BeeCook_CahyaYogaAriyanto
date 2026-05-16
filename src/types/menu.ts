export interface Ingredient {
  description: string
}

export interface Recipe {
  description: string
  sort_number: string
}

export interface Nutrition {
  calory: string
  protein: string
  carbohydrate: string
  fat: string
}

export interface Menu {
  id: number
  name: string
  slug: string
  description: string
  cooking_duration: string
  category_id: number
  image?: string
  category?: {
    id: number
    name: string
  }
  ingredients: Ingredient[]
  recipes: Recipe[]
  nutritions: Nutrition
}