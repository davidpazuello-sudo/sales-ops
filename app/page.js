import styles from "./page.module.css";

function MenuIcon() {
  return (
    <div className={styles.hamburger} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

function PanelIcon() {
  return <span className={styles.panelIcon} aria-hidden="true" />;
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.5 6.5L9 12l5.5 5.5" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9.5 6.5L15 12l-5.5 5.5" />
    </svg>
  );
}

function ReportsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 18V10" />
      <path d="M11 18V6" />
      <path d="M17 18V13" />
    </svg>
  );
}

function SellersIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <path d="M4 17c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M14.5 16.5c.5-1.7 2.1-3 4-3 1 0 1.8.3 2.5.8" />
    </svg>
  );
}

function DealsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="6" width="16" height="12" rx="1.5" />
      <path d="M12 6v12" />
      <path d="M4 10h16" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 8.5A3.5 3.5 0 1 0 12 15.5A3.5 3.5 0 1 0 12 8.5z" />
      <path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4 1a8 8 0 0 0-1.7-1l-.4-2.6h-4l-.4 2.6a8 8 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .3 0 .7.1 1l-2 1.5 2 3.4 2.4-1c.5.4 1.1.7 1.7 1l.4 2.6h4l.4-2.6c.6-.2 1.2-.6 1.7-1l2.4 1 2-3.4-2-1.5c.1-.3.1-.7.1-1z" />
    </svg>
  );
}

function CenterUsersIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="25" cy="24" r="10" />
      <path d="M12 46c0-8 5.8-14 13-14s13 6 13 14" />
      <circle cx="42" cy="24" r="10" className={styles.secondaryUser} />
      <path
        d="M29 46c0-8 5.8-14 13-14s13 6 13 14"
        className={styles.secondaryUser}
      />
    </svg>
  );
}

function MenuItem({ icon, label, active = false, extraClassName = "" }) {
  return (
    <button
      type="button"
      className={`${styles.menuItem} ${active ? styles.menuItemActive : ""} ${extraClassName}`.trim()}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export default function HomePage() {
  return (
    <main className={styles.appShell}>
      <header className={styles.topbar}>
        <div className={styles.topbarGroup}>
          <button type="button" className={styles.iconButton} aria-label="Menu">
            <MenuIcon />
          </button>

          <button
            type="button"
            className={styles.iconButton}
            aria-label="Alternar painel"
          >
            <PanelIcon />
          </button>

          <button type="button" className={styles.iconButton} aria-label="Voltar">
            <ChevronLeftIcon />
          </button>

          <button
            type="button"
            className={`${styles.iconButton} ${styles.iconButtonDisabled}`}
            aria-label="Avançar"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </header>

      <aside className={styles.sidebar}>
        <div>
          <div className={styles.brand}>
            <span className={styles.brandPrimary}>SALES</span>
            <span className={styles.brandAccent}>OPS</span>
          </div>

          <nav className={styles.menu} aria-label="Navegação principal">
            <MenuItem icon={<ReportsIcon />} label="Relatórios" />
            <MenuItem icon={<SellersIcon />} label="Vendedores" active />
            <MenuItem icon={<DealsIcon />} label="Negócios" />
          </nav>
        </div>

        <div>
          <MenuItem
            icon={<SettingsIcon />}
            label="Configurações"
            extraClassName={styles.settingsItem}
          />

          <div className={styles.profileCard}>
            <div className={styles.profileAvatar}>?</div>
            <div>
              <div className={styles.profileName}>Usuário</div>
              <div className={styles.profileRole}>Cargo</div>
            </div>
          </div>
        </div>
      </aside>

      <section className={styles.content}>
        <div className={styles.contentPlaceholder}>
          <CenterUsersIcon />
          <span>Vendedores</span>
        </div>
      </section>
    </main>
  );
}
