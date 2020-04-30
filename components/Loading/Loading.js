import ClipLoader from 'react-spinners/ClipLoader'

const Loading = ({loadingState, size, color, style}) => {
  return (
    <ClipLoader
      sizeUnit={"px"}
      size={size || 80}
      color={color || 'var(--primary)'}
      loading={loadingState}
      style={style}
    />
  )
}

export default Loading
