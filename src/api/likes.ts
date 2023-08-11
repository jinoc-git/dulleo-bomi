import axios from 'axios';
import { LikeType } from '../components/like/Like';

const LIKE_URL = process.env.REACT_APP_SERVER_URL + '/likes';

export const getLikes = async ({ queryKey }: { queryKey: string[] }) => {
  const [_, crsId] = queryKey;
  const res = await axios.get<LikeType[]>(`${LIKE_URL}?crsId=${crsId}`);
  return res.data;
};

export const addLikes = async (newLike: LikeType) => {
  await axios.post(`${LIKE_URL}`, newLike);
};

// export const patchLikes = async ({ switchedLike: LikeT, crsId }) => {
//   const newLikes = { id: postId, userList: switchedLikes };
//   try {
//     const res = await axios.patch(`${LIKE_URL}/${crsId}`, newLikes);
//     console.log('api에서 res', res);
//   } catch (error) {
//     console.log('api에서 error', error);
//   }
// };

// export const modifyComment = async (commentId: string, updatedComment: CommentType) => {
//   await axios.patch(`${COMMENT_URL}/${commentId}`, updatedComment);
// };
