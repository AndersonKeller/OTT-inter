import { createContext, useState } from 'react'

export const AuthModalContext = createContext()

export function AuthModalProvider({ children }) {

  const allowedTabs = ['login', 'password', 'register']
  const [ show, setShow ] = useState(false)
  const [ tab, setTab ] = useState('login')
  const [ initialTab, setInitialTab ] = useState(tab)

  function closeAuthModal() {
    setShow(false)
  }

  function openAuthModal(wishedTab = 'login') {
    if ( ! allowedTabs.includes(wishedTab)) {
      throw 'unknown tab'
    }
    setInitialTab(wishedTab)
    if (tab !== wishedTab) {
      setTab(wishedTab)
    }
    setShow(true)
  }

  return (
    <AuthModalContext.Provider value={{...{closeAuthModal, initialTab, openAuthModal, setTab, show, tab }}}>
      {children}
    </AuthModalContext.Provider>
  )
}
