import axios from "axios";

export const updateCar = async (id: number, formData: FormData, userToken: string, onSubmit: () => void) => {
  try {
    const response = await axios.put(`http://localhost:8000/carros/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${userToken}`
      },
    });
    console.log('Carro atualizado:', response.data);
    alert('Carro atualizado com sucesso!');
    onSubmit();
  } catch (error) {
    console.error('Erro ao atualizar carro:', error);
    alert('Erro ao atualizar carro. Por favor, tente novamente.');
  }
}