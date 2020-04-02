const Featured = ({ style, className,...props }) => {
  return (
    <div className={"featured " + className}>
      <img className="img-fluid w-100" height="560" src={props.img} width="1440" />
      <div className="featured-content">
        {props.children}
      </div>
      <style jsx>{`
        img {
          position: relative;
          z-index: -1;
        }
        .featured {
          margin-bottom: 30px;
          overflow: hidden;
          position: relative;
        }
        .featured img {
          transition: opacity .2s;
          will-change: opacity;
        }
        .gradient:hover img {
          opacity: .75;
        }
        .featured-content {
          left: 9%;
          padding-left: 15px;
          position: absolute;
          top: 75%;
        }
        .featured-content :global(.btn) {
          margin-right: 15px;
        }
        .gradient {
          background: linear-gradient(rgba(31, 31, 31, 0) 65%, rgb(31, 31, 31)), linear-gradient(rgba(0, 0, 0, 0.5) 10%, transparent 30%);
        }
        @media (max-width: 576px) {
          .featured-content {
            padding-left: 0;
            top: 70%;
          }
        }
      `}</style>
    </div>
  )
}
export default Featured
