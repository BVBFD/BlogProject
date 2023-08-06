import React from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';

// Next.js에서의 static data fetching, revalidating data, dynamic data fetching은 데이터를 가져오고 업데이트하는 방식에 대한 차이를 나타냅니다. 각각의 방식은 다음과 같은 특징을 가지고 있습니다:

// Static Data Fetching (정적 데이터 가져오기):
// 빌드 시간에 데이터를 불러온 후 정적으로 생성된 페이지에 직접 포함됩니다.
// 서버 측에서 데이터를 불러오고 페이지를 사전 렌더링하여 클라이언트에게 전송합니다.
// 페이지가 렌더링되는 동안 데이터는 변경되지 않습니다.
// 예를 들어, 정적 블로그 포스트, 제품 목록 등과 같이 변경이 자주 발생하지 않는 데이터에 사용됩니다.

// Revalidating Data (데이터 재검증):
// 빌드 시간에 데이터를 불러온 후 사전 렌더링된 페이지에 포함됩니다.
// 일정 시간이 경과한 후에 데이터를 다시 가져와 갱신합니다.
// 클라이언트에서 캐시된 데이터를 사용하며, 데이터가 유효하지 않으면 서버에서 새로운 데이터를 가져옵니다.
// 변경이 적지만 일정 시간 후에 갱신해야 하는 데이터에 유용합니다.
// 예를 들어, 인기 상품 목록, 뉴스 헤드라인 등이 포함될 수 있습니다.

// Dynamic Data Fetching (동적 데이터 가져오기):
// 요청 시간에 클라이언트 측에서 데이터를 가져옵니다.
// 페이지가 렌더링되기 전에 데이터가 존재하지 않을 수 있으며, 데이터가 필요한 시점에 요청됩니다.
// 사용자에 따라 다른 데이터를 반환하거나, 인터랙션에 따라 동적으로 데이터를 업데이트합니다.
// 예를 들어, 사용자의 프로필 정보, 사용자가 선택한 필터에 따른 검색 결과 등이 동적 데이터에 해당합니다.

async function getData() {
  const res = await fetch('http://localhost:3000/api/posts', {
    // cache: 'force-cache',
    // next: { revalidate: 10 },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const Blog = async () => {
  const data = await getData();
  console.log(data);

  return (
    <div className={styles.mainContainer}>
      {data.map((item) => (
        <Link
          href={`/blog/${item._id}`}
          className={styles.container}
          key={item.id}
        >
          <div className={styles.imageContainer}>
            <Image
              src={item.img}
              alt=''
              width={400}
              height={250}
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>{item.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Blog;
