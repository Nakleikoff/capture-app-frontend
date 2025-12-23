import React, { type PropsWithChildren } from 'react';
import styles from './Expandable.module.css';

export type ExpandableSectionProps = PropsWithChildren<{
  header: React.JSX.Element;
}>;

export default function ExpandableSection({
  children,
  header,
}: ExpandableSectionProps) {
  return (
    <details className={styles.expandable}>
      <summary className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.title}>{header}</div>
          <span className={styles.arrow}>▶</span>
        </div>
      </summary>
      <div className={styles.content}>{children}</div>
    </details>
  );
}
