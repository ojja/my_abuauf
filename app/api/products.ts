import { ProductData } from "types";
import { API_ENDPOINT } from "~/config";
import https from "https";

export async function getCategoryInfo(slug: string) {
  const url = `${API_ENDPOINT}/catInfo.php`;
  const data = {
    category: slug,
  };
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(url, options);
    const result: ApiResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function getProducts(name?: string | null) {
  const url = `${API_ENDPOINT}/category.php`;
  const data = {
    attributes: {},
    category: "dress",
    price_range: [0, 1000],
    products_per_page: 90,
    page_number: 1,
  };
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(url, options);
    const result: ApiResponse = await response.json();
    // Extract the products array from the API response
    const products: ProductData[] = result;
    return products;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    products: ProductData[];
  };
}
export async function getProductBySlug(productSlug: string) {
  const url: string = `${API_ENDPOINT}/single.php`;
  const data: any = {
    slug: productSlug,
  };
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    agent: new https.Agent({ rejectUnauthorized: false }), // Add this line to disable SSL verification
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }

    const result = await response.json();
    const product = result;
    return product;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch product");
  }
}

export async function getNewFilterProducts(
  categorySlug: any,
  pageNumber: number,
  perPage: number,
  minPrice: number = 0,
  maxPrice: number = 1000000
): Promise<unknown> {
  const url: string = `${API_ENDPOINT}/filter.php`;
  const params = new URLSearchParams({
    category: categorySlug,
    price_range: `${minPrice},${maxPrice}`,
    products_per_page: perPage.toString(),
    page: pageNumber.toString(),
  });
  const apiUrl = `${url}?${params}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
