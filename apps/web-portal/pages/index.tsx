import Link from 'next/link';
import styles from './index.module.css';

export function Index() {
  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>
              <span> Hello there, </span>
              Welcome to admin portal 👋
            </h1>
          </div>

          <div id="hero" className="rounded">
            <div className="text-container">
              <Link href="/login">To Login Page</Link>
              <span> </span>
              <Link href="/call-center">To Call Center</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
