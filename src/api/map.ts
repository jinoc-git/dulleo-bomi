import axios from 'axios';
import { pathProps } from '../@types/course/courseType';

export const fetchGPX = async ({ path }: { path: string }): Promise<pathProps[]> => {
  const { data } = await axios.get(`${process.env.REACT_APP_NODE_SERVER}/gpx?data=${path}`);
  return data;
};

export const fetchGPXONE = async ({ path }: { path: string }): Promise<pathProps[]> => {
  const { data } = await axios.get(`${process.env.REACT_APP_NODE_SERVER}/gpxOne?data=${path}`);
  return data;
};
