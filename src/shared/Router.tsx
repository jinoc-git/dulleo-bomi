import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import ScrollToTop from '../utils/ScrollToTop';
import { Suspense, lazy } from 'react';

const Home = lazy(async () => await import('../pages/Home'));
const SignIn = lazy(async () => await import('../pages/SignIn'));
const SignUp = lazy(async () => await import('../pages/SignUp'));
const MyPage = lazy(async () => await import('../pages/MyPage'));
const Detail = lazy(async () => await import('../pages/Detail'));
const SearchResult = lazy(async () => await import('../pages/SearchResult'));
const ErrorPage = lazy(async () => await import('../components/common/errorPage/ErrorPage'));

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Suspense>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/result" element={<SearchResult />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
