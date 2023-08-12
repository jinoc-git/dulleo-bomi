import * as St from './style';
import { CourseItem } from '../../@types/course/courseType';
import Like from '../like/Like';

const DetailInfo = ({ state }: { state: CourseItem }) => {
  const propsData = state;

  console.log(propsData);
  console.log(propsData.item.crsKorNm);

  return (
    <div>
      <Like />
      <div>{propsData.item.crsKorNm} 코스 | 좋아요 수</div>
      <div>
        <ul>
          <li>
            <span></span>
          </li>
          <li>
            <span></span>
          </li>
          <li>
            <span></span>
          </li>
          <li>
            <span></span>
          </li>
          <li>
            <span></span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DetailInfo;
