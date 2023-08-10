import { Dropdown as AntdDropdown } from 'antd';
import { styled } from 'styled-components';

export const CommentItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 5px 0;
  border-bottom: 1px solid #dcdcdc;

  &:last-child {
    border: none;
  }
`;

export const CommentItemsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const CommentProfileSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const CommentWriterName = styled.p`
  font-size: 1rem;
  font-weight: bold;
`;

export const CommentTime = styled.p`
  color: #aaa;
`;

export const CommentContent = styled.p`
  font-size: 1rem;
  word-break: break-all;
`;

export const Dropdown = styled(AntdDropdown)`
  .ant-dropdown {
    left: auto !important;
    right: 0 !important;
    transform: translateX(calc(-100% - 32px)) !important;
  }
`;
