import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { authenticatedData } from '../states/authState'

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [authData, setAuthData] = useRecoilState(authenticatedData)

  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  return (
    <div className="flex justify-between">
      <h1 className="font-bold text-3xl">Chat System</h1>
      <div className="flex">
        {authData ? (
          <>
            <button className="btn">Welcome, {authData.name}</button>
            <button
              className="btn"
              onClick={async () => {
                setSubmitting(true)
                await axios.post('/api/logout')
                setAuthData(null)
                setSubmitting(false)
                await router.push('/login')
              }}
              disabled={submitting}
            >
              {submitting ? 'Loading ...' : 'Logout'}
            </button>
          </>
        ) : (
          <>
            <button className="btn">
              <Link href="/login">Login</Link>
            </button>
            <button className="btn">
              <Link href="/signup">Signup</Link>
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default NavBar
