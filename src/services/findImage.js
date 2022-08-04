import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const KEY = '28624819-d410dfb7aeeef29a0be5ef4eb';

function findImage(require, page) {
  return axios.get(`${URL}?q=${require}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`);
};

export default findImage;
