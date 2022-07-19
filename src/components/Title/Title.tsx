import { FC } from "react";

import styles from './Title.module.scss';

const Title: FC = () => {
  return (
      <h1 className={styles.title}>GitHub Searcher</h1>
  );
};

export default Title;