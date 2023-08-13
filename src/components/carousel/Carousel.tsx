import React, { useRef } from 'react';
import Layout from '../common/layout/Layout';
import YoutubePlayer from '../youtube/YoutubePlayer';
import * as St from './style';
import Flicking from '@egjs/react-flicking';
import VIDOO_ID from '../youtube/videoId';
import { nanoid } from 'nanoid';
import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/flicking-plugins/dist/arrow.css';
import { Button } from 'antd';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';

let moving = false;

const Carousel = () => {
  const flickingRef = useRef<Flicking>(null);

  const next = async () => {
    if (moving) return;
    if (flickingRef.current !== null) {
      await flickingRef.current.next();
    }
  };

  const prev = async () => {
    if (moving) return;
    if (flickingRef.current !== null) {
      await flickingRef.current.prev();
    }
  };

  return (
    <St.CarouselContainer>
      <Layout>
        <Flicking
          panelsPerView={3}
          align="center"
          circular={true}
          ref={flickingRef}
          onMoveStart={() => (moving = true)}
          onMoveEnd={() => (moving = false)}
        >
          {VIDOO_ID.map((id) => {
            return (
              <div key={nanoid()} style={{ margin: '10px' }}>
                <YoutubePlayer id={id} />
              </div>
            );
          })}
        </Flicking>
      </Layout>
      <Button icon={<LeftCircleOutlined />} onClick={prev} className="prev-button" />
      <Button icon={<RightCircleOutlined />} onClick={next} className="prev-button" />
    </St.CarouselContainer>
  );
};

export default Carousel;
