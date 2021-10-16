import prisma from '../../lib/prisma'
import handler from '../../util/handler'

export default handler().get(async (req, res) => {
  try {
    const messages = await prisma.message.findMany({
      orderBy: {
        id: 'asc',
      },
    })

    return res.status(200).json({
      messages,
    })
  } catch (e) {
    return res.status(200).json({
      error: e.message,
    })
  }
})
