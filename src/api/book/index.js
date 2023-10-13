import axios from 'axios';
import { getAuthToken } from '../auth/login';
import { bookUrl } from '../../utils/urls';

export async function insertBook(title, description, year, bookCover) {
  const token = getAuthToken();
  try {
    const response = await axios.post(
      bookUrl,
      {
        title,
        description,
        year,
        bookCover,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return { message: 'OK', data: response.data };
  } catch (error) {
    return {
      message: 'Error occurred',
      data: error.response.data.errors,
    };
  }
}

export default async function getBooks() {
  try {
    const response = await axios.get(bookUrl);

    return { books: response.data.data, loading: false };
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}
