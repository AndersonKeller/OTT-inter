import styled from 'styled-components'
import { spacing } from '@material-ui/system'

const StyledH2 = styled.h2`
  ${spacing}
  text-transform: ${props => props.uppercase ? 'uppercase': 'none'};
  @media (min-width: 768px) {
    --font-size: 22px;
  }
  @media (min-width: 992px) {
    --font-size: 31px;
  }
`

const H2 = ({ children, uppercase, theme, ...other }) => {
  const extendTheme = {
    ...theme,
    spacing: value => value * 5,
  }
  return (
    <StyledH2 theme={extendTheme} uppercase={uppercase} {...other}>
      {children}
    </StyledH2>
  )
}

export default H2
