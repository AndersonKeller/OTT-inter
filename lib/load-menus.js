import api from '../services/api'

export default async function loadMenus() {
  const response = await api.get('/menus')
  const data = response.data
  return data
}
