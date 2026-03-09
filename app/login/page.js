"use client";

import { useState } from "react";
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
  const [requestMode, setRequestMode] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    router.push("/");
  }

  function handleRequestAccess(event) {
    event.preventDefault();
    setRequestMode(false);
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
            <h1>{requestMode ? "Solicitar acesso" : "Boas-vindas de volta!"}</h1>
            <p>
              {requestMode
                ? "Informe seu email corporativo para pedir acesso ao workspace do SalesOps."
                : "Estamos muito animados em te ver novamente!"}
            </p>
          </div>

          {requestMode ? (
            <>
              <form className={styles.form} onSubmit={handleRequestAccess}>
                <label className={styles.field}>
                  <span>Email corporativo</span>
                  <input type="email" placeholder="voce@empresa.com" />
                </label>

                <button type="submit" className={styles.primaryButton}>
                  Enviar solicitacao
                </button>
              </form>

              <div className={styles.footerNote}>
                <span>Ja tem uma conta?</span>
                <button
                  type="button"
                  className={styles.inlineAction}
                  onClick={() => setRequestMode(false)}
                >
                  Voltar para login
                </button>
              </div>
            </>
          ) : (
            <>
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
                <button
                  type="button"
                  className={styles.inlineAction}
                  onClick={() => setRequestMode(true)}
                >
                  Solicitar acesso
                </button>
              </div>
            </>
          )}
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
