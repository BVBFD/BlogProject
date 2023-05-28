import Link from 'next/link';
import styles from '../../styles/about/index.module.scss';

interface AboutPropsType {
  ps: {
    imgSrc: string;
    linkHref: string;
  };
}

const About = ({ ps }: AboutPropsType) => {
  return (
    <section className={styles.about}>
      <header className={styles.pageTitle}>About</header>
      <div className={styles.aboutIntroBox}>
        <div className={styles.imgBox}>
          <img alt="" height={300} src={ps.imgSrc} width={300} />
        </div>
        <div className={styles.aboutExplainBox}>
          <header>This Blog is ...</header>
          <p>
            This Blog is my final goal of learning programming language.
            <br />
            <br />
            I think craeting new blog website just by my self is the standard of IT skills to get used to working on the
            field for customers.
            <br />
            <br />I am always trying to keep up with new skills trends.
          </p>
          <Link href={ps.linkHref} passHref target="_blank">
            <button type="button">Visit Profile</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;

export const getStaticProps = async () => {
  return {
    props: {
      ps: {
        imgSrc: 'https://res.cloudinary.com/dewa3t2gi/image/upload/v1675172408/a1pdcxclbrvilga2cebl.gif',
        linkHref: 'https://bvbfd.github.io/CSS-JS-Animation-Effects-Collection/',
      },
    },
  };
};
