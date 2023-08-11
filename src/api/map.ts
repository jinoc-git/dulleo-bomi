import axios from 'axios';

export const getFetchGPX = async () => {
  const GPX_URL = `https://www.durunubi.kr/editImgUp.do?filePath=/data/koreamobility/file/2021/09/46e0055b28ac46ea9420106c8939fa61.gpx`;
  console.log(GPX_URL);
  const res = await axios.get(`https://florentine-rustic-open.glitch.me/gpx?data=${GPX_URL}`);
  console.log(res);

  return res.data;
};
