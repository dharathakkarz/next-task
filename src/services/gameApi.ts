
import axios from 'axios';

const API_URL = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json';

export const fetchGames = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("resss",response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching games:', error);
    return null;
  }
};
