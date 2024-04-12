import axios from "axios";
import { getConfig } from "./logedUser";
const Deparment_BASE_API_URL = "https://jsonplaceholder.typicode.com/auth";

class UsersService {
  async saveUser(user) {
    try {
      const response = await axios.post(
        Deparment_BASE_API_URL + "/sign",
        user,
        getConfig()
      );

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
          throw new Error(error?.response?.data?.message || "Erro Interno");
      } else {
        throw new Error("Verifique a sua Internet");
      }
    }
  }
  async login(user) {
    try {
      const response = await axios.post(
        Deparment_BASE_API_URL + "/login",
        user,
        getConfig()
      );

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
        throw new Error("Verifique a sua Internet");
      }
    }
  }
}

export default new UsersService();
