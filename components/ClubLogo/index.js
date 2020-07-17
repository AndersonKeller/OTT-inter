import { CONFIG } from "~/config"
import { STATIC_PATH } from "~/constants/constants"

export default ({ alt = CONFIG.clubName, className = '', style = {} }) => {

  const classes = 'img-fluid' + (className !== '' ? ' ' + className : '')

  return (
    <>

      <img alt={alt} className={classes} src={`${STATIC_PATH}/logos/club.png`} style={style} />

      <style jsx>{`
        img {
          display: inline-block;
        }
      `}</style>

    </>
  )
}
