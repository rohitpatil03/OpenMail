import { useDispatch } from 'react-redux';
import { setUsername, setData, setLoading } from '../redux/reducers/reducers';
import axios from 'axios';

import { useFetchUserData } from './fetchUserData';


export const useFetchEmailData = () => {
  const dispatch = useDispatch();
  const fetchUserData = useFetchUserData()

  const fetchEmailData = async () => {
    try {
      const response = await axios(`${import.meta.env.VITE_BASE_URL}/receive/mail`, { withCredentials: true });
      const res = await response.data;
      fetchUserData();
      dispatch(setData(res));
      
    } catch (error) {
      console.log(error)     
    } finally {
      dispatch(setLoading(false));
    }
  };

  return fetchEmailData;
};
