
import Color from 'color'
import { CONFIG } from '~/config'
import { BLACK, WHITE } from './constants/colors'

const theme = {
  colors: {
    primary: CONFIG.color,
    primaryHover: Color(CONFIG.color).darken(.2).string(),
    primaryAlpha: Color(CONFIG.color).lighten(.2).alpha(.3).string(),
    loading: CONFIG.loadingColor === 'secondary' ? CONFIG.secondaryColor : CONFIG.color,
    background: CONFIG.backgroundColor,
    backgroundContrast: CONFIG.backgroundContrastColor,
    black: BLACK,
    white: WHITE,
  },
}

export default theme
