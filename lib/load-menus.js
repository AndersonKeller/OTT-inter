import api from '../services/api'

export default async function loadMenus(ctx) {
  const response = await api(ctx).get('/menus')
  const data = response.data
  return data
}
