import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { useStorage } from '@/utils/useStorage';
import { use, useEffect, useState } from 'react';

export function useAuth() {
  const { value: userName, save: saveUser } = useStorage<string | null>('user', null);
  const { value: isLoggedIn, save: saveLoginStatus } = useStorage<boolean>('isLoggedIn', false);
   const [value, setValue] = useState('');






  useEffect(() => {
    console.log('useAuth mounted', userName, isLoggedIn);
    const checkLoginStatus = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      const storedLoginStatus = await AsyncStorage.getItem('isLoggedIn');
      //console.log('Checking login status:', storedUser, storedLoginStatus);

      if (storedUser) {
        saveUser(storedUser);
      }
      if (storedLoginStatus) {
        saveLoginStatus(JSON.parse(storedLoginStatus));
      }
    };

    checkLoginStatus();
     return () => {
        console.log('useAuth unmounted');
      };
  }, []);


  const login = async (name: string) => {
    await saveUser(name);
    await saveLoginStatus(true);
    //console.log(`User ${name} logged in`);
    
  };

  const logout = async () => {
    await saveUser(null);
    await saveLoginStatus(false);
  };

  return {
    userName,
    isLoggedIn,
    login,
    logout,
    
  };
}

