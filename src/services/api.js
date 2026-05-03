const BASE_URL = 'https://dummyjson.com';
/**
 * Fetch all products from DummyJSON API
 */
export async function fetchProducts(limit = 100, skip = 0) {
    const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    return response.json();
}
/**
 * Fetch a single product by ID from DummyJSON API
 */
export async function fetchProductById(id) {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
        throw new Error(`Product with ID ${id} not found`);
    }
    return response.json();
}
/**
 * Search products by query string
 */
export async function searchProducts(query) {
    const response = await fetch(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
    }
    return response.json();
}
//# sourceMappingURL=api.js.map