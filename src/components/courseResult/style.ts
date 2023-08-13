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
  cursor: pointer;
`;
export const CourseTitBox = styled.div`
  display: flex;
  margin-bottom: 15px;
`;
export const CourseName = styled.h4`
  padding: 5px 10px 5px 0;
  line-height: 26px;
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
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  max-height: 2.8em;
  line-height: 1.4em;
  &:last-child {
    margin-top: 10px;
  }
`;
