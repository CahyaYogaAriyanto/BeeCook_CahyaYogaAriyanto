import axios from 'axios'

export const api = axios.create({
  // saya buat seperti ini karena takutnya ketika clone dari github file .env tidak ikut terclone
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://frontend-api.gbeeglow.id',
  headers: {
    'Content-Type': 'application/json',
  },
})