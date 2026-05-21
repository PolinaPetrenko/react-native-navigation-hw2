import { StyleSheet, Text, View } from 'react-native';

export default function SupportScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Support</Text>
      <Text style={styles.text}>Need help? Contact BloomApp support.</Text>
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