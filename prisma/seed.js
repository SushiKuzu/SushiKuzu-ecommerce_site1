const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('password123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      password,
    },
  })

  const products = [
    { name: 'Blue T-Shirt', slug: 'blue-tshirt', description: 'Comfortable blue t-shirt', price: 1999, image: '/products/blue-tshirt.jpg' },
    { name: 'Red Sneakers', slug: 'red-sneakers', description: 'Stylish red sneakers', price: 5999, image: '/products/red-sneakers.jpg' },
    { name: 'Coffee Mug', slug: 'coffee-mug', description: 'Ceramic coffee mug', price: 1299, image: '/products/coffee-mug.jpg' },
  ]

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    })
  }

  console.log('Seed completed')
}

main()
  .catch(e => console.error(e))
  .finally(async () => { await prisma.$disconnect() })
