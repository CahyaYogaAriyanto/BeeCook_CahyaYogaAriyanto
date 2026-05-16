import { api } from './axios'
import type { Menu } from '../types/menu'

interface GetMenusParams {
  page?: number
  limit?: number
  search?: string
  category_id?: number
}

export const menuService = {
  getAll: async (params?: GetMenusParams) => {
    const response = await api.get('/menu', {
      params,
    })
    return response.data
  },

  getById: async (id: number) => {
    const response = await api.get(`/menu/find/${id}`)
    return response.data
  },

  getBySlug: async (slug: string) => {
    const response = await api.get(`/menu/detail/${slug}`)
    return response.data
  },

  create: async (payload: Partial<Menu>) => {
    const response = await api.post('/menu', payload)
    return response.data
  },

  update: async (id: number, payload: Partial<Menu>) => {
    const response = await api.patch(`/menu/update/${id}`, payload)
    return response.data
  },

  delete: async (id: number) => {
    const response = await api.delete(`/menu/delete/${id}`)
    return response.data
  },

  uploadImage: async (id: number, file: File) => {
    const formData = new FormData()
    formData.append('image', file)

    const response = await api.put(
      `/menu/upload/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )

    return response.data
  },
}