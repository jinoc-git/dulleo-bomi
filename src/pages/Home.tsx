import React from 'react';
import { aa } from '../api/course';
import { useQuery } from '@tanstack/react-query';
import Header from '../components/header/Header';
import Banner from '../components/banner/Banner';

const Home = () => {
  const { data } = useQuery(['data'], aa);
  if (data) {
    console.log(data);
  }
  return (
    <>
      <Header />
      <Banner />
    </>
  );
};

export default Home;
