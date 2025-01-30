import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';

export const useApi = () => {
  const { token } = useContext(AuthContext);

  const fetchWithToken = async (url, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }), // Attach token to headers
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response.json();
  };

  return { fetchWithToken };
};
