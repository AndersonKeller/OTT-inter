import Error from 'next/error'
import { STATIC_PATH } from '../constants/constants'
import { TENANT } from "~/constants/constants";
import Color from 'color'
import { useContext } from 'react'
import { ThemeContext } from 'styled-components'

export default function Custom404Page() {
  const theme = useContext(ThemeContext)
  const backgroundColor = Color(theme.colors.background).hsl().string()
  const lightColor = Color(theme.colors.texts).hsl().string()
  const whiteColor = Color(theme.colors.white).hsl().string()
  return (
    <div className="error">
      <Error
        statusCode={404}
        title='No se pudo encontrar esta página'
      />
      <style global jsx>{`
        .error > div {
          background: ${backgroundColor} !important;
          color: ${whiteColor} !important;
        }
        .error > div > div::after {
          content: url(${STATIC_PATH}/logos/logo.png);
          display: block;
          height: auto;
          margin-right: auto;
          margin-top: 15px;
          margin-left: auto;
          max-width: 100%;
          width: 150px;
        }
        .error > div h1 {
          border-right-color: ${lightColor} !important;
        }
      `}</style>
    </div>
  )
}
