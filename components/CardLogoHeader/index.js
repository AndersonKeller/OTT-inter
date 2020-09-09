import { useContext, useEffect, useState } from "react";
import api from '~/services/api'
import SearchContext from '~/contexts/SearchContext'
import { TENANT } from '~/constants/constants'
import LogoApp from '../LogoApp'
import { StyleCard } from '../CardLogoHeader/style'

const CardLogoHeader = ({ children }) => {

  const { search, setSearch } = useContext(SearchContext);
  const [link, setLink] = useState('https://laumas.s3.sa-east-1.amazonaws.com');
  const [images, setImage] = useState([{ id: '1' }]);

  useEffect(_ => {
    (async _ => {
      const res = await api().get(search ? `/search/${search}` : '/club/images')
      setImage(res.data);
    })();
  }, [])

  return (


    <StyleCard>
      <div
        className="card-wrapper d-flex align-items-center justify-content-center h-100 responsive"
        style={{
          backgroundImage: `url('/static/${TENANT}/subs/background.jpg')`,
        }}
      >
        <div className="card">
          <div className={"card-header text-center"} style={{
            backgroundColor: "#242627",
            padding: "25px 15px",
            border: "none",
            borderRadius: "0",
            justifyContent: "center",
            display: "flex",

          }}>
            <div className="img-logoApp-card img"> <LogoApp /></div>
          </div>
          <div className="card-body">

            {children}

          </div>
        </div>


      </div>
      <div>
      </div>
    </StyleCard>

  )
}


export default CardLogoHeader


