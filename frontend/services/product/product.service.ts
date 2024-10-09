import axios from 'axios';

class ProductService {

  async create(data: any) {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        data
    });
    return response.data;
  }

  async gets() {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    return response.data;
  }

  async search(query: Record<string, any>) {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/search`, {
      params: query,
    });
    return response.data;
  }

  async get(id: number) {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
    return response.data;
  }

  async update(id: number, updatedData: Record<string, any>) {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, updatedData);
    return response.data;
  }

  async delete(id: number) {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
    return response.data;
  }
}

const productService = new ProductService();

export default productService;
