import ReactSVG from 'react-svg'
import { css } from 'glamor'

export default function Chevron(props) {
  const styles = css({
    ' svg': {
      height: props.height,
      pointerEvents: 'none',
      transform: `rotate(${props.dir === 'left' ? '90deg' : '-90deg'})`,
      width: props.width,
    },
    ' path': {
      fill: '#fff',
    },
  })
  return props.inline ? (
    <div>
      <ReactSVG fallback={props.alt} src="/static/chevron-icon.svg" {...styles} />
    </div>
  ) : (
    <img alt={props.alt} height={props.height} src="/static/chevron-icon.svg" width={props.width} />
  );
}
