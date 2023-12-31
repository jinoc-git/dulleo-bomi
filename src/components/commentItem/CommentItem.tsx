import { MoreOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input, Menu } from 'antd';
import { useState } from 'react';
import { useDialogStore } from '../../zustand/DialogStore';
import { useUserStore } from '../../zustand/UserStore';
import { CommentType } from '../commentForm/CommentForm';
import CustomConfirm from '../common/customConfirm/CustomConfirm';
import * as St from './style';

type CommentItemType = {
  comment: CommentType;
  onDeleteComment: (commentId: string) => void;
  onEditComment: (commentId: string, updatedComment: CommentType) => void;
};

const CommentItem = ({ comment, onDeleteComment, onEditComment }: CommentItemType) => {
  const [isEditing, setIsEditing] = useState(false);

  const { user } = useUserStore();
  const isCommentAuthor = comment.writerEmail === user?.email;
  const showConfirm = useDialogStore((state) => state.showConfirm);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = (values: { edited: string }) => {
    const updatedComment = { ...comment, content: values.edited };
    onEditComment(comment.id, updatedComment);
    setIsEditing(false);
  };

  const handleDelete = () => {
    showConfirm('정말 삭제하시겠습니까?', () => onDeleteComment(comment.id));
  };

  const dropdownMenu = (
    <Menu>
      <Menu.Item key="1" onClick={handleEdit}>
        수정
      </Menu.Item>
      <Menu.Item key="2" onClick={handleDelete}>
        삭제
      </Menu.Item>
    </Menu>
  );

  return (
    <St.CommentItemContainer>
      <St.CommentItemsHeader>
        <St.CommentProfileSection>
          <Avatar src={comment.writerPhotoURL} />
          <St.CommentWriterName>{comment.writerNikName}</St.CommentWriterName>
        </St.CommentProfileSection>
        {isCommentAuthor && (
          <St.Dropdown overlay={dropdownMenu} trigger={['click']} placement="bottomRight">
            <Button icon={<MoreOutlined />} />
          </St.Dropdown>
        )}
      </St.CommentItemsHeader>
      {isEditing ? (
        <St.CommentContent>
          <Form initialValues={{ edited: comment.content }} onFinish={handleSubmit}>
            <Form.Item name="edited">
              <Input />
            </Form.Item>
            <Button htmlType="submit">수정 완료</Button>
          </Form>
        </St.CommentContent>
      ) : (
        <>
          <St.CommentContent>{comment.content}</St.CommentContent>
          <St.CommentTime>{new Date(comment.timestamp).toLocaleString()}</St.CommentTime>
        </>
      )}
      <CustomConfirm />
    </St.CommentItemContainer>
  );
};

export default CommentItem;
