export type pathProps = {
  lat: number;
  lon: number;
};

export type PageRoadProps = {
  roadName: string;
};

export type CourseDataResult = {
  crsLevel: string;
  crsCycle: string;
  crsContents: string;
  crsKorNm: string;
  createdtime: string;
  travelerinfo: string;
  crsTourInfo: string;
  crsSummary: string;
  routeIdx: string;
  crsIdx: string;
  crsKorm: string;
  crsDstnc: string;
  crsTotlRqrmHour: string;
  modifiedtime: string;
  sigun: string;
  brdDiv: string;
  gpxpath: string;
};

export type CourseItem = {
  item: CourseDataResult;
};

export type Course = {
  items: {
    item: CourseDataResult[];
  };
  numOfRows: number;
  pageNo: number;
  totalCount: number;
};

export type ResponseCourseList = {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: Course;
  };
};
