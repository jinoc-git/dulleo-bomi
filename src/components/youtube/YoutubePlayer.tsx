import Youtube, { YouTubeProps } from 'react-youtube';

type YoutubeType = {
  id: string;
};

const opts: YouTubeProps['opts'] = {
  width: '100%',
  height: '200px',
  playerVars: {
    fs: 1,
    controls: 0,
    playsinline: 0,
    enablejsapi: 0,
    modestbranding: 1,
    disablekb: 1,
    autohide: 1,
    autoplay: 0,
    loop: 0,
    volume: 0,
    iv_load_policy: 3,
    origin: window.location.origin,
    widget_referrer : window.location.href
  }
};

const YoutubePlayer = ({ id }: YoutubeType) => {
  const onPlayerReady: YouTubeProps['onReady'] = (e) => {};
  return <Youtube opts={opts} videoId={id} />;
};

export default YoutubePlayer;
