import { useState, useEffect, useCallback } from "react";
import apiClient from "./apiClient";

type ApiMethod = "get" | "post" | "put" | "delete";

interface UseApiOptions {
  method?: ApiMethod;
  endpoint: string;
  body?: Record<string, any>;
  params?: Record<string, any>;
  autoFetch?: boolean; // si quieres que se llame automáticamente al montar
}

export const useApi = ({ method = "get", endpoint, body, params, autoFetch = true }: UseApiOptions) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let response;

      switch (method) {
        case "get":
          response = await apiClient.get(endpoint, { params });
          break;
        case "post":
          response = await apiClient.post(endpoint, body);
          break;
        case "put":
          response = await apiClient.put(endpoint, body);
          break;
        case "delete":
          response = await apiClient.delete(endpoint);
          break;
        default:
          throw new Error("Método no soportado");
      }

      setData(response.data);
    } catch (err: any) {
      console.log("⚠️ useApi error:", err.response?.data || err.message);
      setError(err.response?.data || { message: err.message });
    } finally {
      setLoading(false);
    }
  }, [endpoint, method, body, params]);

  // autoFetch al montar
  useEffect(() => {
    if (autoFetch) fetchData();
  }, [fetchData, autoFetch]);

  return { data, error, loading, refetch: fetchData };
};