import axios from 'axios';
import { CommentType } from '../components/commentForm/CommentForm';

const COMMENT_URL = process.env.REACT_APP_SERVER_URL + '/comments';

export const getComments = async ({ queryKey }: { queryKey: string[] }) => {
  const [_, crsId] = queryKey;
  const res = await axios.get<CommentType[]>(`${COMMENT_URL}?crsId=${crsId}`);
  return res.data;
};

export const addComment = async (newComment: CommentType) => {
  await axios.post(`${COMMENT_URL}`, newComment);
};

export const modifyComment = async (commentId: string, updatedComment: CommentType) => {
  await axios.patch(`${COMMENT_URL}/${commentId}`, updatedComment);
};

export const deleteComment = async (commentId: string) => {
  await axios.delete(`${COMMENT_URL}/${commentId}`);
};
