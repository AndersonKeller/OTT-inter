export default function MediaDescription(props) {
  return (
    <div className="description">
      <h1 className="h2">{props.media.title}</h1>
      <div className="year">{props.media.year}</div>
      <div className="text">
        <p>{props.media.description}</p>
      </div>
      <style jsx>{`
        .h2,
        .year {
          margin-bottom: 10px;
        }
        .text {
          margin-bottom: 20px;
        }
        @media (min-width: 768px) {
          .description {
            margin-left: 10px;
          }
          .text {
            margin-bottom: 35px;
          }
        }
      `}</style>
    </div>
  )
}
