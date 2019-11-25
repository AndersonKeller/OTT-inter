import { createContext, useState } from 'react'

export const AuthModalContext = createContext()

export function AuthModalProvider({ children }) {

  const [ show, setShow ] = useState(false)
  const [ tab, setTab ] = useState('login')

  function closeAuthModal(e) {
    e.preventDefault()
    setShow(false)
  }

  function onHide() {
    setShow(false)
  }

  function openAuthModal(wishedTab = 'login') {
    if (tab !== wishedTab) {
      setTab(wishedTab)
    }
    setShow(true)
  }

  return (
    <AuthModalContext.Provider value={{...{closeAuthModal, onHide, openAuthModal, setTab, show, tab }}}>
      {children}
    </AuthModalContext.Provider>
  )
}
