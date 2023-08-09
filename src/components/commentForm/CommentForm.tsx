import React, { useState } from 'react';
import * as St from './style';
import { Button, Input } from 'antd';

const CommentForm = () => {
  const [comment, setComment] = useState<string>('');

  const onSubmitCommentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    <St.CommentFormContainer>
      <St.CommentForm onSubmit={onSubmitCommentHandler}>
        <Input value={comment} onChange={({ target }) => setComment(target.value)} />
        <Button htmlType="submit">작성</Button>
      </St.CommentForm>
    </St.CommentFormContainer>
  );
};

export default CommentForm;
