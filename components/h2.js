const H2 = (props) => (
  <>
    <h2 className={'h2' + (props.className ? ' ' + props.className : '')}>
      {props.children}
    </h2>
    <style jsx>{`
      .h2 {
        --font-size: 31px;
        font-family: var(--sans-serif);
        font-size: var(--font-size);
        font-weight: bold;
        line-height: 1;
        margin-top: 0;
        margin-bottom: 0;
      }
      @media (min-width: 768px) {
        .h2 {
          --font-size: 22px;
        }
      }
      @media (min-width: 992px) {
        .h2 {
          --font-size: 31px;
        }
      }
    `}</style>
  </>
)
export default H2
