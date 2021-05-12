import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import { ironSession, Session } from 'next-iron-session'

export interface NextApiExtendedRequest extends NextApiRequest {
  session: Session
}

export const IRON_CONFIG_OPTIONS = {
  cookieName: 'chat-system',
  password: process.env.SECRET_COOKIE_PASSWORD,
  // if your localhost is served on http:// then disable the secure flag
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

const handler = nc<NextApiExtendedRequest, NextApiResponse>({
  onError(error, _req, res) {
    res
      .status(501)
      .json({ error: `Sorry Something Happened! ${error.message}` })
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  },
})

handler.use(ironSession(IRON_CONFIG_OPTIONS))

export default handler
