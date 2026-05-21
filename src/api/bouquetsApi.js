const API_URL =
  'https://6a0f34ca1736097c360b49cf.mockapi.io/bouquets';

// Fetch bouquets from MockAPI
export const fetchBouquets = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch bouquets');
  }

  return response.json();
};