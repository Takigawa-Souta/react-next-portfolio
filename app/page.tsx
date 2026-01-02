import styles from './page.module.css';
import Link from "next/link";

export default function Home() {
  return(
    <div className={styles.bookCover}>
      <div className={styles.coverContent}>
        <h1 className={styles.title}>My Portfolio</h1>
        <p className={styles.subtitle}>知識と経験の記録</p>
        
        <nav className={styles.coverNav}>
          <Link href="/about" className={styles.coverLink}>
            <span className={styles.linkIcon}>📖</span>
            <span className={styles.linkText}>自己紹介</span>
          </Link>
          <Link href="/blog" className={styles.coverLink}>
            <span className={styles.linkIcon}>✍️</span>
            <span className={styles.linkText}>ブログ</span>
          </Link>
          <Link href="/portfolio" className={styles.coverLink}>
            <span className={styles.linkIcon}>💼</span>
            <span className={styles.linkText}>作品・スキル</span>
          </Link>
          <Link href="/bookmarks" className={styles.coverLink}>
            <span className={styles.linkIcon}>🔖</span>
            <span className={styles.linkText}>みんなのしおり</span>
          </Link>
          <Link href="/contact" className={styles.coverLink}>
            <span className={styles.linkIcon}>✉️</span>
            <span className={styles.linkText}>お問い合わせ</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}