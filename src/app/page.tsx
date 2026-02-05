import LoginForm from "@/components/LoginForm";
import styles from "./page.module.css";

export default function Login() {
  return (
    <main className={styles.main}>
      <div className={styles.background}></div>
      <LoginForm />
    </main>
  );
}
