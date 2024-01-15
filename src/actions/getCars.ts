import axios from "axios";

export const getCars = async () => {
  try {
    const response = await axios.get("http://localhost:8000/carros");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}