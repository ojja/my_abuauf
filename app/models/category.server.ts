import { API_ENDPOINT } from "~/config";
import https from 'https';

// Define a cache object to store API responses
const apiCache = new Map();

export async function getCategoryProducts(categorySlug: string, pageNumber: number = 1, pageSize: number = 20) {
  const cacheKey = `getCategoryProducts:${categorySlug}:${pageNumber}:${pageSize}`;
  
  // Check if the response is already cached
  if (apiCache.has(cacheKey)) {
    return apiCache.get(cacheKey);
  }
  
  const url: string = `${API_ENDPOINT}/category.php`;
  const data: any = { category: categorySlug, products_per_page: pageSize, page_number: pageNumber };
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    agent: new https.Agent({ rejectUnauthorized: false }), // Add this line to disable SSL verification
  };

  console.log('data',JSON.stringify(data))
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log('result',result)
    // Cache the response for future use
    apiCache.set(cacheKey, result);
    
    return result;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function getFilterProducts(categorySlug: any, pageNumber: number, perPage: number, minPrice: number = 0, maxPrice: number = 1000000): Promise<unknown> {
  const cacheKey = `getFilterProducts:${categorySlug}:${pageNumber}:${perPage}:${minPrice}:${maxPrice}`;
  
  // Check if the response is already cached
  if (apiCache.has(cacheKey)) {
    return apiCache.get(cacheKey);
  }
  
  const url: string = `${API_ENDPOINT}/filter.php`;
  const data: any = {
    category: categorySlug,
    price_range: [minPrice, maxPrice],
    products_per_page: perPage,
    page: pageNumber,
    "sort": {
      "criteria": "date",
      "arrangement": "DESC"
    }
  };
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    
    // Cache the response for future use
    apiCache.set(cacheKey, result);
    
    return result;
  } catch (error) {
    console.error('Error:', error);
  }
}
