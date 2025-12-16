import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(setProducts)
  }, [])

  return (
    <div>
      <header style={{padding: '1rem', borderBottom: '1px solid #ddd'}}>
        <h1>ecommerce_site1</h1>
      </header>
      <main style={{padding: '1rem'}}>
        <h2>Products</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem'}}>
          {products.map(p => (
            <Link key={p.id} href={`/products/${p.slug}`}>
              <a style={{border: '1px solid #eee', padding: '1rem', borderRadius: 6, textDecoration: 'none', color: 'inherit'}}>
                <img src={p.image || '/products/placeholder.png'} alt="" style={{width: '100%', height: 160, objectFit: 'cover'}} />
                <h3>{p.name}</h3>
                <p>${(p.price/100).toFixed(2)}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
