import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // si usas useStorage debajo de esto

const API_BASE_URL = "https://despensa-api.vercel.app";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * 🔹 Interceptor de request
 * Antes de cada request, inyecta el token JWT si existe
 */
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("authToken"); // 👈 tu clave de useStorage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.log("⚠️ Error leyendo token del storage:", err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * 🔹 Interceptor de response
 * Captura errores globalmente (403, 401, etc.)
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      console.log("❌ API Error:", error.response.status, error.response.data);

      if (error.response.status === 401 || error.response.status === 403) {
        console.log("⚠️ Sesión inválida o token faltante.");
        
        // Opcional: limpiar token para forzar logout
        /* await AsyncStorage.removeItem("authToken");
        await AsyncStorage.removeItem("user");
        await AsyncStorage.removeItem("isLoggedIn"); */

        // Aquí podrías lanzar un evento global o redirigir al login
        // Ejemplo: Alert.alert("Sesión expirada", "Por favor inicia sesión de nuevo.");
      }
    } else if (error.request) {
      console.log("❌ El servidor no respondió:", error.request);
    } else {
      console.log("❌ Error al configurar la petición:", error.message);
    }

    return Promise.reject(error); // Rechaza para manejarlo en casos específicos
  }
);

export default apiClient;