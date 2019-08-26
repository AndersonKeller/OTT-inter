const Featured = (props) => {
  return (
    <div className="featured">
      <img className="img-fluid w-100" height="560" src={props.img} width="1440" />
      <div className="featured-content">
        {props.children}
      </div>
      <style jsx>{`
        .featured {
          margin-bottom: 30px;
          overflow: hidden;
          position: relative;
        }
        .featured-content {
          left: 9%;
          padding-left: 15px;
          position: absolute;
          top: 75%;
        }
      `}</style>
    </div>
  )
}
export default Featured
