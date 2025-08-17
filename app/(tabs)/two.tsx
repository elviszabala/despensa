import { StyleSheet, StatusBar, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useState } from 'react';

import data from '../../constants/data.json'

export default function TabTwoScreen() {
  const router = useRouter();
  
 const [items, setItems] = useState(data);

  const handleDelete = (item: { title: any; type?: string; description?: string; filename?: string; height?: number; width?: number; price?: number; rating?: number; }) => {
    Alert.alert('Eliminar ítem', `¿Eliminar "${item.title}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => {
          setItems((prev) => prev.filter((i) => i.title !== item.title));
        },
      },
    ]);
  };

  const handleEdit = (item: { title: any; type?: string; description?: string; filename?: string; height?: number; width?: number; price?: number; rating?: number; }) => {
    router.push({ pathname: '/items/edit', params: { item: JSON.stringify(item) } });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/items/add')}>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/items/add')}>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.largeBlock}>
        <Text style={styles.blockTitle}>Total Items</Text>
        <Text style={styles.blockValue}>{items.length}</Text>
      </View>

      <Text style={styles.title}>Items List</Text>
      <View style={styles.separator} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SwipeListView
        data={items}
        keyExtractor={(item) => item.title}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.text}>{item.title}</Text>
            </View>
          </View>
        )}
        renderHiddenItem={({ item }) => (
          <View style={styles.rowBack}>
            <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
              <Text style={styles.actionText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item)}>
              <Text style={styles.actionText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
        rightOpenValue={-180}
        disableRightSwipe
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
  },
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  header: {
    padding: 8,
    // Add padding for status bar
    //backgroundColor: '#f5f5f5',
    borderBottomColor: '#ccc',  

   borderRadius: 10,
   borderBottomWidth: 1,
   paddingBottom: 16,
    
  },
   row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Distribute blocks evenly
    marginBottom: 16,
    borderRadius: 10,
    
  },
  block: {
    //width: '48%', // Each block takes up slightly less than half the width
    //height: 150,
    //borderRadius: 10,
    padding: 3,
    //justifyContent: 'space-between', // Vertically space out title and value
    // Shadow for a card-like effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  largeBlock: {
    width: '100%', // Full width
    height: 150,
    borderRadius: 10,
    padding: 16,
    justifyContent: 'space-between',
    marginBottom: 16,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    
  },
   card: {
        //backgroundColor: '#fff',
        //backgroundColor: 'red',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 15,
        overflow: 'hidden',
        paddingBottom: 12,
        paddingTop: 12,
        
        

    },
  button: {
    backgroundColor: '#7ad815ff',
    padding: 12,
    borderRadius: 8,
    //alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  blockTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    //color: '#fff',
  },

  blockValue: {
    fontSize: 32,
    fontWeight: 'bold',
    //color: '#fff',
    textAlign: 'right',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  separator: {
    marginVertical: 8,
    height: 3,
    width: '100%',
    //backgroundColor: '#eee',
  },
  cardContent: {
    padding: 10,
    
  },
  text: {
    fontSize: 16,
    //color: '#333',
    textAlign: 'right',
  },
    list: {
        padding: 10,
        paddingBottom: 16,
        backgroundColor: '#e1ea93ff',
        paddingTop: 16,
        
    },
  rowBack: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  paddingRight: 10,
  //backgroundColor: '#ddd',
  borderRadius: 10,
  marginBottom: 15,
  height: '100%',
},

editButton: {
  backgroundColor: '#4caf50',
  padding: 16,
  borderRadius: 8,
  marginRight: 8,
},

deleteButton: {
  backgroundColor: '#f44336',
  padding: 16,
  borderRadius: 8,
},

actionText: {
  color: '#fff',
  fontWeight: 'bold',
},
   
});