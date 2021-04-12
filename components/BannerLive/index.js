import { useContext, useEffect, useState } from "react";
import api from '~/services/api'
import SearchContext from '~/contexts/SearchContext'
import Featured from '../featured'

import MediaLink from '../MediaLink/MediaLink'

const BannerLive = ({ children, category }) => {
  let media = (category.movies).frutas.slice(
  console.log(media.poster_url);
  let watch = true;



  // const { search, setSearch } = useContext(SearchContext);
  // const [link, setLink] = useState('https://laumas.s3.sa-east-1.amazonaws.com');
  // const [images, setImage] = useState([{ id: '1' }]);

  // useEffect(_ => {
  //   (async _ => {
  //     const res = await api().get(search ? `/search/${search}` : '/club/images')
  //     setImage(res.data);
  //   })();
  // }, [])

  return (


    <MediaLink  {...{ category, media, watch }} >
      <a>
        <Featured
          className="gradient"
          img={media.poster_url}
        />
      </a>
    </MediaLink >

  )
}


export default BannerLive


