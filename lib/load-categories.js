import { api } from '../services/api'

export default async function loadCategories() {
  const response = await api.get('/categories')
  const categories = response.data
  return categories
}
