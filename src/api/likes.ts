import axios from 'axios';
import { LikeType } from '../components/like/Like';

const LIKE_URL = process.env.REACT_APP_SERVER_URL + '/likes';

// export const getLikes = async (crsId: string) => {
//   const res = await axios.get<LikeType>(`${LIKE_URL}/${crsId}`);
//   return res.data;
// };

export const addLikes = async (newLike: LikeType) => {
  await axios.post(`http://localhost:4000/likes`, newLike);
};

// export const addLikes = async (newLike: LikeType) => {
//   await axios.post(`${LIKE_URL}`, newLike);
// };

export const patchLikes = async (likeId: string, switchedLike: LikeType) => {
  try {
    const res = await axios.patch(`${LIKE_URL}/${likeId}`, switchedLike);
    console.log('api에서 res', res);
  } catch (error) {
    console.log('api에서 error', error);
  }
};
