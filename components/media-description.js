export default function MediaDescription({ media }) {
  return (
    <div className="description">
      <h1 className="h2">{media.title}</h1>
      <div className="year">{media.publish_year}</div>
      <div className="text">
        <p>{media.detail}</p>
      </div>
      <style jsx>{`
        .description {
          font-size: 13px;
          line-height: normal;
        }
        .h2,
        .year {
          margin-bottom: 10px;
        }
        .text {
          margin-bottom: 20px;
        }
        @media (min-width: 768px) {
          .description {
            font-size: 16px;
            line-height: 1.5;
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
