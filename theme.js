
import Color from 'color'
import { CONFIG } from '~/config'

const theme = {
  colors: {
    primary: Color(CONFIG.color).lighten(.2).string(),
    primaryHover: CONFIG.color,
    primaryAlpha: Color(CONFIG.color).lighten(.2).alpha(.3).string(),
  },
}

export default theme
