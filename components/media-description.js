export default function MediaDescription({ media }) {
  return (
    <div className="description">
      <h1 className="h2">{media.title}</h1>
      <div className="year">{media.publish_year}</div>
      <div className="text">
        <p>{media.detail}</p>
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
