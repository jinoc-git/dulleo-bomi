import { useState } from 'react';
import * as St from './style';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

export type LikeType = {
  id: string;
  crsId: string;
  userList: string[];
};

type LikeStateType = {
  isChecked: boolean;
};

const Like = () => {
  const [likeState, setLikeState] = useState<LikeStateType>({
    isChecked: false,
  });

  const switchLike = () => {
    likeState.isChecked
      ? setLikeState({
          isChecked: false,
        })
      : setLikeState({
          isChecked: true,
        });
  };

  return (
    <St.likeContainer>
      {likeState.isChecked ? (
        <HeartFilled style={{ fontSize: '20px' }} onClick={switchLike} />
      ) : (
        <HeartOutlined style={{ fontSize: '20px' }} onClick={switchLike} />
      )}
      <p>???</p>
    </St.likeContainer>
  );
};

export default Like;
