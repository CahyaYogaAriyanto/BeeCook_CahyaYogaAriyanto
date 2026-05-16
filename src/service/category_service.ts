import { api } from './axios'

export const categoryService = {
  getAll: async (search = '') => {
    const response = await api.get('/category', {
      params: { search },
    })

    return response.data
  },

  uploadImage: async (id: number, file: File) => {
    const formData = new FormData()
    formData.append('image', file)

    const response = await api.put(
      `/category/upload/${id}`,
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