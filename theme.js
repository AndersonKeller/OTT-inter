
import Color from 'color'
import { CONFIG } from '~/config'

const theme = {
  colors: {
    primary: CONFIG.color,
    primaryHover: Color(CONFIG.color).darken(.2).string(),
  },
}

export default theme
