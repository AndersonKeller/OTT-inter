import { CONFIG } from "~/config"
import { STATIC_PATH } from "~/constants/constants"

export default ({height = null, verticalAlign}) => {
  return (
    <>

      <img alt={CONFIG.appName} src={`${STATIC_PATH}/logos/app.svg`} />

      <style jsx>{`
        img {
          display: inline-block;
          height: ${height !== null ? (height + 'px') : 'auto'};
          vertical-align: ${verticalAlign ? verticalAlign : 'baseline'};
        }
      `}</style>

    </>
  )
}
