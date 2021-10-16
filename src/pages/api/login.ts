import { compareSync } from 'bcrypt'
import prisma from '../../lib/prisma'
import handler from '../../util/handler'

export default handler().post(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(500).json({
      error: 'Please Provide email and password',
    })
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return res.status(422).json({
        error: 'Email Not Found',
      })
    }

    if (compareSync(password, user.password)) {
      delete user.password

      req.session.set('user', user)
      await req.session.save()

      return res.status(200).json({
        user,
      })
    }

    return res.status(422).json({
      error: "Passwords didn't match",
    })
  } catch (e) {
    return res.status(422).json({
      error: e.message,
    })
  }
})
