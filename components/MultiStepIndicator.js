const MultiStepIndicator = ({ index, onClick }) => {
  return (
    <nav style={ { display: "none" } }>
      <ol className="cd-breadcrumb triangle">
        <li onClick={ () => onClick(0) } className={ index === 0 ? "current" : "" }><a href="javascript:;">Seus
          dados</a></li>
        <li onClick={ () => onClick(1) } className={ index === 1 ? "current" : "" }><a href="javascript:;">Planos</a>
        </li>
        <li onClick={ () => onClick(2) } className={ index === 2 ? "current" : "" }><a href="javascript:;">Pagamento</a>
        </li>
        {/*<li className="current"><em>Project</em></li>*/ }
      </ol>
    </nav>
  )
}


export default MultiStepIndicator
