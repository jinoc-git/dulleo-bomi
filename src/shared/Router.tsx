import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Detail from '../pages/Detail';
import Home from '../pages/Home';
import MyPage from '../pages/MyPage';
import SearchResult from '../pages/SearchResult';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ScrollToTop from '../utils/ScrollToTop';

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/result" element={<SearchResult />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
