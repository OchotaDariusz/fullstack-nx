import styles from './loading-spinner.module.scss';
import { CircularProgress } from '@mui/material';

/* eslint-disable-next-line */
export interface LoadingSpinnerProps {}

export function LoadingSpinner(props: LoadingSpinnerProps) {
  return (
    <div className={styles['spinner-container']}>
      <CircularProgress />
    </div>
  );
}

export default LoadingSpinner;
