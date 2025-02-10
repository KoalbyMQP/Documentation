import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import { BsBoxArrowUpRight } from "react-icons/bs";
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
          WPI Humanoid Robot MQP Project Documentation Hub
        </p>
        <div className={styles.heroButtons}>
          <Link className={clsx('button', styles.primaryButton)} to="/documentation-tutorial">
            Documentation writing guide
          </Link>
          <Link
            className={clsx('button', styles.secondaryButton)}
            to="https://github.com/orgs/KoalbyMQP/repositories">
            Project's GitHub
          </Link>
        </div>
        <div className={styles.cmsLink}>
          <a href="/admin">
            <span className={styles.cmsText}>Write documentation with Decap CMS</span>
            <BsBoxArrowUpRight className={styles.arrow} />
          </a>
        </div>
      </div>
      <div className={styles.heroImage}>
        <video autoPlay loop muted playsInline className={styles.robotAnimation}>
          <source src="/assets/hello.webm" type="video/webm" />
          <source src="/assets/hello.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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
