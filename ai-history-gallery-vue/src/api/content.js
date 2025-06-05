// 内容API模块
// 用于管理不同类型的内容获取

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

/**
 * 根据内容类型获取内容
 * @param {string} contentType - 内容类型
 * @returns {Promise<Array>} 内容数组
 */
export const getContentByType = async (contentType) => {
  try {
    const response = await fetch(`${API_BASE_URL}/content/${contentType}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data.entities || data
  } catch (error) {
    console.error('Error fetching content by type:', error)
    throw error
  }
}

/**
 * 从指定URL获取内容
 * @param {string} url - 内容URL
 * @returns {Promise<Array>} 内容数组
 */
export const getContentByUrl = async (url) => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data.entities || data
  } catch (error) {
    console.error('Error fetching content by URL:', error)
    throw error
  }
}

/**
 * 获取内容类型列表
 * @returns {Promise<Array>} 内容类型列表
 */
export const getContentTypes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/content/types`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data.types || data
  } catch (error) {
    console.error('Error fetching content types:', error)
    throw error
  }
}

/**
 * 搜索内容
 * @param {string} query - 搜索关键词
 * @param {string} contentType - 内容类型（可选）
 * @returns {Promise<Array>} 搜索结果
 */
export const searchContent = async (query, contentType = '') => {
  try {
    const params = new URLSearchParams({ q: query })
    if (contentType) {
      params.append('type', contentType)
    }
    
    const response = await fetch(`${API_BASE_URL}/content/search?${params}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data.results || data
  } catch (error) {
    console.error('Error searching content:', error)
    throw error
  }
}

/**
 * 内容缓存管理
 */
class ContentCache {
  constructor() {
    this.cache = new Map()
    this.maxAge = 5 * 60 * 1000 // 5分钟缓存
  }

  get(key) {
    const item = this.cache.get(key)
    if (!item) return null
    
    if (Date.now() - item.timestamp > this.maxAge) {
      this.cache.delete(key)
      return null
    }
    
    return item.data
  }

  set(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    })
  }

  clear() {
    this.cache.clear()
  }
}

export const contentCache = new ContentCache()

/**
 * 带缓存的内容获取
 * @param {string} contentType - 内容类型
 * @param {string} url - 内容URL（可选）
 * @returns {Promise<Array>} 内容数组
 */
export const getCachedContent = async (contentType, url = '') => {
  const cacheKey = url || contentType
  
  // 尝试从缓存获取
  const cachedData = contentCache.get(cacheKey)
  if (cachedData) {
    return cachedData
  }
  
  // 从服务器获取
  let data
  if (url) {
    data = await getContentByUrl(url)
  } else {
    data = await getContentByType(contentType)
  }
  
  // 缓存数据
  contentCache.set(cacheKey, data)
  
  return data
} 