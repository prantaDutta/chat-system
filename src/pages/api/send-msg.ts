import prisma from '../../lib/prisma'
import handler from '../../util/handler'

export default handler().post(async (req, res) => {
  const { msg, id } = req.body
  if (!id || !msg) {
    return res.status(500).json({
      error: 'Please Provide the message',
    })
  }

  try {
    await prisma.message.create({
      data: {
        content: msg,
        authorId: id,
      },
    })
    return res.status(200).json({
      ok: 'Everything Worked',
    })
  } catch (e) {
    return res.status(422).json({
      error: e.message,
    })
  }
})
