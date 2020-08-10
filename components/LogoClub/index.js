import react, { useState, useContext, useEffect } from "react";
import api from '~/services/api'
import SearchContext from '~/contexts/SearchContext'


function LogoApp() {
  const { search, setSearch } = useContext(SearchContext);
  const [link, setLink] = useState('https://laumas.s3.sa-east-1.amazonaws.com');
  const [images, setImage] = useState([{ id: '1' }]);

  useEffect(async () => {
    const res = await api().get(search ? `/search/${search}` : '/club/images')
    setImage(res.data);
  }, [])
  return (

    <>
      <img className="img-fluid" src={` ${link}/images/club${images.image_logo}`} />

      <style jsx>{`
         img {
         display: inline - block;
        }
        .logo {
          align-items: center;
          display: flex;
          justify-content: center;
          margin-top: -5px;
          margin-bottom: -5px;
        }
        .logo a {
          display: inline-flex;
          padding: 5px;
        }

      `}</style>

    </>

  )
}
export default LogoApp;
