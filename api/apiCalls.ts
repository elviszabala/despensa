import apiClient from './apiClient';

// Ejemplo de llamada GET
export const getResource = async (endpoint: string, params?: Record<string, any>) => {
    const response = await apiClient.get(endpoint, { params });
    return response.data;
};

// Ejemplo de llamada POST
export const postResource = async (endpoint: string, data: Record<string, any>) => {
    const response = await apiClient.post(endpoint, data);
    return response.data;
};

export const onlyGet = async  (endpoint: string) => {
    const response = await apiClient.get(endpoint);
    return response.data;
};

// Puedes agregar más funciones según tus necesidades