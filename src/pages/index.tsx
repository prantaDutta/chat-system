import { Message } from '@prisma/client'
import axios from 'axios'
import { withIronSession } from 'next-iron-session'
import React, { useRef, useState } from 'react'
import useSWR from 'swr'
import InputTextField from '../components/InputTextField'
import Layout from '../components/Layout'
import ShowMessage from '../components/ShowMessage'
import { IRON_CONFIG_OPTIONS } from '../util/handler'
import { ModifiedUser } from '../util/types'

interface HomeProps {
  user: ModifiedUser
}

const Home: React.FC<HomeProps> = ({ user }) => {
  const [msg, setMsg] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { data, error, mutate } = useSWR('/api/get-msg')
  const handleKeyboardEvent = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      setSubmitting(true)
      setMsg('')
      await axios.post('api/send-msg', {
        id: user.id,
        msg,
      })
      await mutate()
      setSubmitting(false)
      dummy && dummy.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  const dummy: any = useRef()
  return (
    <Layout user={user}>
      <div className="my-5">
        <h4 className="font-semibold text-lg">Chat Room</h4>
        <div className="my-5 bg-gray-300 w-full px-6 py-4 rounded-lg h-72 flex flex-col overflow-auto">
          {error && (
            <p className="px-4 py-2 w-full font-bold text-xl">
              {error.message}
            </p>
          )}
          {data &&
            data.messages.length > 0 &&
            data.messages.map((msg: Message) => {
              return (
                <ShowMessage authorId={user.id} msg={msg} mutate={mutate} />
              )
            })}
          <div ref={dummy}></div>
        </div>
        <div className="my-5">
          <InputTextField
            label="Enter Message"
            disabled={submitting}
            value={msg}
            placeholder="Enter Your Message & Press Enter to Send"
            className="p-2 w-full font-semibold my-2 border-2 border-cyan-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-600"
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={handleKeyboardEvent}
          />
        </div>
      </div>
    </Layout>
  )
}

export default Home

export const getServerSideProps = withIronSession(async ({ req }) => {
  const user = req.session.get('user')

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      user,
    },
  }
}, IRON_CONFIG_OPTIONS)
