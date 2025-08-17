import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function AddItemScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSave = () => {
    if (!name.trim() || !quantity.trim()) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    const item = {
      name,
      quantity,
      date: new Date().toISOString(), // puedes cambiar a toLocaleString() si prefieres
    };

    console.log('Item guardado:', item);

    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre del Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Manzanas"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Cantidad</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 3"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 4,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#f47521',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});