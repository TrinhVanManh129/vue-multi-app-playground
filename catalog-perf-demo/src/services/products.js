import axios from 'axios'

// API thực từ DummyJSON - Fake REST API cho sản phẩm
const BASE_URL = 'https://dummyjson.com/products'

// Fetch tất cả sản phẩm với pagination và search
export async function fetchAllForVirtual({ q = "", limit = 194, skip = 0 } = {}) {
  try {
    let url = `${BASE_URL}?limit=${limit}&skip=${skip}`
    
    if (q) {
      // Dùng search endpoint khi có query
      url = `${BASE_URL}/search?q=${encodeURIComponent(q)}&limit=${limit}`
    }
    
    const { data } = await axios.get(url)
    
    // Normalize data structure để khớp với code hiện tại
    return data.products.map(product => ({
      id: product.id,
      title: product.title,
      price: product.price,
      category: product.category,
      stock: product.stock,
      imageUrl: product.thumbnail, 
      description: product.description,
      brand: product.brand,
      rating: product.rating,
      discountPercentage: product.discountPercentage,
      images: product.images
    }))
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

// Fetch chi tiết một sản phẩm
export async function fetchProductById(id) {
  try {
    const { data: product } = await axios.get(`${BASE_URL}/${id}`)
    
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      category: product.category,
      stock: product.stock,
      imageUrl: product.thumbnail,
      description: product.description,
      brand: product.brand,
      rating: product.rating,
      discountPercentage: product.discountPercentage,
      images: product.images,
      reviews: product.reviews,
      warrantyInformation: product.warrantyInformation,
      shippingInformation: product.shippingInformation,
      returnPolicy: product.returnPolicy
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

// Fetch tất cả categories
export async function fetchCategories() {
  try {
    const { data } = await axios.get(`${BASE_URL}/categories`)
    return data
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// Fetch sản phẩm theo category
export async function fetchProductsByCategory(category, limit = 30) {
  try {
    const { data } = await axios.get(`${BASE_URL}/category/${encodeURIComponent(category)}?limit=${limit}`)
    
    return data.products.map(product => ({
      id: product.id,
      title: product.title,
      price: product.price,
      category: product.category,
      stock: product.stock,
      imageUrl: product.thumbnail,
      description: product.description,
      brand: product.brand,
      rating: product.rating,
      discountPercentage: product.discountPercentage,
      images: product.images
    }))
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
}
