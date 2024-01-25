import React, { useEffect, useRef, useState } from 'react';
import Layout from '../common/layout/Layout';
import YoutubePlayer from '../youtube/YoutubePlayer';
import * as St from './style';
import Flicking from '@egjs/react-flicking';
import VIDOO_ID from '../youtube/videoId';
import { nanoid } from 'nanoid';
import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/flicking-plugins/dist/arrow.css';
import { Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import useThrottle from '../../hooks/useThrottle';

let moving = false;

const Carousel = () => {
  const [panelsPerView, setPanelsPerView] = useState(3);
  const handleResize = useThrottle(() => updatePanelsPerView(), 200);
  const flickingRef = useRef<Flicking>(null);

  const next = async () => {
    if (moving) return;
    if (flickingRef.current !== null) {
      await flickingRef.current.next();
    }
  };

  const updatePanelsPerView = () => {
    if (flickingRef.current) {
      const viewportWidth = window.innerWidth;
      let panelCount = 3;

      if (viewportWidth < 768) panelCount = 1;
      else if (viewportWidth < 1024) panelCount = 2;

      setPanelsPerView(panelCount);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout>
      <St.CarouselContainer>
        <Flicking
          panelsPerView={panelsPerView}
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
        <Button icon={<RightOutlined />} onClick={next} className="next-button" />
      </St.CarouselContainer>
    </Layout>
  );
};

export default Carousel;
