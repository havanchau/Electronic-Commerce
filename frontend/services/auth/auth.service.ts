import axios from "axios";

class AuthService {

  async register(email: string, name: string, password: string, phone: string) {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      email,
      name,
      password,
      phone,
    });
    return response.data;
  }

  async login(email: string, password: string) {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  }
}

const authService = new AuthService();

export default authService;
