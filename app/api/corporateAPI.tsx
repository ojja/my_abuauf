import { API_ENDPOINT } from "~/config";

export async function getRecipes() {
  const url: string = `${API_ENDPOINT}/pages/getPosts.php`;
  const data: any = {
    post_type: "recipe",
    posts_per_page: 8,
    page:1
  };
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const recipes = result;
    return recipes;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
