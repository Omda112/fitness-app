import { JSON_HEADER } from '@/lib/constants/shared.constant';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fitness.elevateegy.com/api/v1',
  headers: {
    ...JSON_HEADER,
  },
});

export default api;
