import { Button, StyleSheet, Text, View } from 'react-native';

export default function ProductDetailsScreen({ route, navigation }) {
  const product = route.params?.product;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Details</Text>

      <Text style={styles.text}>
        {product?.name || 'No product selected'}
      </Text>

      <Text style={styles.price}>
        ${product?.price || 0}
      </Text>

      <Button
        title="Go Back"
        color="#FF2D6F"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FF2D6F',
    marginBottom: 24,
  },
});