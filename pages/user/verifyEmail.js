// next imports
import Head from 'next/head'
import { useRouter } from 'next/router'

// react imports
import { useEffect, useState } from 'react'

// app imports
import Layout from '../components/layout/Layout'
import { CONFIG } from '../config'
import { api } from '../services/api'
import Loading from '../components/Loading/Loading'

const checkEmail = _ => {
  const router = useRouter();
  const verify = router.query.apiUrl;

  const fetchData = async _ => {
    try {
      setLoading(true)
      const {data: medias} = await api.get(search ? `/search/${search}` : '/movies')
      setMedias(medias);
      setLoading(false)
    } catch (e) {
      setError(500)
    }
  }

}

