import Button from '../components/button'
import { useEffect, useState } from 'react'
import api from '../services/api'

const WishlistBtn = ({ block, color, inside, movieId, home }) => {

  const InsideBtn = ({ icon, size, onClick }) => {

    return (
      <>
        <button className={`btn inside-btn`} onClick={onClick}>
          <img className={`aling`} height={size} src={icon} width={size} />
          <span>Minha Lista</span>
        </button>

        <style jsx>{`
          .inside-btn {
            z-index: 3;
            width: 75px;
            padding: 2px 5px;
            display: flex;
            margin: 15px 2px 3px 7px;
            color: white;
            background-color: #992132;
          }
          span {
            margin-left: 6px;
            font-size: 8px;
            font-weight: bold;
          }
          .inside-btn:hover {
            background-color: lightgray;
          }
          .aling {
             margin: 1px 1px 2px 2px;
          }
        `}</style>
      </>
    )
  }

  const [wishlisted, setWishlisted] = useState(false)

  const handleToggle = async e => {
    e.preventDefault()
    try {
      const response = await api().post('/wishlist', { id: movieId })
      const { attached, detached } = response.data
      const inList = attached.includes(movieId) && !detached.includes(movieId)
      setWishlisted(inList)
    } catch (error) {
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

  useEffect(_ => { wishlist() }, [])

  return (
    wishlisted ?
      inside ?
        <InsideBtn padding="5" icon="/static/icons/remove.svg" size="8" onClick={handleToggle} />
        :
        <Button block={block} home={home} onClick={handleToggle}>
          <img height="13" src="/static/icons/remove.svg" width="13" padding="5" />
          <span>Minha Lista</span>
        </Button>
      :
      inside ?
        <InsideBtn icon="/static/icons/add.svg" size="8" padding="5" onClick={handleToggle} />
        :
        <Button block={block} home={home} color="secondary" outline textColor={color} onClick={handleToggle}>
          <img height="13" padding="5" src="/static/icons/add.svg" width="13" />
          <span>Minha Lista</span>
        </Button>
  )
}

export default WishlistBtn
