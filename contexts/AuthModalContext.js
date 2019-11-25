import { useRouter } from 'next/router'
import { createContext, useState } from 'react'

export const AuthModalContext = createContext()

export function AuthModalProvider({ children }) {

  const allowedTabs = ['login', 'password', 'register']
  const router = useRouter()
  const { modal } = router.query
  const shouldAutoOpen = allowedTabs.includes(modal)
  const [ show, setShow ] = useState(shouldAutoOpen ? true : false)
  const [ tab, setTab ] = useState(shouldAutoOpen ? modal : 'login')
  const [ tabsHistory, setTabHistory ] = useState([])

  function backTab() {
    if (tabsHistory.length <= 1) {
      throw "can't back tab 'cause there are no more tabs on history"
    }
    const newTab = tabsHistory[tabsHistory.length - 2]
    setTab(newTab)
    const newTabHistory = tabsHistory.slice(0, -1)
    setTabHistory(newTabHistory)
    return true
  }

  function changeTab(tabName) {
    validateTab(tabName)
    setTab(tabName)
    const newTabHistory = [...tabsHistory, tabName]
    setTabHistory(newTabHistory)
    return true
  }

  function closeAuthModal() {
    setShow(false)
    return true
  }

  function openAuthModal(wishedTab = 'login') {
    validateTab(wishedTab)
    if (tab !== wishedTab) {
      setTab(wishedTab)
    }
    const newTabHistory = [wishedTab]
    setTabHistory(newTabHistory)
    setShow(true)
    return true
  }

  function validateTab(tabName) {
    if ( ! allowedTabs.includes(tabName)) {
      throw 'unknown tab'
    }
    return true
  }

  return (
    <AuthModalContext.Provider value={{...{backTab, closeAuthModal, openAuthModal, changeTab, show, tab, tabsHistory }}}>
      {children}
    </AuthModalContext.Provider>
  )
}
