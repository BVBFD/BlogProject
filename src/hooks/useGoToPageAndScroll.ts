import { RootState } from '@/redux/sliceStore';
import { useSelector } from 'react-redux';

const useGoToPageAndScroll = () => {
  const { postClientY } = useSelector((state: RootState) => state);

  const goToPageAndScroll = async () => {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 30);
    });
    window.scrollTo({ top: postClientY, behavior: 'auto' as ScrollBehavior });
  };

  return { goToPageAndScroll };
};

export default useGoToPageAndScroll;
