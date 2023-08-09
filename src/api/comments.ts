import axios from 'axios';
import { CommentType } from '../components/commentForm/CommentForm';

const COMMENT_URL = process.env.REACT_APP_SERVER_URL + '/comments';

export const getComments = async () => {
  // const res = axios.get
};

export const addComment = async (newComment: CommentType) => {
  // axios.post
};

export const modifyComment = async () => {
  // axios.patch
};

export const deleteComment = async () => {
  // axios.delete
};
