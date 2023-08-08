import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import MyPage from '../pages/MyPage';
import Detail from '../pages/Detail';
import SearchResult from '../pages/SearchResult';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const Router = () => {
  return (
    <BrowserRouter>
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
