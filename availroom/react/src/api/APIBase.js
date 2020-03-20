import axios from 'axios';
import Config from 'react-native-config';

/**
 * Base API URL configuration file for axios.
 * URL is configured in .env file
 */
export default axios.create({
  baseURL: Config.API_URL,
});
