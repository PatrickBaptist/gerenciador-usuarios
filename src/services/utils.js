import axios from 'axios';

export const fetchEndereco = async (cep) => {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/endereco/${cep}`);
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return response.data;
  } catch (err) {
    console.error("Erro ao buscar o CEP:", err);
    alert("Erro ao buscar CEP. Verifique e tente novamente.")
    throw new Error("Erro ao buscar CEP. Verifique e tente novamente.");
  }
};