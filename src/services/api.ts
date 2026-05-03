import type { Product, ProductListResponse } from '../types/product'

const BASE_URL = 'https://dummyjson.com'

export async function fetchProducts(): Promise<ProductListResponse> {
  const response = await fetch(`${BASE_URL}/products`)
  if (!response.ok) {
    throw new Error('Unable to fetch products')
  }
  return response.json()
}

export async function fetchProductById(id: number): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`)
  if (!response.ok) {
    throw new Error('Product not found')
  }
  return response.json()
}
