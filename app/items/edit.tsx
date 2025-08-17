import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';


type ItemType = {
  title?: string;
  rating?: string;
};

export default function AddItemScreen() {
  const router = useRouter();

  // Get the item data from the URL parameters
  // This will be used to pre-fill the form if editing an existing item
  const params = useLocalSearchParams();
  // Parse the item data from the parameters
  // If the item is not found, it will be null
  const item: ItemType | null = params.item ? JSON.parse(params.item as string) : null;
  // State for the form inputs
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
 
  //old code
  /* 
  const item = params.item ? JSON.parse(params.item as string) : null; 
  */
  // If the item exists, pre-fill the form with its data
  // This allows the user to edit the item if it was passed in the URL
  // If the item is null, the form will be empty
   useEffect(() => {
    if (item) {
      setName(item.title || '');
      setQuantity(item.rating || '');
      console.log('Editing item:', item.rating, "and", quantity);
    }
  }, []);

  const handleSave = () => {
    console.log('Saving item:', name, quantity);
    if (!name.trim() || !quantity.trim()) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }
    // Create the item object to edit
    const UpdateItem = {
      name,
      quantity,
      date: new Date().toISOString(), // puedes cambiar a toLocaleString() si prefieres
    };

    console.log('Item editado:', UpdateItem);

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
        value={quantity.toString()} // Ensure quantity is a string
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