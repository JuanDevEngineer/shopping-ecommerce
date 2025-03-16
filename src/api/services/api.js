import { API_URL } from "../constants";

class ApiService {
  async getProducts(url) {
    const response = await fetch(`${API_URL}${url}`);
    return response;
  }
}

export default new ApiService();