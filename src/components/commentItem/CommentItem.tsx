import React from 'react';
import * as St from './style';
import { CommentType } from '../commentForm/CommentForm';
import { Button, Input } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

type CommentItemType = {
  comment: CommentType;
};

const CommentItem = ({ comment }: CommentItemType) => {
  return (
    <St.CommentItemContainer>
      <St.CommentItemsHeader>
        <St.CommentWriterName>{comment.writerNikName}</St.CommentWriterName>
        <Button icon={<MoreOutlined />} />
      </St.CommentItemsHeader>
      <St.CommentContent>{comment.content}</St.CommentContent>
    </St.CommentItemContainer>
  );
};

export default CommentItem;
