import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Layout from '~/components/layout/Layout'
import { PackageRadio } from '~/components/Packages'
import withAuth from '~/components/withAuth'
import { CONFIG } from '~/config'
import CardLogoHeader from '~/components/CardLogoHeader/index'
import ImageProfile from '~/pages/user/changeImage/index'

const AccountPage = ({ api, layoutProps, packages, user }) => {

  const [plan, setPlan] = useState({})
  const [subscription, setSubscription] = useState({})

  useEffect(_ => {
    (async _ => {
      try {
        const { data: { package_id, ...data } } = await api.get('subscription')
        console.log(data)
        setSubscription(data)

        if (package_id) {
          setPlan(packages.items.find(item => item.id == package_id))
        } else {
          setPlan(packages.items.find(item => item.amount == 0))
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const packageSection = function () {

    if (plan) {
      return <div
        className="col col-md-4 text-left vertical-align"
        style={ { fontSize: '16px', lineHeight: 1 } }
      >

        <PackageRadio
          readOnly
          package_id={ plan.id }
          plan={ plan }
          buttonLabel={ "Cambiar Plan" }
        />
      </div>
    } else {
      return <div></div>
    }


  }

  return (


    <Layout { ...layoutProps }>
      <CardLogoHeader>


        <Head>
          <title className="style-title">Mi Cuenta &lt; { CONFIG.appName }</title>
        </Head>
        <div className="rgpage container-fluid">
          <div className="row">
            <div className="detail ">

              <div className="row">
                <div className="profile-photo">
                  {/* <Link className="link" as="#" href="#">
                  <a className="profile-pic">
                    <Avatar
                      size="100px"
                      image={user && user.cropped_image_url ? user.cropped_image_url : null}
                    />
                  </a>
                </Link> */ }
                  {/* <a><ProfilePic image={user && user.cropped_image_url ? user.cropped_image_url : null} /></a> */ }
                  <ImageProfile
                    src={ user && user.cropped_image_url ? user.cropped_image_url : "/static/icons/user.svg" }></ImageProfile>


                  {/* </Link> */ }

                </div>
                <div className="">
                  <div className="detail-profile">
                    <h1 className="h2">Mi Cuenta</h1>
                    <div style={ {
                      color: "var(--primary)", padding: " 0px",
                      fontWeight: "bolder"
                    } }>
                      { user && user.name }
                    </div>
                  </div>
                </div>

              </div>
              <hr/>
              <div className="row">
                <div className="col-md-4">
                  <div className="data">
                    <h4>Tus datos</h4>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col col-md text-left">
                      <p className="info">{ user && user.email }</p>
                    </div>
                    <div className="col col-md text-right">
                      <Link href="changeEmail">
                        <a className="negrito">Cambiar email</a>
                      </Link>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col col-md text-left">
                      <p className="info">Contraseña: ******</p>
                    </div>
                    <div className="col col-md text-right">
                      <Link href="changePassword">
                        <a className="negrito">Cambiar la contraseña</a>
                      </Link>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col col-md text-left">
                      <p className="info">Datos Personales</p>
                    </div>
                    <div className="col col-md text-right">
                      <Link href="/user/data">
                        <a className="negrito">Cambiar datos</a>
                      </Link>
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col col-md text-left">
                      <p className="info negrito">Medio de Pago:</p>
                    </div>
                    <div className="col col-md-auto text-right">
                      {/* <Link as="#" href="#">
                    <a>Actualización de pago</a>
                  </Link> */ }
                    </div>
                  </div>
                  <div className="row">
                    <div className="col col-md text-left">
                      <p className="info">Fecha de
                        vencimiento: { subscription.ends_at && subscription.ends_at.split(' ')[0] }</p>
                    </div>
                    <div className="col col-md-auto text-right">
                      <Link href="payments">
                        <a className="negrito">Detalles de compra</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <hr/>
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
                  </div> */ }
                    {packageSection}

                    <div className="col col-md-8 text-right vertical-align">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardLogoHeader>

      <style jsx>{ `
      .detail{
        width: 100%;
        padding: 41px;

      }

      .style-title {
            padding-left: 104px;
      }
      .detail-profile{
         padding-left: 115px;
         padding-top:40px;
      }
      .profile-photo {
        padding-left: 20px;
      }

          color: #565656;
        .rgpage {
          padding-top: 40px;
          padding-bottom: 120px;
        }
        .info {
          font-size: 14px;
          font-weight: none;

        }
        a {
          display: inline-block;
          font-size: 14px;
          color: #565656;
          line-height: 1.5;
        }
        a:hover {
          color: var(--primary-hover);
          text-decoration: none;
        }

        .h2 {
          color: black;
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
          background:black;
        }

        .negrito {
              font-weight: 700;
        }
      @media(max-width:765px) {
        .detail-profile {
              justify-content: center;
               text-align: center;
        }

         .detail{
           padding:2px!important;
         }
        .text-right {
           text-align:justify !important;
          }
         .row{
           display: contents!important;
            // text-align: center!important;
         }
        .info{
           text-aling:justify!important;
         }
        .text-left {
          text-align: juntify!important;
        }
        .detail-profile{
          padding:2px;
        }
        .data {
          justify-content: center;
          display: flex;
        }

        .profile-photo {
         justify-content: center;
          display: flex;
          padding-left: 0px;

        }
     }


       }
      ` }</style>
    </Layout>
  )
}

AccountPage.getInitialProps = async ({ api, user }) => {
  let packages
  try {
    const { data } = await api.get('packages')
    packages = { items: data }
  } catch (error) {
    packages = { error }
  }
  return { packages, user }
}


export default withAuth(AccountPage)
