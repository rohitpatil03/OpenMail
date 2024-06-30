import { useDispatch } from 'react-redux';
import { setUsername, setData, setLoading } from '../redux/reducers/reducers';
import axios from 'axios';



export const useFetchUserData = () => {
    const dispatch = useDispatch();
  
    const fetchUserData = async () => {
      try {
        const response = await axios(`${import.meta.env.VITE_BASE_URL}/auth/user`, { withCredentials: true });
        const res = await response.data;
        dispatch(setUsername(res.username));
      } catch (error) {
        console.log(error)     
      } finally {
        dispatch(setLoading(false));
      }
    };
  
    return fetchUserData;
  };
  
  
  