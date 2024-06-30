export interface Product {
  id: string
  name: string
  price: number
  description: string
  imageURL: string
  imageAlt: string
  imageCredit: string
}

export async function getProducts(): Promise<Product[]> {
  const results = await fetch('/products.json')
  return results.json()
}

export type CartItems = { [productID: string]: number }
export type CheckoutResponse = { success: boolean; error?: string }

export async function checkout(items: CartItems): Promise<CheckoutResponse> {
  const modifier = Object.keys(items).length > 0 ? 'success' : 'error'
  const url = `/checkout-${modifier}.json`
  await sleep(500)
  const response = await fetch(url)
  const data = await response.json()
  if (!data.success) {
    throw new Error(data.error)
  }
  return data as CheckoutResponse
}

// utility function to simulate slowness in an API call
const sleep = (time: number) => new Promise((res) => setTimeout(res, time))
