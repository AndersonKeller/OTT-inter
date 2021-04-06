const planFeatured = ({children,plan}) => {

  return (
    <div className="form-group">
      {children}
      <style jsx>{`
      p{
        margin:0px!important;
        padding:0px!important;
      }

     ${plan.is_featured?'background:;':''}
      `}</style>
    </div>
  )
}


export default planFeatured
