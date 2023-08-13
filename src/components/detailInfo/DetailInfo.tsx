import { CourseDataResult } from '../../@types/course/courseType';
import { Typography } from 'antd';
import Like from '../like/Like';
import * as St from './style';

const { Title, Paragraph } = Typography;

const DetailInfo = ({ state }: { state: CourseDataResult }) => {
  const propsData = state;

  const hour = Math.floor(Number(propsData.crsTotlRqrmHour) / 60);
  const min = Number(propsData.crsTotlRqrmHour) % 60;

  const fixedCrsContents = propsData.crsContents.replace(/\-/g, '');

  const fixedCrsTourInfoArr: string = propsData.crsTourInfo
    .replace(/[<br>]/g, '')
    .split('-')
    .join('');

  return (
    <St.InfoContainer>
      <Typography>
        <Title level={3}>{propsData.crsKorNm}</Title>
      </Typography>
      <Like crsName={propsData.crsKorNm} crsId={propsData.crsIdx} />
      <Paragraph>
        <blockquote>
          <St.CourseInfo>
            <St.InfoList>
              <span>코스 정보 </span>
              <p>{fixedCrsContents}</p>
            </St.InfoList>
            <St.InfoList>
              <span>위치 </span>
              <p>{propsData.sigun}</p>
            </St.InfoList>
            <St.InfoList>
              <span>난이도 </span>
              <p>{'⭐️'.repeat(Number(propsData.crsLevel))}</p>
            </St.InfoList>
            <St.InfoList>
              <span>관광포인트</span>
              <p>{fixedCrsTourInfoArr}</p>
            </St.InfoList>
            <St.InfoList>
              <span>코스길이 </span> <p>{propsData.crsDstnc}km</p>
            </St.InfoList>
            <St.InfoList>
              <span>총 소요시간 </span> <p>{min > 0 ? `${hour}시간 ${min}분` : `${hour}시간`}</p>
            </St.InfoList>
            <St.InfoList>
              <span>걷기 / 자전거 구분 </span>{' '}
              <p>{propsData.brdDiv == 'DNWW' ? '걷기길' : '자전거길'}</p>
            </St.InfoList>
          </St.CourseInfo>
        </blockquote>
      </Paragraph>
    </St.InfoContainer>
  );
};
export default DetailInfo;
