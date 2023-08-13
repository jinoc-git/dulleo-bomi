import React from 'react';
import Layout from '../common/layout/Layout';
import YoutubePlayer from '../youtube/YoutubePlayer';
import * as St from './style';
import Flicking, { ViewportSlot } from '@egjs/react-flicking';
import VIDOO_ID from '../youtube/videoId';
import { nanoid } from 'nanoid';
import { Arrow } from '@egjs/flicking-plugins';
import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/flicking-plugins/dist/arrow.css';

const Carousel = () => {
  const _plugins = [new Arrow()];
  return (
    <St.CarouselContainer>
      <Layout>
        <Flicking panelsPerView={3} align="prev" circular={true} plugins={_plugins}>
          {VIDOO_ID.map((id) => {
            return (
              <div key={nanoid()} style={{ margin: '10px' }}>
                <YoutubePlayer id={id} />
              </div>
            );
          })}
          <ViewportSlot>
            <span className="flicking-arrow-prev"></span>
            <span className="flicking-arrow-next"></span>
          </ViewportSlot>
        </Flicking>
      </Layout>
    </St.CarouselContainer>
  );
};

export default Carousel;
