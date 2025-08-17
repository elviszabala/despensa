import React, { use, useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/components/useColorScheme';
import { useAuth } from '../../hooks/useAuth';
import { useStorage } from '@/utils/useStorage';
import { useRouter } from 'expo-router';

//import { COLORS } from '../../constants/colors';

const LoginScreen = () => {
    const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, userName, isLoggedIn} = useAuth();
  const colorScheme = useColorScheme();
  const { value: isLogged, save: saveLoginStatus } = useStorage<boolean>('isLoggedIn', false);

  useEffect(() => {
    console.log('LoginScreen mounted');
    //console.log('Current user:', userName, isLoggedIn);
    
    return () => {
      console.log('LoginScreen unmounted');
    };
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, introduce tu email y contraseña.');
      return;
    }
   /*  const success = await login(email, password);
    if (!success) {
      Alert.alert('Error de Login', 'Las credenciales son incorrectas.');
    } */
  };

    const handleRegister = () => {
        Alert.alert('Registro', 'Funcionalidad de registro no implementada');
    };

    const handleContinueWithoutLogin = () => {
        saveLoginStatus(true);
        //Alert.alert('Continuar sin registrarse', 'Has iniciado sesión como invitado.');
        router.push('../items/add')
    }

  return (
    <SafeAreaView style={styles.container}>
        
    <View  style={styles.section}>
      <Text style={[styles.title, { color: colorScheme === 'dark' ? '#ffffff' : '#000000' }]}>Bienvenido</Text>
      <View style={styles.fieldContainer}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#888"
        
      />
    </View>
    <View style={styles.fieldContainer}>
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#888"
      />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleLogin}> 
                <Text style={styles.saveButtonText}>Iniciar Sesion</Text>
      
        </TouchableOpacity>
      
    </View>
    <View style={{ marginTop: 20 }}>
      <Button title="Registrarse" onPress={() => Alert.alert('Registro', 'Funcionalidad de registro no implementada')} />
    </View>

    <View style={{ marginTop: 20 }}>
      <Button title="Continuar sin registrarse" onPress={() => handleContinueWithoutLogin()} />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#141519',
    padding: 5,
    //paddingTop: 20,
    alignContent: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#f47521',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userEmail: {
    color: '#A9A9A9',
    fontSize: 16,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 5,
  },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    marginBottom: 15,
  },
  fieldIcon: {
    color: '#A9A9A9',
    fontSize: 20,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    paddingVertical: 12,
    fontSize: 16,
    paddingHorizontal: 15,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    paddingVertical: 8,
  },
  settingLabel: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#f47521',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
   logoutButton: {
    backgroundColor: 'transparent',
    borderColor: '#DC143C',
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#DC143C',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;