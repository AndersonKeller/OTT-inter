import ClipLoader from 'react-spinners/ClipLoader'

const Loading = ({loadingState}) => {
  return (
    <ClipLoader
      sizeUnit={"px"}
      size={80}
      color={'#ff0000'}
      loading={loadingState}
    />
  )
}

export default Loading
