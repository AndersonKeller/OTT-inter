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

  signIn = (user) => {
    localStorage.setItem('user', user)
    this.setState(
      {
        user: user
      },
      // _ => {
      //   Router.push('/', '#logged')
      // }
    )
  }

  signOut = () => {
    localStorage.removeItem('user')
    this.setState({
      user: null
    })
    // Router.push('/signin')
    // location.href = location.protocol + '//' + location.host + location.pathname
  }

  render() {
    const { Component, pageProps } = this.props

    return <UserContext.Provider value={{ user: this.state.user, signIn: this.signIn, signOut: this.signOut }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  }
}

export default MyApp
