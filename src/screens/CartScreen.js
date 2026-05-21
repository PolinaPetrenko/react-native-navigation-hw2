import { View, Text, StyleSheet } from 'react-native';

export default function CartScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <Text style={styles.text}>Your selected bouquets will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FF2D6F',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#6B7280',
  },
});