const API_URL = 'https://jsonplaceholder.typicode.com/photos?_limit=6';

// Fetch bouquet images from public REST API and adapt them for BouquetCard
export const fetchBouquets = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch bouquets');
  }

  const photos = await response.json();

  const bouquetData = [
    { name: 'Pink Elegance', price: 49, rating: 4.8, reviewsCount: 128 },
    { name: 'Rose Dream', price: 65, rating: 4.9, reviewsCount: 96 },
    { name: 'Soft Blossom', price: 39, rating: 4.7, reviewsCount: 74 },
    { name: 'Spring Kiss', price: 55, rating: 4.6, reviewsCount: 82 },
    { name: 'Luxury Roses', price: 89, rating: 5.0, reviewsCount: 140 },
    { name: 'White Harmony', price: 45, rating: 4.5, reviewsCount: 61 },
  ];

  const flowerImages = [
    'https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800',
    'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=800',
    'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800',
    'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=800',
    'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=800',
    'https://images.unsplash.com/photo-1487530811176-3780de880c2d?q=80&w=800',
  ];

  return photos.map((photo, index) => ({
    id: photo.id.toString(),
    name: bouquetData[index].name,
    price: bouquetData[index].price,
    rating: bouquetData[index].rating,
    reviewsCount: bouquetData[index].reviewsCount,
    deliveryTime: index % 2 === 0 ? 'Today' : 'Tomorrow',
    imageUrl: flowerImages[index],
  }));
};