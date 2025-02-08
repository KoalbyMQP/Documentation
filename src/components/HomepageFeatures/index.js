import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Speech Recognition',
    description: 'Speech recognition system for real-time voice commands and interaction.',
    tags: ['Python', 'OpenRouter', 'OpenAI Whisper', 'Google Speech-to-Text'],
  },
  {
    title: 'Vision System',
    description: 'Computer vision system for real-time object detection and tracking.',
    tags: ['Python', 'DepthAI', 'Oak-D-Lite'],
  },
  {
    title: 'Locomotion',
    description: 'Motion control system that enables robot movements, including walking, balancing, and object manipulation.',
    tags: ['C++', 'Python'],
  },
  {
    title: 'Tools',
    description: 'Development and debugging tools for monitoring robot performance, analyzing sensor data, and rapid prototyping.',
    tags: ['Grafana', 'Prometheus', 'Docker'],
  },
];

function Feature({ title, description, tags, index }) {
  const isReverse = index % 2 !== 0;
  return (
    <div className={styles.featureItem}>
      <div className={clsx(styles.featureContainer, { [styles.reverse]: isReverse })}>
        <div className={styles.featureCard}>
          <div className={styles.titleWrapper}>
            <Heading as="h3">{title}</Heading>
            <span className={styles.arrow}>→</span>
          </div>
          <p>{description}</p>
          <div className={styles.tagContainer}>
            {tags.map((tag, idx) => (
              <span key={idx} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className={styles.featuresGrid}>
        {FeatureList.map((props, idx) => (
          <Feature key={idx} {...props} index={idx} />
        ))}
      </div>
    </section>
  );
}
