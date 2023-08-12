import Youtube, { YouTubeProps } from 'react-youtube';

type YoutubeType = {
  id: string;
};

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

  return <Youtube opts={opts} videoId={id} />;
};

export default YoutubePlayer;
