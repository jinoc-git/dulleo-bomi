import React from 'react';
import Layout from '../common/layout/Layout';
import YoutubePlayer from '../youtube/YoutubePlayer';
import * as St from './style';
import Flicking, { ViewportSlot } from '@egjs/react-flicking';
import VIDOO_ID from '../youtube/videoId';
import { nanoid } from 'nanoid';
import '@egjs/react-flicking/dist/flicking.css';
import { Arrow } from '@egjs/flicking-plugins';
import '@egjs/flicking-plugins/dist/arrow.css';

const Carousel = () => {
  const _plugins = [new Arrow()];
  console.log(_plugins);
  return (
    <St.SwiperContainer>
      <Layout>
        <>
          <Flicking panelsPerView={3} align="prev" circular={true} plugins={_plugins}>
            {VIDOO_ID.map((id) => {
              return (
                <div key={nanoid()} style={{margin: '10px'}}>
                  <YoutubePlayer id={id} />
                </div>
              );
            })}
            <ViewportSlot>
              <span className="flicking-arrow-prev is-circle"></span>
              <span className="flicking-arrow-next is-circle"></span>
            </ViewportSlot>
          </Flicking>
        </>
      </Layout>
    </St.SwiperContainer>
  );
};

export default Carousel;
