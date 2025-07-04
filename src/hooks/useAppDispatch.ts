import { useDispatch } from 'react-redux';
import { AppDispatch } from '../Redux/store';

export const useAppDispatch = () => {
  return useDispatch<AppDispatch>();
};
