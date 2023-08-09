import CourseResult from '../components/courseResult/CourseResult';
import SearchForm from '../components/searchForm/SearchForm';
import ResultMap from '../components/resultMap/ResultMap';

const SearchResult = () => {

  return (
    <main>
      <SearchForm />
      <div style={{ background: '#ddd', width: '100%', height: '300px' }}>지도영역</div>
      <CourseResult />
    </main>
  );
};

export default SearchResult;
