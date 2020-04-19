
import Color from 'color'
import { CONFIG } from '~/config'

const theme = {
  colors: {
    primary: CONFIG.color,
    primaryHover: Color(CONFIG.color).darken(.2).string(),
    primaryAlpha: Color(CONFIG.color).lighten(.2).alpha(.3).string(),
  },
}

export default theme
