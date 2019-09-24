import ReactSVG from 'react-svg'
import { css } from 'glamor'

export default function Chevron(props) {
  let transformDirection
  switch (props.dir) {
    case 'left':
      transformDirection = '90deg'
      break;
    case 'bottom':
      transformDirection = '0deg'
      break;
    default:
      transformDirection = '-90deg'
      break;
  }
  const styles = css({
    ' svg': {
      height: props.height,
      pointerEvents: 'none',
      transform: `rotate(${transformDirection})`,
      width: props.width,
    },
    ' path': {
      fill: '#fff',
    },
  })
  return props.inline ? (
    <ReactSVG
      className={props.className}
      fallback={props.alt}
      src="/static/chevron-icon.svg"
      {...styles}
      wrapper="span"
    />
  ) : (
    <img alt={props.alt} height={props.height} src="/static/chevron-icon.svg" width={props.width} />
  );
}
