import ClipLoader from 'react-spinners/ClipLoader'

const Loading = ({ loadingState }) => {
  return (
    <ClipLoader
      color="var(--loading)"
      loading={loadingState}
      size={80}
      sizeUnit={"px"}
    />
  )
}

export default Loading
