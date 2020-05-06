import Head   from 'next/head'
import Link   from 'next/link'
import { useEffect, useState } from 'react'
import Layout           from '~/components/layout/Layout'
import { PackageRadio } from '~/components/Packages'
import withAuth         from '~/components/withAuth'
import { CONFIG }       from '~/config'

const AccountPage = ({ api, layoutProps, packages, user }) => {

  const [ plan, setPlan ] = useState({})
  const [ subscription, setSubscription ] = useState({})

  useEffect(_ => {
    (async _ => {
      try{
        const { data: {package_id, ...data} } = await api.get('subscription')
        console.log(data)
        setSubscription(data)

        if(package_id){
          setPlan(packages.items.find(item => item.id == package_id))
        }else{
          setPlan(packages.items.find(item => item.amount == 0))
        }
      }catch(error){
        console.log(error)
      }
    })()
  }, [])

  return (
    <Layout {...layoutProps}>
      <Head>
        <title>Mi Cuenta &lt; {CONFIG.appName}</title>
      </Head>
      <div className="rgpage container-fluid">
        <div className="row">
          <div className="col-xl-8 offset-xl-2">
            <h1 className="h2">Mi Cuenta</h1>
            <div className="row">
              <div className="col-md-4">
                {/* <Link className="link" as="#" href="#">
                  <a className="profile-pic">
                    <Avatar
                      size="100px"
                      image={user && user.cropped_image_url ? user.cropped_image_url : null}
                    />
                  </a>
                </Link> */}
                {/* <Link href="changePhoto">  */}
                  <a><ProfilePic image={user && user.cropped_image_url ? user.cropped_image_url : null} /></a>
                {/* </Link> */}
              </div>
              <div className="col-md-8 vertical-align">
                {user && user.name}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-4">
                <div className="data">
                  <h4>Tus datos</h4>
                </div>
              </div>
              <div className="col-md-8">
                <div className="row">
                  <div className="col col-md text-left">
                  <p className="info">{user && user.email }</p>
                  </div>
                  <div className="col col-md text-right">
                  <Link href="changeEmail">
                    <a>Cambiar email</a>
                  </Link>
                  </div>
                </div>
                <div className="row">
                  <div className="col col-md text-left">
                    <p className="info">Contraseña: ******</p>
                  </div>
                  <div className="col col-md text-right">
                    <Link href="changePassword">
                      <a>Cambiar la contraseña</a>
                    </Link>
                  </div>
                </div>
                <div className="row">
                  <div className="col col-md text-left">
                    <p className="info">Datos Personales</p>
                  </div>
                  <div className="col col-md text-right">
                    <Link href="/user/data">
                      <a>Cambiar datos</a>
                    </Link>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col col-md text-left">
                  <p className="info">Medio de Pago:</p>
                  </div>
                  <div className="col col-md-auto text-right">
                  {/* <Link as="#" href="#">
                    <a>Actualización de pago</a>
                  </Link> */}
                  </div>
                </div>
                <div className="row">
                  <div className="col col-md text-left">
                <p className="info">Fecha de vencimiento: { subscription.ends_at && subscription.ends_at.split(' ')[0]}</p>
                  </div>
                  <div className="col col-md-auto text-right">
                  <Link href="payments">
                    <a>Detalles de compra</a>
                  </Link>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-4">
                <div className="data">
                  <h4>Detalles del Plan</h4>
                </div>
              </div>
              <div className="col-md-8">
                <div className="row">
                  {/* <div className="col col-md-9 text-left">
                    <Packages
                      {...{
                        items: [{id: 2, name:'3 meses', amount: 99, currency: 'ars'}],
                        package_id: 2,
                      }}
                    />
                  </div>
                  <div className="col col-md-3 text-right">
                    Cambiar plan
                  </div> */}
                  <div
                    className="col col-md-4 text-left vertical-align"
                    style={{fontSize: '16px', lineHeight: 1}}>

                    <PackageRadio
                      readOnly
                      package_id={plan.id}
                      plan={plan}
                    />
                  </div>
                  <div className="col col-md-8 text-right vertical-align">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .rgpage {
          padding-top: 40px;
          padding-bottom: 120px;
        }
        .info {
          font-size: 17px;
          font-weight: none;
        }
        a {
          display: inline-block;
          font-size: 17px;
          color: var(--gray);
          line-height: 1.5;
        }
        a:hover {
          color: var(--primary-hover);
          text-decoration: none;
        }
        .vertical-align {
          align-self: center;
        }
        .h2 {
          margin-bottom: 10px;
        }
        :global(.h3) {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        hr {
          margin-top: 25px;
          margin-bottom: 15px;
          background-color: white;
        }
      `}</style>
    </Layout>
  )
}

AccountPage.getInitialProps = async ({ api, user }) => {
  let packages
  try {
    const { data } = await api.get('packages')
    packages = { items: data }
  } catch(error) {
    packages = { error }
  }
  return { packages, user }
}

const ProfilePic = ({ image: src = "/static/icons/user.svg" }) => {
  return (
    <>
      <div className="avatar">
        <img alt="Avatar" className="img-fluid" src={src} />
        {/* <div className="overlay"><p className="title">Cambiar foto</p></div> */}
      </div>
      <style jsx>{`
      .avatar {
        position: relative;
        display: block;
        height: 120px;
        width: 120px;
        margin-top: 15px;
      }
      .avatar img {
        height: 120px;
        width:120px;
      }
      .title {
        color: var(--gray);
        font-size: 12px;
        align-self:center;
      }
      .title:hover {
        color: var(--primary-hover);
        /* text-decoration: underline; */
      }
      .overlay {
        height: 40%;
        width: 100%;
        background: rgba(0,0,0,.8);
        position: absolute;
        display: none;
        top: 60%;
        left: 0;
        justify-content: center;
      }
      .img-fluid {
        border-radius: 50%;
      }
      .avatar:hover .overlay {
        display: flex;
      }
    `}</style>
    </>
  )
}

export default withAuth(AccountPage)
