import { API_ENDPOINT } from "~/config";

export async function getOrderInfo(orderID: number) {
  const url: string = `${API_ENDPOINT}/orderInfo.php`;
  const data: any = {
    order_id: orderID,
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
    // console.log('result',result)
    return result;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function searchForm(key_word: string) {
  const url: string = `${API_ENDPOINT}/search.php`;
  const data: any = {
    products_per_page : 21,
    page : 1,
    keyword: key_word,
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
    // console.log('result',result)
    return result;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function checkMPGS(sessionID: string) {
  const url: string = `${API_ENDPOINT}/payment/MPGS/status.php`;
  const data: any = {
    sessionID: sessionID,
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
    return result;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}