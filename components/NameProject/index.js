// import { useContext, useEffect, useState } from "react";
// import SearchContext from '~/contexts/SearchContext'
import { CONFIG } from '~/config'

// function LogoApp() {
//   const { search, setSearch } = useContext(SearchContext);
//   const [link, setLink] = useState('https://laumas.s3.sa-east-1.amazonaws.com');
//   const [images, setImage] = useState([{ id: '1' }]);


// }
function NameProject() {
  if (CONFIG.projectName) {
    return <div style={{ display: 'inline-block' }}>
      <strong className="text-primary">{CONFIG.projectName.split(' ')[0]} {CONFIG.projectName.split(' ')[1]} </strong>{CONFIG.projectName.split(' ')[2]}   </div>
  } else if (CONFIG.appName) {
    return <div style={{ display: 'inline-block' }}>
      <strong className="text-primary">{CONFIG.appName.split(' ')[0]} {CONFIG.appName.split(' ')[1]} </strong>{CONFIG.appName.split(' ')[2]}   </div>
  }
  return <div style={{ display: 'inline-block' }}>
    <strong className="text-primary">Project</strong>Name!
    </div>
}


export default NameProject;
