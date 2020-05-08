
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
    backgroundContrast2: CONFIG.backgroundContrastColor2,
    black: BLACK,
    white: WHITE,
    texts: CONFIG.textColor,
  },
}

export default theme
