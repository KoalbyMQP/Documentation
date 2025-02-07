import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';

function HeroSection() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <div className={styles.hero}>
      <div className={styles.heroInner}>
        <h1 className={styles.heroTitle}>
          WPI Humanoid Robot <span className={styles.highlight}>MQP</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Advancing the future of robotics through innovative design and intelligent systems
        </p>
        <div className={styles.heroButtons}>
          <Link className={clsx('button', styles.primaryButton)} to="/docs/documentation-tutorial/intro">
            View Documentation
          </Link>
          <Link className={clsx('button', styles.secondaryButton)} to="https://github.com/KoalbyMQP">
            GitHub Repository
          </Link>
        </div>
      </div>
      <div className={styles.heroImage}>
        <img src="/assets/hello.gif" alt="Robot waving hello" className={styles.robotAnimation} />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Layout
      title="WPI Humanoid Robot MQP"
      description="Documentation hub for WPI's Humanoid Robot MQP project">
      <main className={styles.main}>
        <HeroSection />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
