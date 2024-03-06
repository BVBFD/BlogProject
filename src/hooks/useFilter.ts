import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCatName } from '@/redux/catNameSlice';
import { setCurrentPage } from '@/redux/currentPageNumSlice';
import { setPaginationTotalNum } from '@/redux/paginationTotalNumSlice';
import { setFalse, setTrue } from '@/redux/searchTextBolSlice';
import { setSearchText } from '@/redux/searchTextStringSlice';
import { RootState } from '@/redux/sliceStore';

const useFilter = () => {
  const { currentPageNum, searchTextBol } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const handleTotal = useCallback(() => {
    dispatch(setSearchText(''));
    dispatch(setCatName(''));
    dispatch(setCurrentPage(1));
  }, []);

  const handleCatName = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setPaginationTotalNum(0));
    dispatch(setCurrentPage(1));
    dispatch(setSearchText(''));
    dispatch(setCatName(e.currentTarget.innerText));
  }, []);

  const handleSearchText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, error: Error) => {
      dispatch(setPaginationTotalNum(0));
      dispatch(setCurrentPage(1));
      dispatch(setTrue());
      dispatch(setSearchText(e.target.value));

      if (e.target.value === '') {
        dispatch(setFalse());
      }
      if (currentPageNum === 1) {
        dispatch(setTrue());
      }
      if (error) {
        dispatch(setTrue());
      }

      dispatch(setFalse());
    },
    [searchTextBol, handleTotal]
  );

  return { handleTotal, handleCatName, handleSearchText };
};

export default useFilter;
