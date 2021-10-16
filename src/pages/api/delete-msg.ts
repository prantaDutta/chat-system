import prisma from '../../lib/prisma'
import handler from '../../util/handler'

export default handler().post(async (req, res) => {
  const { id, authorId } = req.body

  try {
    const message = await prisma.message.findFirst({
      where: {
        id,
      },
    })

    if (!message) {
      return res.status(500).json({ error: 'Message Not Found' })
    }

    if (message.authorId !== authorId) {
      return res.status(401).json({ error: 'Unauthorised' })
    }

    await prisma.message.delete({
      where: {
        id,
      },
    })

    return res.status(200).json({ ok: 'OK' })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
})
