import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import { ImBook } from "react-icons/im";

const FeatureList = [
  {
    title: 'Speech Recognition',
    description: 'Speech recognition system for real-time voice commands and interaction.',
    tags: ['Python', 'OpenRouter', 'OpenAI Whisper', 'Google Speech-to-Text'],
    repoUrl: 'https://github.com/KoalbyMQP/SpeechRecognition',
    docsUrl: '/speech-recognition',
  },
  {
    title: 'Vision System',
    description: 'Computer vision system for real-time object detection and tracking.',
    tags: ['Python', 'DepthAI', 'Oak-D-Lite'],
    repoUrl: 'https://github.com/KoalbyMQP/VisionSystem',
    docsUrl: '/vision',
  },
  {
    title: 'Locomotion',
    description: 'Motion control system that enables robot movements, including walking, balancing, and object manipulation.',
    tags: ['C++', 'Python'],
    repoUrl: 'https://github.com/KoalbyMQP/Locomotion',
    docsUrl: '/locomotion',
  },
  {
    title: 'Tools',
    description: 'Development and debugging tools for monitoring robot performance, analyzing sensor data, and rapid prototyping.',
    tags: ['Grafana', 'Prometheus', 'Docker'],
    repoUrl: 'https://github.com/KoalbyMQP/Tools',
    docsUrl: '/tools',
  },
];

function Feature({ title, description, tags, index, repoUrl, docsUrl }) {
  const isReverse = index % 2 !== 0;
  return (
    <div className={styles.featureItem}>
      <div className={clsx(styles.featureContainer, { [styles.reverse]: isReverse })}>
        <div className={styles.featureCard}>
          <div className={styles.titleWrapper}>
            <div className={styles.titleGroup}>
              <Heading as="h2">{title}</Heading>
              <span className={styles.arrow}>→</span>
            </div>
            <div className={styles.iconContainer}>
              <a href={repoUrl} target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
                {/* GitHub icon */}
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href={docsUrl} target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
                <ImBook size={24} />
              </a>
            </div>
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
          <Feature key={idx} index={idx} {...props} />
        ))}
      </div>
    </section>
  );
}
