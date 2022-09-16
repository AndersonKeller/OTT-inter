import { useContext, useEffect, useState } from "react";
import api from '~/services/api'
import SearchContext from '~/contexts/SearchContext'
import { TENANT } from "~/constants/constants";



function LogoApp() {
  const { search, setSearch } = useContext(SearchContext);
  const [link, setLink] = useState('https://laumas.s3.sa-east-1.amazonaws.com');
  const [images, setImage] = useState([{ id: '1' }]);

  useEffect(_ => {
    // (async _ => {
    //   const res = await api().get(search ? `/search/${ search }` : '/club/images')
    //   setImage(res.data);
    // })();
  }, [])
  
  return (

    <>
      {/* <img className="img-fluid" src={ ` ${ link }/images/club${ images.image_projeto }` }/>
       */}
      <img className="img-fluid" src={'/static/' +  TENANT + '/logos/logo-app.png'}/>

      <style jsx>{ `
        img {
          display: inline-block;
        }
      ` }</style>

    </>

  )
}

export default LogoApp;
