import { useRouter } from 'next/router'
import { createContext, useState, useEffect, useContext } from 'react'
import UserContext from '~/contexts/UserContext'

export const AuthModalContext = createContext()

export function AuthModalProvider({ children }) {

  const allowedTabs = ['login', 'password', 'register']
  const router = useRouter()
  const { modal, code, socialProvider } = router.query
  const shouldAutoOpen = allowedTabs.includes(modal)
  const [ show, setShow ] = useState(shouldAutoOpen ? true : false)
  const [ tab, setTab ] = useState(shouldAutoOpen ? modal : 'login')
  const [ tabsHistory, setTabHistory ] = useState([])
  const [ packageId, setPackageId ] = useState()
  const { shouldAutoLogin } = useContext(UserContext)

  useEffect(() => { if(shouldAutoLogin) openAutoLogin() }, [])

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

  function openAuthModal(wishedTab = 'login', packageId = null) {
    validateTab(wishedTab)
    if (tab !== wishedTab) {
      setTab(wishedTab)
    }
    const newTabHistory = [wishedTab]
    setTabHistory(newTabHistory)
    setPackageId(packageId)
    setShow(true)
    return true
  }

  function validateTab(tabName) {
    if ( ! allowedTabs.includes(tabName)) {
      throw 'unknown tab'
    }
    return true
  }

  const openAutoLogin = () => {
    openAuthModal()
    setTimeout(() => setShow(false), 2000)
  } 

  return (
    <AuthModalContext.Provider value={{...{
      backTab,
      changeTab,
      closeAuthModal,
      openAuthModal,
      packageId,
      show,
      tab,
      tabsHistory,
      code,
      socialProvider
    }}}>
      {children}
    </AuthModalContext.Provider>
  )
}
