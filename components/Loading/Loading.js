import ClipLoader from 'react-spinners/ClipLoader'

const Loading = ({ color = 'var(--loading)', loadingState, size = 80, style }) => {
  return (
    <ClipLoader
      color={color}
      loading={loadingState}
      size={size}
      sizeUnit="px"
      style={style}
    />
  )
}

export default Loading
