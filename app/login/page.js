"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function LoginPage() {
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    router.push("/");
  }

  return (
    <main className={styles.loginShell}>
      <section className={styles.formPanel}>
        <div className={styles.formCard}>
          <span className={styles.cardEyebrow}>ACESSO</span>
          <h1>Entrar na sua conta</h1>
          <p>Use seu email corporativo para acessar o workspace do SalesOps.</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.field}>
              <span>Email</span>
              <input type="email" placeholder="voce@empresa.com" />
            </label>

            <label className={styles.field}>
              <span>Senha</span>
              <input type="password" placeholder="Digite sua senha" />
            </label>

            <div className={styles.formMeta}>
              <label className={styles.checkboxRow}>
                <input type="checkbox" />
                <span>Manter conectado</span>
              </label>
              <button type="button" className={styles.inlineAction}>
                Esqueci minha senha
              </button>
            </div>

            <button type="submit" className={styles.primaryButton}>
              Entrar
            </button>
          </form>

          <div className={styles.divider}>
            <span>ou continue com</span>
          </div>

          <div className={styles.secondaryActions}>
            <a
              className={styles.secondaryButton}
              href="https://accounts.google.com/AccountChooser"
              target="_self"
              rel="noreferrer"
            >
              Google
            </a>
          </div>

          <div className={styles.footerNote}>
            <span>Novo por aqui?</span>
            <button type="button" className={styles.inlineAction}>
              Solicitar acesso
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
