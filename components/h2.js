const H2 = (props) => (
  <>
    <h2 className={'h2' + (props.className ? ' ' + props.className : '')}>
      {props.children}
    </h2>
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
  </>
)
export default H2
