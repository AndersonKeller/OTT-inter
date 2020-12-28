import Button from "../button"
import React from 'react'
import UserContext from '~/contexts/UserContext'
import Style from './style'
import { createContext, useState, useContext, useEffect } from 'react'
import apiService from '~/services/api'
import Link from 'next/link'
// env
import { IS_PRODUCTION } from '~/constants/constants'

const ExAssinatura = () => {

  const { user } = useContext(UserContext)
  const [subscription, setSubscription] = useState()
  const [show, setShow] = useState(false)
  const [plan, setPlan] = useState()
  const requireds = IS_PRODUCTION
  useEffect(_ => {
    (async _ => {
      try {

        let periodo;
        let op_plan;

        const { data: { package_id, ...data } } = await apiService().get('subscription')
        setSubscription(data)

        const packdata = await apiService().get('packages')
        let pack = packdata.data
        let packages = { items: pack }

        if (package_id) {
          op_plan = (packages.items.find(item => item.id == package_id))
          setPlan(packages.items.find(item => item.id == package_id))

        } else {
          setPlan(packages.items.find(item => item.amount == 0))
        }

        switch (op_plan.plan_id) {
          case '1-mes':
            periodo = 1;
            break;
          case '3-mes':
            periodo = 3;
            break;

          case '6-mes':
            periodo = 6
            break;

          case '1-ano':
            periodo = 6
            break;

          case '1-ano2':
            periodo = 6
            break;
        }


        if (periodo) {

          let date_end = new Date(data.starts_at)
          date_end.setMonth(date_end.getMonth() + periodo);

          let hj = new Date();

          if ((date_end.getUTCFullYear()) > (hj.getUTCFullYear())) {
            setShow(false)
          } else if ((date_end.getUTCMonth() + 1) > (hj.getUTCMonth() + 1) && date_end.getUTCFullYear() == hj.getUTCFullYear()) {
            setShow(false)
          } else if (date_end.getDate() > hj.getDate() && (date_end.getUTCMonth() + 1) == (hj.getUTCMonth() + 1) && date_end.getUTCFullYear() == hj.getUTCFullYear()) {
            setShow(false)
          } else {
            setShow(true)
          }
        }

      } catch (error) {
        console.log('error')
        console.log(error)
      }
    })();
  }, [])

  return (

    <Style>

      {show && (<div>

        <span > Assinatura expirada </span>


        <div className="col-md-2">
          <Link
            as="/user/changePlan/pay"
            href={{
              pathname: "/user/changePlan/pay",
              query: {
                package_id: plan.id,
                required: requireds
              },

            }}
          >
            {/* <Button block color="secondary" disabled={loading} >Seguir{values.package_id}</Button> */}
            <Button className="btn-sm" >Renovar </Button>
          </Link>

        </div>
      </div >)}
    </Style >


  )
}


export default ExAssinatura
