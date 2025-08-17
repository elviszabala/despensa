import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { useAuth } from '../hooks/useAuth'; // Hook de autenticación
//import { getItem } from '@/utils/useStorage'; // Función para leer AsyncStorage

export default function useFirtStart() {
  const { userName, isLoggedIn } = useAuth(); // Estos cambian en tiempo real
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    user: { name: string; email: string } | null,
    settings: any,
    isLoggedIn: boolean,
  }>({
    user: null,
    settings: {},
    isLoggedIn: false,
  });

  useEffect(() => {
    let isMounted = true; // Evitar actualizaciones si el componente se desmonta

    const init = async () => {
      console.log('App has started', Platform.OS);

      setLoading(true); // Se pone en carga cada vez que cambie el usuario

      // Leer configuración guardada
      const storedSettings = {theme: 'light', notifications: true } //await getItem('settings');
      const finalSettings = storedSettings || { theme: 'light', notifications: true };

      // Actualizar datos en base a estado de autenticación
      if (!isLoggedIn) {
        console.log('User is not logged in, loading default data');
        if (isMounted) {
          setData({
            user: { name: 'John Doe', email: 'test@test.com' },
            settings: finalSettings,
            isLoggedIn: false,
          });
        }
      } else {
        console.log('User is logged in, loading user data');
        if (isMounted) {
          setData({
            user: { name: userName || 'Unknown', email: '' },
            settings: finalSettings,
            isLoggedIn: true,
          });
        }
      }

      if (isMounted) setLoading(false);
    };

    init();

    return () => {
      isMounted = false;
    };
  }, [userName, isLoggedIn]); // Se ejecuta cada vez que cambien estos valores

  return { loading, ...data };
}