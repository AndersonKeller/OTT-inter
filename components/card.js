const Card = (props) => {
  return (
    <div>
      <img height="256" src={props.src} width="180" />
      <style jsx>{`
        img {
          display: block;
          height: auto;
          width: 100%;
        }
      `}</style>
    </div>
  )
}
export default Card
