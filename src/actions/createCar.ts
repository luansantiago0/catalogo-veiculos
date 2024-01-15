import axios from "axios";

export const createCar = async (formData: FormData, userToken: string) => {
  try {
    const response = await axios.post('http://localhost:8000/carros', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${userToken}`
      }
    });
    console.log('Carro criado:', response.data);
    alert('Carro criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar carro:', error);
    alert('Erro ao criar carro. Por favor, tente novamente.');
  }
}