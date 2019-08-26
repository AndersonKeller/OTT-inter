const H2 = (props) => (
  <div className={props.className}>
    <h2 className="h2">{props.children}</h2>
    <style jsx>{`
      .h2 {
        font-family: var(--sans-serif);
        font-size: 31px;
        font-weight: bold;
        line-height: 1;
        margin-top: 0;
        margin-bottom: 0;
        text-transform: uppercase;
      }
    `}</style>
  </div>
)
export default H2
