import axios from 'axios';

export const API_KEY = '31629453-3aa42bb9ff6dc8c3c3e379cd8';
export const PER_PAGE = 12;

axios.defaults.baseURL = 'https://pixabay.com/api/';

const searchParams = new URLSearchParams({
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
});

export const fetchApi = async (searchValue, page = 1) => {
  try {
    const response = await axios.get(
      `?key=${API_KEY}&q=${searchValue}&${searchParams}&page=${page}&per_page=${PER_PAGE}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
