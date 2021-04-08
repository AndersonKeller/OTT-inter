import React from 'react'



const Description = ({...props}) =>(
  <div className="form-group">

    <div dangerouslySetInnerHTML={{ __html:props.desc }}/>

     <style jsx>{`

    overflow-wrap: anywhere;

  ${props.is_featured==1?'color:white;background:#481f57':''}
    // background-color:${props.is_featured==1?'':'white'};
      ` }</style>
  </div>

)


export default Description


