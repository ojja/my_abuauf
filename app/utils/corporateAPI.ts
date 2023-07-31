import { API_ENDPOINT } from "~/config";

const sendAuthenticatedRequest = async (endpoint: string, requestData: any) => {
  try {
    const apiUrl = `${API_ENDPOINT}/${endpoint}`;
    const requestBody = {
      ...requestData,
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData as unknown;
    } else {
      console.log("Request failed");
      return null;
    }
  } catch (error) {
    console.log("An error occurred", error);
    return null;
  }
};

const forgotPassword = async (user_email: string) => {
  return sendAuthenticatedRequest("my-account/password/forgot-password.php", {
    user_email: user_email,
  });
};

const contactUsForm = async (formData: any) => {
  return sendAuthenticatedRequest("contact-us.php", formData);
};

export { forgotPassword, contactUsForm };
