import React, { useEffect, useState } from 'react';
import { Spin as Spinner } from 'antd';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import { useRouter } from 'next/router';

const Spin = () => {
  const [spinning, setSpinning] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const start = () => {
      setSpinning(true);
    };
    const end = () => {
      setSpinning(false);
    };

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);
    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <div>
      {spinning && (
        <>
          <div aria-label="advertisement" className="bg-[#fff] bg-opacity-50 fixed inset-0 z-[1010]" />
          <div className="fixed top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] flex flex-col z-[2000]  ">
            <Spinner indicator={<LoadingOutlined style={{ fontSize: 40 }} />} />
          </div>
        </>
      )}
    </div>
  );
};

export default Spin;
