import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function ProductPage() {
  const router = useRouter()
  const { slug } = router.query
  const [product, setProduct] = useState(null)

  useEffect(() => {
    if (!slug) return
    fetch(`/api/products?slug=${slug}`)
      .then(r => r.json())
      .then(data => setProduct(data[0]))
  }, [slug])

  if (!product) return <div>Loading...</div>

  async function handleBuy() {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: product.id })
    })
    const { url } = await res.json()
    window.location = url
  }

  return (
    <div style={{padding: '1rem'}}>
      <button onClick={() => router.back()}>← Back</button>
      <h1>{product.name}</h1>
      <img src={product.image || '/products/placeholder.png'} style={{width: 400, height: 400, objectFit: 'cover'}} />
      <p>{product.description}</p>
      <p>${(product.price/100).toFixed(2)}</p>
      <button onClick={handleBuy}>Buy (Stripe)</button>
    </div>
  )
}
