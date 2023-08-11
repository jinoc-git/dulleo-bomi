import { useLocation, useParams } from 'react-router-dom';
import * as St from './style';
import axios from 'axios';
import { Course } from '../../@types/course/courseType';
import Like from '../like/Like';

const DetailInfo = ({ state }: { state: Course }) => {
  const param = useParams();
  // console.log(param.id);
  const COURSE_URL = `https://apis.data.go.kr/B551011/Durunubi/courseList?serviceKey=${process.env.REACT_APP_DURUNUBI_API_TOKKEN}&numOfRows=30&pageNo=1&MobileOS=ETC&MobileApp=TestApp&_type=json&`;

  const fetchItem = async () => {
    const response = await axios.get<Course>(`${COURSE_URL}&crsId=${param.id}`);
    // console.log(response);
  };
  fetchItem();

  return (
    <div>
      <Like />
      <div>XX 코스 | 좋아요 수</div>
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
