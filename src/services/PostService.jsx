import axios from "axios";
import { getConfig } from "./logedUser";
const POST_BASE_API_URL = "https://jsonplaceholder.typicode.com/auth";

class PostService {
  async savePost(post) {
    try {
      const response = await axios.post(POST_BASE_API_URL, post, getConfig());

      return response?.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status == 409) {
          throw new Error(error?.response?.data?.message);
        } else if (error.response.status == 400) {
          throw new Error(
            "Certifique-se de que todos os campos esteja devidamente preenchidos"
          );
        } else if (error.response.status == 401) {
          throw new Error("Token expirado");
        } else
          throw new Error(
            error?.response?.data?.message || "O Servidor esta offline"
          );
      } else {
        throw new Error(null);
      }
    }
  }
  async getPosts() {
    try {
      const response = await axios.get(POST_BASE_API_URL, getConfig());

      return response?.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status == 409) {
          throw new Error(error?.response?.data?.message);
        } else if (error.response.status == 400) {
          throw new Error(
            "Certifique-se de que todos os campos esteja devidamente preenchidos"
          );
        } else if (error.response.status == 401) {
          throw new Error("Token expirado");
        } else
          throw new Error(
            error?.response?.data?.message || "O Servidor esta offline"
          );
      } else {
        throw new Error(null);
      }
    }
  }
}
export default new PostService();
