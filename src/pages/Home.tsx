import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '../components/header/Header';
import Banner from '../components/banner/Banner';

const Home = () => {

  return (
    <>
      <Header />
      <Banner />
    </>
  );
};

export default Home;
