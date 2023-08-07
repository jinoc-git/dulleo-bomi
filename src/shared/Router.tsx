import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import MyPage from '../pages/MyPage';
import Detail from '../pages/Detail';
import SearchResult from '../pages/SearchResult';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/result" element={<SearchResult />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
