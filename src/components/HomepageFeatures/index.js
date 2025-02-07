import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Vision System',
    icon: '🔍',
    description: (
      <>
        Computer vision
      </>
    ),
  },
  {
    title: 'Motion Control',
    icon: '⚡',
    description: (
      <>
        Locomotion
      </>
    ),
  },
  {
    title: 'Tools',
    icon: '🛠️',
    description: (
      <>
        Development tools
      </>
    ),
  },
];

function Feature({icon, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.iconWrapper}>
          <span className={styles.featureIcon}>{icon}</span>
        </div>
        <div className={styles.featureContent}>
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresHeader}>
          <Heading as="h2">Features</Heading>
          <p>Features of the robot</p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
