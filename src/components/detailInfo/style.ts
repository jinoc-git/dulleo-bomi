import { styled } from 'styled-components';
export const InfoContainer = styled.section`
  line-height: 1.6;
`;
export const InfoBox = styled.div`
  display: flex;
`;
export const InfoTitle = styled.h3`
  margin-right: 15px;
`;
export const CourseInfo = styled.ul``;
export const InfoList = styled.li`
  display: flex;
  span {
    font-weight: bold;
    color: #000;
    width: 18%;
    font-size: 1rem;
  }
  p {
    width: 82%;
    font-size: 0.9rem;
  }
  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    span,
    p {
      width: 100%;
    }
  }
`;
