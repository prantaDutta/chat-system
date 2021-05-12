import axios from 'axios'
import { withIronSession } from 'next-iron-session'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import InputTextField from '../components/InputTextField'
import Layout from '../components/Layout'
import SubmitButton from '../components/SubmitButton'
import { authenticatedData } from '../states/authState'
import { IRON_CONFIG_OPTIONS } from '../util/handler'

interface loginProps {}

const login: React.FC<loginProps> = ({}) => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [, setAuthData] = useRecoilState(authenticatedData)

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.post('/api/login', {
        email,
        password,
      })
      console.log(data)
      setAuthData(data.user)
      return router.push('/')
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Layout>
      <form onSubmit={submitHandler}>
        <InputTextField
          label="Email"
          name="email"
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputTextField
          label="Password"
          name="password"
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton title="login" />
      </form>
    </Layout>
  )
}

export default login

export const getServerSideProps = withIronSession(async ({ req }) => {
  const user = req.session.get('user')

  if (user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}, IRON_CONFIG_OPTIONS)
