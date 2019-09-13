import React from 'react'
import App from 'next/app'
import Router from 'next/router'
import UserContext from '../components/UserContext'

class MyApp extends App {
  
  state = {
    user: null
  }

  componentDidMount = () => {
    const user = localStorage.getItem('user')
    if (user) {
      this.setState({
        user
      })
    } else {
      // Router.push('/')
    }
  }

  signIn = (username) => {
    localStorage.setItem('user', username)

    this.setState(
      {
        user: username
      },
      () => {
        Router.push('/')
      }
    )
  }

  signOut = () => {
    localStorage.removeItem('user')
    this.setState({
      user: null
    })
    // Router.push('/signin')
    Router.push('/')
  }
  
  render() {
    const { Component, pageProps } = this.props

    return <UserContext.Provider value={{ user: this.state.user, signIn: this.signIn, signOut: this.signOut }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  }
}

export default MyApp
