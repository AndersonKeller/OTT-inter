import Button from '../components/button'
import { useEffect, useState } from 'react'
import api from '../services/api'

const WishlistBtn = ({ movieId, color, inside }) => {

  const InsideBtn = ({ icon, size, onClick }) => {

    return (
      <>
        <button className={`btn inside-btn`} onClick={onClick}>
          <img height={size} src={icon} width={size} />
          <span>Mi Lista</span>
        </button>

        <style jsx>{`

          .inside-btn {
            z-index: 3;
            width: 65px;
            padding: 2px 5px;
            margin:0px;
            display: flex;
            margin: 5px;
            color: black;
            background-color: white;
          }
          span {
            margin-left: 6px;
            font-size: 8px;
            font-weight: bold;
          }
          .inside-btn:hover {
            background-color: lightgray;
          }
        `}</style>
      </>
    )
  }

  const [wishlisted, setWishlisted] = useState(false)

  const handleToggle = async e => {
    e.preventDefault()
    try{
      const response = await api().post('/wishlist',{id : movieId})
      const {attached, detached } = response.data
      const inList = attached.includes(movieId) && ! detached.includes(movieId)
      setWishlisted(inList)
    }catch(error){
      console.log(error)
    }
  }

  const wishlist = async _ => {
    try {
      const res = await api().get(`/wishlist/${movieId}`)
      setWishlisted(Object.keys(res.data).length > 0)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect( _ => { wishlist() }, [])

  return (
    wishlisted ?
      inside ?
        <InsideBtn icon="/static/icons/remove.svg" size="10" onClick={handleToggle} />
      :
        <Button onClick={handleToggle}>
          <img height="13" src="/static/icons/remove.svg" width="13" />
          <span>Mi Lista</span>
        </Button>
    :
      inside ?
        <InsideBtn icon="/static/icons/add.svg" size="10"  onClick={handleToggle} />
      :
        <Button color="secondary" outline textColor={color} onClick={handleToggle}>
          <img height="13" src="/static/icons/add.svg" width="13" />
          <span>Mi Lista</span>
        </Button>
  )
}

export default WishlistBtn
