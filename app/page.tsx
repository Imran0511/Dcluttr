import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>
        <Dashboard />
      </main>
    </div>
  );
}
