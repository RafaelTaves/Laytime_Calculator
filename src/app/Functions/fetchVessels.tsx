import axios from 'axios';

type Vessel = {
  code: string;
  description: string;
  name: string;
  id_vessel: number;
};

const BASE_URL = "http://127.0.0.1:8000"

async function FetchVessels(): Promise<Vessel[]> {
  try {
    const token = localStorage.getItem('token');
    
    const response = await axios.get<Vessel[]>(`${BASE_URL}/vessels`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar os vessels:', error);
    return [];
  }
}

export default FetchVessels
