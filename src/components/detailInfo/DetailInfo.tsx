import { CourseDataResult } from '../../@types/course/courseType';
import { Typography } from 'antd';
import Like from '../like/Like';
import * as St from './style';

const { Paragraph } = Typography;

const DetailInfo = ({ courseData }: { courseData: CourseDataResult }) => {
  const {
    crsTotlRqrmHour,
    crsContents,
    crsTourInfo,
    crsKorNm,
    crsIdx,
    sigun,
    crsLevel,
    crsDstnc,
    brdDiv,
  } = courseData;

  const hour = Math.floor(Number(crsTotlRqrmHour) / 60);
  const min = Number(crsTotlRqrmHour) % 60;

  const fixedCrsContents = crsContents.replace(/\-/g, '');

  const fixedCrsTourInfoArr: string = crsTourInfo
    .replace(/[<br>]/g, '')
    .split('-')
    .join('');

  return (
    <St.InfoContainer>
      <St.InfoBox>
        <St.InfoTitle>{crsKorNm}</St.InfoTitle>
        <Like crsName={crsKorNm} crsId={crsIdx} />
      </St.InfoBox>

      <Paragraph>
        <blockquote>
          <St.CourseInfo>
            <St.InfoList>
              <span>코스 정보 </span>
              <p>{fixedCrsContents}</p>
            </St.InfoList>
            <St.InfoList>
              <span>위치 </span>
              <p>{sigun}</p>
            </St.InfoList>
            <St.InfoList>
              <span>난이도 </span>
              <p>{'⭐️'.repeat(Number(crsLevel))}</p>
            </St.InfoList>
            <St.InfoList>
              <span>관광포인트</span>
              <p>{fixedCrsTourInfoArr}</p>
            </St.InfoList>
            <St.InfoList>
              <span>코스길이 </span> <p>{crsDstnc}km</p>
            </St.InfoList>
            <St.InfoList>
              <span>총 소요시간 </span> <p>{min > 0 ? `${hour}시간 ${min}분` : `${hour}시간`}</p>
            </St.InfoList>
            <St.InfoList>
              <span>걷기 / 자전거 구분 </span> <p>{brdDiv == 'DNWW' ? '걷기길' : '자전거길'}</p>
            </St.InfoList>
          </St.CourseInfo>
        </blockquote>
      </Paragraph>
    </St.InfoContainer>
  );
};
export default DetailInfo;
