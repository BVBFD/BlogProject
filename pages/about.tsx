import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/About.module.css';

const About = () => {
  return (
    <section className={styles.about}>
      <header className={styles.pageTitle}>About</header>
      <div className={styles.aboutIntroBox}>
        <div className={styles.imgBox}>
          <Image src='/imgs/charina.gif' alt='' width={300} height={300} />
        </div>
        <div className={styles.aboutExplainBox}>
          <header>This Blog is ...</header>
          <p>
            This Blog is my final goal of learning programming language.
            <br />
            <br />
            I think craeting new blog website just by my self is the standard of
            IT Job seekers' skills to get used to working on the field for my
            customers.
            <br />
            <br />I am always trying to keep up with new skills trends.
          </p>
          <Link
            href='https://bvbfd.github.io/Portfolio-Website-ver2.0/'
            target='_blank'
            passHref
          >
            <button>Visit Profile</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
