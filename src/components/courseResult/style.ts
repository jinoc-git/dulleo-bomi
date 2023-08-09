import { styled } from 'styled-components';

export const PageTitleH2 = styled.h2``;
export const CourseListContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;
export const CourseBox = styled.div`
  width: calc((100% - 20px) / 2);
  padding: 20px;
  border: solid 1px #ddd;
  border-radius: 15px;
`;
export const CourseName = styled.h4`
  margin-bottom: 15px;
`;
export const CourseLike = styled.div`
  display: inline-flex;
  padding-left: 5px;
  svg {
    filter: invert(74%) sepia(26%) saturate(656%) hue-rotate(143deg) brightness(90%) contrast(87%);
    position: relative;
    top: 3px;
  }
`;
export const CourseInfo = styled.p`
  &:last-child {
    margin-top: 10px;
  }
`;
