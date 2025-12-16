import Stripe from 'stripe'
import prisma from '../../lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET || 'sk_test_change_me')

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { productId } = req.body
  const product = await prisma.product.findUnique({ where: { id: Number(productId) } })
  if (!product) return res.status(404).json({ error: 'Product not found' })

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price_data: { currency: 'usd', product_data: { name: product.name }, unit_amount: product.price }, quantity: 1 }],
    mode: 'payment',
    success_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/?success=1`,
    cancel_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/?canceled=1`,
  })

  res.json({ url: session.url })
}
