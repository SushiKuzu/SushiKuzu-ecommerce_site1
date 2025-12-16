import prisma from '../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { slug } = req.query
    const where = slug ? { slug } : {}
    const products = slug ? await prisma.product.findMany({ where }) : await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })
    res.json(products)
  } else {
    res.status(405).end()
  }
}
