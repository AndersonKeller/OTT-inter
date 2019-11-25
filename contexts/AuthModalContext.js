import { createContext, useState } from 'react'

export const AuthModalContext = createContext()

export function AuthModalProvider({ children }) {

  const [show, setShow] = useState(false)

  function closeAuthModal(e) {
    e.preventDefault()
    setShow(false)
  }

  function onHide() {
    setShow(false)
  }

  function openAuthModal(e) {
    e.preventDefault()
    setShow(true)
  }

  return (
    <AuthModalContext.Provider value={{...{closeAuthModal, onHide, openAuthModal, show}}}>
      {children}
    </AuthModalContext.Provider>
  )
}
