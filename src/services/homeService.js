import axiosClient from './axiosClient';

const homeService = {
  // Bạn không cần viết đầy đủ URL, không cần lo về header nữa
  getProducts: (userId) => {
    return axiosClient.get(`/carts/${userId}`);
  },
//   addToCart: (item) => {
//     return axiosClient.post('/carts', item);
//   }
};

export default homeService;