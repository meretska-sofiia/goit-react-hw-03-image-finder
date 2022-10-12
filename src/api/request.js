import axios from 'axios';

const imageApi = axios.create({
  baseURL: 'https://pixabay.com/api',
});

const fetchPhoto = async ({ page = 1, searchQuery = '' }) => {
  const response = await imageApi.get('/', {
    params: {
      q: searchQuery,
      page,
      key: '29947083-d7a9168667076548201f0ba28',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
  return response.data.hits;
};

export default fetchPhoto;
