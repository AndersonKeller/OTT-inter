import Button from "../button"
import React from 'react'
import UserContext from '~/contexts/UserContext'
import Style from './style'
import { createContext, useState, useContext, useEffect } from 'react'
import apiService from '~/services/api'
import Link from 'next/link'
// env
import { IS_PRODUCTION } from '~/constants/constants'
import moment from 'moment';
const ExAssinatura = () => {

  const { user } = useContext(UserContext)
  const [subscription, setSubscription] = useState()
  const [show, setShow] = useState(false)
  const [plan, setPlan] = useState()
  const requireds = IS_PRODUCTION

  useEffect(_ => {
    (async _ => {
      try {

        const { data: { package_id, ...data } } = await apiService().get('subscription')
        setSubscription(data)

        const packdata = await apiService().get('packages')
        let pack = packdata.data
        let packages = { items: pack }

        if (package_id) {
          setPlan(packages.items.find(item => item.id == package_id))

        } else {
          setPlan(packages.items.find(item => item.amount == 0))
        }


        let date_end = moment(data.ends_at)
        let hj = moment();

        if (hj > date_end) {
          setShow(true)
        } else {
          setShow(false)
        }

      } catch (error) {
        console.log(error)
      }
    })();
  }, [])


  return (

    <Style>

      {show && (<div className="renovar" >

        <span > Assinatura expirada </span>


        <div >
          <Link
            as="/user/changePlan/pay"
            href={{
              pathname: `${plan.amount == "$0" ? '/user/changePlan' : '/user/changePlan/pay'}`,
              query: {
                package_id: plan?.id,
                required: requireds
              },

            }}
          >
            {/* <Button block color="secondary" disabled={loading} >Seguir{values.package_id}</Button> */}
            <Button className="btn-sm" >Renovar </Button>
          </Link>

        </div>
      </div >)
      }
    </Style >


  )
}


export default ExAssinatura
