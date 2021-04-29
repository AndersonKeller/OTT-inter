
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../contexts/UserContext'
import withApi from '~/components/withApi'
import { TENANT } from "~/constants/constants";
import HomePage from '~/pages/Home'
import {SubscriptorPage} from './subscriptor'
import api from '../services/api'

const IndexPage= ({  contents, featuredMedia, featuredMediaError,layoutProps} ) =>{
const { user } = useContext(UserContext)
const [sub ,setSub] = useState()
const [loading ,setLoading] = useState(false)

  useEffect(_ => {

    if(user){

         api().get(`subscription-last/${user.id}`).then((res) => {
          if(res){
          setSub(res.data)
          setLoading(true);
          }

         }).catch((e) => {
             console.log(e)
          });
    }else{
       setLoading(true);
    }

  },[user])


  return (

    loading==true &&(
        user && TENANT=='lau'?(
          <HomePage layoutProps={layoutProps}  api ={api} contents={contents} featuredMedia={featuredMedia} featuredMediaError={featuredMediaError}/>
        ): TENANT=='lau' ?(
          <HomePage layoutProps={layoutProps}  api ={api} contents={contents} featuredMedia={featuredMedia} featuredMediaError={featuredMediaError}/>
        ):sub && TENANT=='america' && sub.is_active==1 && sub.package_id !=1?(
          <HomePage layoutProps={layoutProps}  api ={api} contents={contents} featuredMedia={featuredMedia} featuredMediaError={featuredMediaError}/>
        ):(
          <SubscriptorPage/>
        )
      )

  )
}

IndexPage.getInitialProps = async ctx => {
  // const { api } = ctx
  const { data: homePage } = await api().get('pages/home');

  try {
    const [firstContent, ...contents] = homePage.contents
    const { data: { movie: featuredMedia } } = await api().get('movie/' + firstContent.slug + '?for=home-cover')

    // typeof window !== 'undefined'
    //   ? Router.push('/signup')
    //   : ctx.res.writeHead(302, { Location: '/signup' }).end()

    return { contents, featuredMedia }
  } catch (error) {
    const [...contents] = homePage.contents;
    return { contents, featuredMediaError: error };
  }

}

export default withApi(IndexPage)
