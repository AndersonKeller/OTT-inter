
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../contexts/UserContext'
import withApi from '~/components/withApi'
import { TENANT } from "~/constants/constants";
import HomePage from '~/pages/Home'
import {SubscriptorPage} from './subscriptor'
import api from '../services/api'

const IndexPage= ({  contents, featuredMedia, featuredMediaError,layoutProps} ) =>{
const { user } = useContext(UserContext)

  if(user && TENANT=='lau'){
     return  <HomePage layoutProps={layoutProps}  api ={api} contents={contents} featuredMedia={featuredMedia} featuredMediaError={featuredMediaError}/>
 }
    else{
     if(TENANT=='lau'){return <HomePage layoutProps={layoutProps}  api ={api} contents={contents} featuredMedia={featuredMedia} featuredMediaError={featuredMediaError}/>}
     return    <SubscriptorPage/>
    }


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
