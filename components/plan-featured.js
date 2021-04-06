const planFeatured = ({children,plan}) => {
  console.log(plan,'rrrir');

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
