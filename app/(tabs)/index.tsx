import { StyleSheet, StatusBar, SafeAreaView, ScrollView } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';


export default function TabOneScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View>
      {/* Set status bar style * 
      <StatusBar barStyle="dark-content" /> 

      {/* Top row with two blocks */}
      <View style={styles.row}>
        <View style={[styles.block, { backgroundColor: '#8e44ad' }]}>
          <Text style={styles.blockTitle}>Items </Text>
          <Text style={styles.blockValue}>50</Text>
        </View>
        <View style={[styles.block, { backgroundColor: '#2980b9' }]}>
          <Text style={styles.blockTitle}>Days</Text>
          <Text style={styles.blockValue}>980</Text>
        </View>
      </View>

      {/* Bottom, full-width block */}
      <View style={[styles.largeBlock, { backgroundColor: '#27ae60' }]}>
        <Text style={styles.blockTitle}>Combinations 💰</Text>
        <Text style={styles.blockValue}>45600</Text>
      </View>
      <View style={[styles.largeBlock, { backgroundColor: '#b6df3cff' }]}>
        <Text style={styles.blockTitle}>Revenue 💰</Text>
        <Text style={styles.blockValue}>$45,600</Text>
      </View>
      <View style={[styles.largeBlock, { backgroundColor: '#b6df3cff' }]}>
        <Text style={styles.blockTitle}>Revenue 💰</Text>
        <Text style={styles.blockValue}>$45,600</Text>
      </View>
      {/* Another row with two blocks */}
       <View style={styles.row}>
        <View style={[styles.block, { backgroundColor: '#8e44ad' }]}>
          <Text style={styles.blockTitle}>Items </Text>
          <Text style={styles.blockValue}>50</Text>
        </View>
        <View style={[styles.block, { backgroundColor: '#2980b9' }]}>
          <Text style={styles.blockTitle}>Days</Text>
          <Text style={styles.blockValue}>980</Text>
        </View>
      </View>

    </View>
     </ScrollView>   
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    //paddingTop: StatusBar.currentHeight + 16 || 32, // Add padding for status bar
    //backgroundColor: '#f5f5f5',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribute blocks evenly
    marginBottom: 16,
  },
   scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  block: {
    width: '48%', // Each block takes up slightly less than half the width
    height: 150,
    borderRadius: 10,
    padding: 16,
    justifyContent: 'space-between', // Vertically space out title and value
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
  blockTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  blockValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'right',
  },
});
