import { CONFIG } from "~/config"
import { STATIC_PATH } from "~/constants/constants"

export default ({alt = CONFIG.clubName, className = '' }) => {

  const classes = 'img-fluid' + (className !== '' ? ' ' + className : '')

  return (
    <>

      <img alt={alt} className={classes} src={`${STATIC_PATH}/logos/club.svg`} />

      <style jsx>{`
        img {
          display: inline-block;
          /* height: ${height !== null ? (height + 'px') : 'auto'}; */
        }
      `}</style>

    </>
  )
}
