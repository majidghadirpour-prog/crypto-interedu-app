import styles from "./layout.module.css";

function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerPattern} aria-hidden="true">
          <span>Interedu</span>
          <span>Interedu</span>
          <span>Interedu</span>
          <span>Interedu</span>
          <span>Interedu</span>
          <span>Interedu</span>
          <span>Interedu</span>
          <span>Interedu</span>
          <span>Interedu</span>
          <span>Interedu</span>
          <span>Interedu</span>
          <span>Interedu</span>
        </div>
        <div className={styles.headerInner}>
          <a className={styles.brand} href="/" aria-label="Crypto App home">
            <span className={styles.brandMark} aria-hidden="true">
              ₿
            </span>
            <span className={styles.brandCopy}>
              <strong>Crypto App</strong>
              <small>Interedu | Crypto</small>
            </span>
          </a>
          <a className={styles.partnerLink} href="https://www.interedu.com.tr">
            Interedu
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>© 2026 Interedu. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Layout;