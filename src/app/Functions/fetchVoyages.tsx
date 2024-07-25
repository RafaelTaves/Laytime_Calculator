import axios from 'axios';

interface Voyages {
    from_location: string,
    description: string,
    name: string,
    id_voyage: number,
    to_location: string
  }

const BASE_URL = "http://127.0.0.1:8000"

async function FetchVoyages(): Promise<Voyages[]> {
  try {
    const token = localStorage.getItem('token');
    
    const response = await axios.get<Voyages[]>(`${BASE_URL}/voyages`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar os voyage:', error);
    return [];
  }
}

export default FetchVoyages
