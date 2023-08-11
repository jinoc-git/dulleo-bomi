import React from 'react';
import Youtube, { YouTubeProps } from 'react-youtube';

type YoutubeType = {
  id: string;
};

// const style: YouTubeProps['style'] = {
//   position: 'absolute',
//   width: '100%',
//   height: '100%',
//   top: 0,
//   left: 0,
// };

const opts: YouTubeProps['opts'] = {
  width: '100%',
  height: '200px',
  playerVar: {
    autoPlay: 0,
    rel: 0,
    modestbranding: 1,
  },
};

const YoutubePlayer = ({ id }: YoutubeType) => {
  const onPlayerReady: YouTubeProps['onReady'] = (e) => {};
  console.log('1111')
  return <Youtube opts={opts} videoId={id} />;
};

export default YoutubePlayer;
