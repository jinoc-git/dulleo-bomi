import { figmaSvg, githubSvg, notionSvg } from '../../assets';
import Layout from '../common/layout/Layout';
import * as St from './style';

const Footer = () => {
  return (
    <St.ContainerFooter>
      <Layout>
        <St.FootInfoBox>
          <span className="svgIcon">
            <a href="https://github.com/jinoc-git/dulleo-bomi" target="_blank">
              <img src={githubSvg} alt="" />
            </a>
          </span>
          <span className="svgIcon">
            <a href="https://familiar-beat-d02.notion.site/d057779341f94f5d92d1105cbcccabe4?pvs=4" target="_blank">
              <img src={notionSvg} alt="" />
            </a>
          </span>
          <span>
            <a href="https://www.figma.com/file/9O3lls9ArKNhiSOSLAZvqc/%EB%91%98%EB%9F%AC%EB%B3%B4%EB%AF%B8?type=design&node-id=0-1&mode=design&t=S9QzKkmfQS48nutt-0" target="_blank">
              <img src={figmaSvg} alt="" />
            </a>
          </span>
        </St.FootInfoBox>
        <St.FootTitle>내일배움캠프 React 6 </St.FootTitle>
        <St.FootText>&copy; 2023 NBC Dulleo-Bomi All rights reserved</St.FootText>
        <St.FootText>노진철 | 양현서 | 유희정 | 양지원 | 송현섭</St.FootText>
      </Layout>
    </St.ContainerFooter>
  );
};

export default Footer;
