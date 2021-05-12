import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { authenticatedData } from '../states/authState'
import { ModifiedUser } from '../util/types'
import NavBar from './NavBar'

interface LayoutProps {
  user?: ModifiedUser
}

const Layout: React.FC<LayoutProps> = ({ children, user }) => {
  const [authData, setAuthData] = useRecoilState(authenticatedData)
  useEffect(() => {
    if (user) {
      setAuthData(user)
    } else {
      setAuthData(null)
    }
  }, [authData])
  return (
    <div className="container max-w-xl mx-auto my-24">
      <NavBar />
      {children}
    </div>
  )
}

export default Layout
