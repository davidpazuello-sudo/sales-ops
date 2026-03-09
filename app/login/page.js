"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const qrCells = [
  "111111100011111",
  "100000100010001",
  "101110100111101",
  "101110100100101",
  "101110100111101",
  "100000100010001",
  "111111101011111",
  "000000001000000",
  "111011111110111",
  "001010001010100",
  "111110111011111",
  "100010100010001",
  "101110111110101",
  "100000100010001",
  "111111101111111",
];

export default function LoginPage() {
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    router.push("/");
  }

  return (
    <main className={styles.loginShell}>
      <div className={styles.brandMark}>
        <span className={styles.logoDark}>SALES</span>
        <span className={styles.logoAccent}>OPS</span>
      </div>

      <div className={styles.loginCard}>
        <section className={styles.formSide}>
          <div className={styles.welcomeBlock}>
            <h1>Boas-vindas de volta!</h1>
            <p>Estamos muito animados em te ver novamente!</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.field}>
              <span>Email corporativo</span>
              <input type="email" placeholder="voce@empresa.com" />
            </label>

            <label className={styles.field}>
              <span>Senha</span>
              <input type="password" placeholder="Digite sua senha" />
            </label>

            <button type="button" className={styles.inlineAction}>
              Esqueceu sua senha?
            </button>

            <button type="submit" className={styles.primaryButton}>
              Entrar
            </button>
          </form>

          <div className={styles.footerNote}>
            <span>Precisando de uma conta?</span>
            <button type="button" className={styles.inlineAction}>
              Solicitar acesso
            </button>
          </div>
        </section>

        <section className={styles.qrSide}>
          <div className={styles.qrFrame} aria-hidden="true">
            <div className={styles.qrGrid}>
              {qrCells.join("").split("").map((cell, index) => (
                <span
                  key={index}
                  className={cell === "1" ? styles.qrCellDark : styles.qrCellLight}
                />
              ))}
            </div>
            <div className={styles.qrCenterBadge}>SO</div>
          </div>

          <div className={styles.qrCopy}>
            <h2>Entrar com Google</h2>
            <p>
              Abra o seletor de contas do navegador para continuar o acesso de
              forma r&aacute;pida.
            </p>
          </div>

          <a
            className={styles.secondaryButton}
            href="https://accounts.google.com/AccountChooser"
            target="_self"
            rel="noreferrer"
          >
            Continuar com Google
          </a>
        </section>
      </div>
    </main>
  );
}
