import axios from "axios";

export const deleteCar = async (id: number, userToken: string) => {
  try {
    await axios.delete(`http://localhost:8000/carros/${id}`, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });
  } catch(error) {
    console.error('Erro ao deletar carro:', error);
  }
}