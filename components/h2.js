import styled, { ThemeProvider } from 'styled-components'
import { spacing } from '@material-ui/system'

const H2 = ({ children, uppercase, theme, ...other }) => {

  const extendTheme = {
    ...theme,
    spacing: value => value * 5,
  }

  const StyledH2 = styled.h2`${spacing}
    text-transform: ${uppercase ? 'uppercase': 'none'};
    @media (min-width: 768px) {
      --font-size: 22px;
    }
    @media (min-width: 992px) {
      --font-size: 31px;
    }
  `

  return <>
    <StyledH2 theme={extendTheme} {...other}>{children}</StyledH2>
  </>
}

export default H2
