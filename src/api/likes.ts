import axios from 'axios';
import { LikeType } from '../components/like/Like';

const LIKE_URL = process.env.REACT_APP_SERVER_URL + '/likes';
// const LIKE_URL = 'http://localhost:4000/likes';

export const getLikes = async ({ queryKey }: { queryKey: string[] }) => {
  const [_, crsId] = queryKey;
  const res = await axios.get<LikeType[]>(`${LIKE_URL}`);
  return res.data;
};

export const getMyLikes = async ({ queryKey }: { queryKey: string[] }) => {
  const [_, userEmail] = queryKey;
  const res = await axios.get<LikeType[]>(`${LIKE_URL}?likedUserEmail=${userEmail}`);
  return res.data;
};

export const addLike = async (newLike: LikeType) => {
  await axios.post(`${LIKE_URL}`, newLike);
};

export const deleteLike = async (likeId: string) => {
  await axios.delete(`${LIKE_URL}/${likeId}`);
};
