import styles from "./page.module.css";

const trustItems = [
  "Diagnóstico comercial assistido por IA",
  "Sincronização segura com CRM e automações",
  "Governança de acesso para times de receita",
];

export const metadata = {
  title: "Login | SalesOps",
  description: "Acesse a plataforma SalesOps",
};

export default function LoginPage() {
  return (
    <main className={styles.loginShell}>
      <section className={styles.heroPanel}>
        <div className={styles.brandRow}>
          <span className={styles.logoDark}>SALES</span>
          <span className={styles.logoAccent}>OPS</span>
        </div>

        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>PLATAFORMA DE OPERAÇÕES COMERCIAIS</span>
          <h1>Acompanhe pipeline, performance e sinais de risco em um só lugar.</h1>
          <p>
            Uma entrada elegante para a mesma experiência do sistema: objetiva,
            confiável e pronta para escalar com seu time.
          </p>
        </div>

        <div className={styles.signalCard}>
          <div className={styles.signalHeader}>
            <span className={styles.signalDot} />
            <strong>Ambiente monitorado</strong>
          </div>
          <div className={styles.signalGrid}>
            <article>
              <span>Uptime</span>
              <strong>99.9%</strong>
            </article>
            <article>
              <span>Sync CRM</span>
              <strong>Ativo</strong>
            </article>
            <article>
              <span>Alertas</span>
              <strong>Em tempo real</strong>
            </article>
          </div>
        </div>

        <ul className={styles.trustList}>
          {trustItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.formPanel}>
        <div className={styles.formCard}>
          <span className={styles.cardEyebrow}>ACESSO</span>
          <h2>Entrar na sua conta</h2>
          <p>
            Use seu email corporativo para acessar o workspace do SalesOps.
          </p>

          <form className={styles.form}>
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
            <button type="button" className={styles.secondaryButton}>
              Google
            </button>
            <button type="button" className={styles.secondaryButton}>
              Microsoft
            </button>
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
