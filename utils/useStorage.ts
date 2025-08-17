// useStorage.js
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const SENSITIVE_KEYS = ['authToken', 'userPassword', 'refreshToken', 'isLoggedIn'];

const isSensitive = (key: string) => SENSITIVE_KEYS.includes(key);

export function useStorage<T = string | null>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    //console.log(`useStorage mounted for key: ${key}`);
    setLoading(true);
    const loadValue = async () => {
      try {
        const storedValue = isSensitive(key) ? await SecureStore.getItemAsync(key) : await AsyncStorage.getItem(key);

        setValue((storedValue !== null ? (storedValue as T) : defaultValue));
      } catch (error) {
        console.error(`Error loading ${key}:`, error);
      } finally {
        setLoading(false);
      }
    };

    loadValue();
  }, [key, defaultValue]);

  const save = async (newValue: T) => {
    //console.log(`Saving ${key}:`, newValue);
    
    try {
      if (isSensitive(key)) {
        await SecureStore.setItemAsync(key, String(newValue));
      } else {
        await AsyncStorage.setItem(key, String(newValue));
      }
      setValue(newValue);
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
    }
  };

  const remove = async () => {
    //console.log(`Removing ${key}`);
    
    try {
      if (isSensitive(key)) {
        await SecureStore.deleteItemAsync(key);
      } else {
        await AsyncStorage.removeItem(key);
      }
      setValue(defaultValue);
      //console.log('Default value set:', defaultValue);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
    }
  };

  return { value, save, remove, loading };
}
