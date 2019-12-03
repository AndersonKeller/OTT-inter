import Button from '../components/button'
import { useEffect, useState } from 'react'
import api from '../services/api'

const WishlistBtn = ({ movieId, color, inside }) => {

  const [wishlisted, setWishlisted] = useState(false)

  const handleToggle = async e => {
    e.preventDefault()
    try{
      const response = await api.post('/wishlist',{id : movieId})
      const {attached, detached } = response.data
      const inList = attached.includes(movieId) && ! detached.includes(movieId)
      setWishlisted(inList)
    }catch(error){
      console.log(error)
    }
  }

  // const style = _ => {
  //   // const attributes = {}
  //   return inside === true ?
  //       { padding: '5px 10px',
  //         borderRadius: '.25rem',
  //         position: 'absolute',
  //         zIndex: '10'
  //       }
  //     :
  //       {}
  // }

  const wishlist = async _ => {
    try {
      const res = await api.get(`/wishlist/${movieId}`)
      setWishlisted(Object.keys(res.data).length > 0)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect( _ => { wishlist() }, [])

  return (
    // <div style={{backgroundColor: 'red !important'}}>
    //   {

      wishlisted ?
        <Button  onClick={handleToggle}>
          <img height="13" src="/static/icons/remove.svg" width="13" />
          <span>Mi Lista</span>
        </Button>
      :
        <Button color="secondary" outline textColor={color} onClick={handleToggle}>
          <img height="13" src="/static/icons/add.svg" width="13" />
          <span>Mi Lista</span>
        </Button>

    //     }

    //     <style jsx>{`
    //       .btn-small {
    //         line-height: 1 !important;
    //         padding-top: 0;
    //         padding-bottom: 0;
    //       }
    //     `}</style>
    // </div>
  )
}

export default WishlistBtn
