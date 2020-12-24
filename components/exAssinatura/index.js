import Button from "../button"
import React from 'react'
import UserContext from '~/contexts/UserContext'
import Style from './style'
import { createContext, useState, useContext, useEffect } from 'react'
import apiService from '~/services/api'



const ExAssinatura = () => {

  const { user } = useContext(UserContext)
  const [subscription, setSubscription] = useState()
  const [show, setShow] = useState(false)
  const [plan, setPlan] = useState()
  useEffect(_ => {
    (async _ => {
      try {

        let periodo;
        let op_plan;

        const { data: { package_id, ...data } } = await apiService().get('subscription')
        setSubscription(data)

        console.log('__subscritoo', data)
        const packdata = await apiService().get('packages')
        let pack = packdata.data
        let packages = { items: pack }
        console.log('pacotes', packages);

        if (package_id) {
          op_plan = (packages.items.find(item => item.id == package_id))
          setPlan(packages.items.find(item => item.id == package_id))

        } else {
          setPlan(packages.items.find(item => item.amount == 0))
        }

        switch (op_plan.plan_id) {
          case '1-mes':
            console.log('umm mes');
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
          let date_end = new Date(data.starts_at);
          date_end.setMonth(date_end.getMonth() + periodo)
          console.log('header data > ', date_end, new Date());
          if (date_end < new Date()) {
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

        <Button className="btn-sm" >Renovar</Button>

      </div >)}
    </Style >


  )
}


export default ExAssinatura
