"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const navItems = [
  { id: "reports", label: "Relatórios" },
  { id: "sellers", label: "Vendedores" },
  { id: "deals", label: "Negócios" },
];

const topMenuItems = ["Arquivo", "Editar", "Visualizar", "Ajuda"];

const suggestedPrompts = [
  "Quais negócios estão com maior risco de estagnação?",
  "Resuma as falhas recentes na integração com HubSpot.",
  "Mostre alertas que exigem ação do gestor hoje.",
  "Quais vendedores precisam de coaching imediato?",
];

const historyItems = [
  "Quais indicadores saíram da meta esta semana?",
  "Resuma os gargalos do pipeline por squad.",
  "Existe risco de perda em contas enterprise?",
];

const initialMessages = [
  {
    id: 1,
    role: "assistant",
    text: "Sou o agente de IA do SalesOps. Posso analisar o sistema respeitando o seu perfil e mostrar apenas os dados permitidos para o seu acesso.",
  },
  {
    id: 2,
    role: "assistant",
    text: "Escolha uma sugestão ou escreva uma pergunta para começar a análise.",
  },
];

function MenuIcon() {
  return <div className={styles.hamburger} aria-hidden="true"><span /><span /><span /></div>;
}

function PanelsIcon() {
  return <span className={styles.panelsIcon} aria-hidden="true" />;
}

function SimpleArrow({ right = false }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={right ? "M9.5 6.5L15 12l-5.5 5.5" : "M14.5 6.5L9 12l5.5 5.5"} />
    </svg>
  );
}

function ChevronSmallIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 7V5.8A1.8 1.8 0 0 0 12.2 4H6.8A1.8 1.8 0 0 0 5 5.8v12.4A1.8 1.8 0 0 0 6.8 20h5.4a1.8 1.8 0 0 0 1.8-1.8V17" />
      <path d="M10 12h9" />
      <path d="M16 8l4 4-4 4" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7z" />
      <path d="M18.5 3.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" />
      <path d="M5.5 15.5l.9 2.2 2.2.9-2.2.9-.9 2.2-.9-2.2-2.2-.9 2.2-.9z" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 10a5 5 0 1 1 10 0c0 4.5 2 6 2 6H5s2-1.5 2-6" />
      <path d="M10 18a2 2 0 0 0 4 0" />
    </svg>
  );
}

function BaseIcon({ children }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true">{children}</svg>;
}

function getNavIcon(id) {
  if (id === "reports") return <BaseIcon><path d="M6 18V11" /><path d="M11 18V7" /><path d="M16 18V13" /></BaseIcon>;
  if (id === "sellers") return <BaseIcon><circle cx="9" cy="8" r="3" /><path d="M4 17c0-2.4 2.2-4.3 5-4.3s5 1.9 5 4.3" /><circle cx="17" cy="9" r="2.3" /><path d="M14.6 16.2c.6-1.5 2-2.5 3.7-2.5.8 0 1.5.2 2.1.5" /></BaseIcon>;
  return <BaseIcon><rect x="4" y="6" width="16" height="12" rx="1.5" /><path d="M12 6v12" /><path d="M4 10h16" /></BaseIcon>;
}

export default function AIAgentPage() {
  const router = useRouter();
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function closeOnOutside(event) {
      if (!menuRef.current?.contains(event.target)) setMenuOpen(false);
    }
    function closeOnEscape(event) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("mousedown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  function submitQuestion(question) {
    const trimmed = question.trim();
    if (!trimmed) return;

    setMessages((current) => [
      ...current,
      { id: current.length + 1, role: "user", text: trimmed },
      {
        id: current.length + 2,
        role: "assistant",
        text: "Análise iniciada. Vou considerar permissões, contexto operacional e sinais do sistema para responder de forma segura.",
      },
    ]);
    setInputValue("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    submitQuestion(inputValue);
  }

  return (
    <main className={`${styles.appShell} ${collapsed ? styles.appShellCollapsed : ""}`.trim()}>
      <header className={styles.topbar}>
        <div className={styles.topbarGroup}>
          <div className={styles.menuWrap} ref={menuRef}>
            <button type="button" className={`${styles.topbarButton} ${menuOpen ? styles.topbarButtonActive : ""}`.trim()} onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label="Menu"><MenuIcon /></button>
            {menuOpen ? <div className={styles.dropdownMenu} role="menu">{topMenuItems.map((item) => <button key={item} type="button" className={styles.dropdownItem} role="menuitem" onClick={() => setMenuOpen(false)}><span>{item}</span><ChevronSmallIcon /></button>)}</div> : null}
          </div>
          <button type="button" className={styles.topbarButton} aria-label="Recolher barra lateral" onClick={() => setCollapsed((value) => !value)}><PanelsIcon /></button>
          <button type="button" className={styles.topbarButton} aria-label="Voltar" onClick={() => window.history.back()}><SimpleArrow /></button>
          <button type="button" className={styles.topbarButton} aria-label="Avançar" onClick={() => window.history.forward()}><SimpleArrow right /></button>
        </div>
        <div className={styles.topbarActions}>
          <button type="button" className={`${styles.topbarButton} ${styles.notificationButton}`.trim()} aria-label="Notificações" title="Notificações">
            <BellIcon />
          </button>
          <button type="button" className={styles.aiButton} title="Agente de IA">
            <SparkIcon />
            <span>Agente de IA</span>
          </button>
          <button type="button" className={styles.logoutButton} onClick={() => router.push("/login")}>
            <LogoutIcon />
            <span>Sair</span>
          </button>
        </div>
      </header>

      <aside className={styles.sidebar}>
        <div>
          <div className={styles.logoRow}><span className={styles.logoDark}>SALES</span><span className={styles.logoAccent}>OPS</span></div>
          <nav className={styles.navigation} aria-label="Principal">
            {navItems.map((item) => (
              <button key={item.id} type="button" onClick={() => router.push("/")} className={styles.navItem} title={collapsed ? item.label : undefined}>
                <span className={styles.navIcon}>{getNavIcon(item.id)}</span>
                <span className={styles.navLabel}>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div>
          <button type="button" onClick={() => router.push("/")} className={`${styles.navItem} ${styles.settingsItem}`.trim()} title={collapsed ? "Configurações" : undefined}>
            <span className={styles.navIcon}><SparkIcon /></span>
            <span className={styles.navLabel}>Configurações</span>
          </button>
          <button type="button" className={styles.profileBox} onClick={() => router.push("/")}>
            <div className={styles.profileAvatar}>?</div>
            <div className={styles.profileText}><div className={styles.profileName}>Usuário</div><div className={styles.profileRole}>Cargo</div></div>
          </button>
        </div>
      </aside>

      <section className={styles.content}>
        <div className={styles.agentContent}>
          <header className={styles.agentHeader}>
            <span className={styles.eyebrow}>AGENTE DE IA</span>
            <h1>Central de análise inteligente</h1>
            <p>Investigue o sistema com histórico de perguntas, sugestões rápidas e conversa contínua.</p>
          </header>

          <div className={styles.agentPanels}>
            <aside className={styles.historyPanel}>
              <div className={styles.panelHeader}>
                <h2>Histórico</h2>
                <p>Perguntas recentes feitas ao agente.</p>
              </div>
              <div className={styles.historyList}>
                {historyItems.map((item) => (
                  <button key={item} type="button" className={styles.historyItem} onClick={() => submitQuestion(item)}>
                    {item}
                  </button>
                ))}
              </div>
            </aside>

            <section className={styles.chatPanel}>
              <div className={styles.panelHeader}>
                <h2>Chat do agente</h2>
                <p>Análises completas respeitando o perfil e o acesso do usuário.</p>
              </div>

              <div className={styles.promptRow}>
                {suggestedPrompts.map((prompt) => (
                  <button key={prompt} type="button" className={styles.promptChip} onClick={() => submitQuestion(prompt)}>
                    {prompt}
                  </button>
                ))}
              </div>

              <div className={styles.chatStream}>
                {messages.map((message) => (
                  <article
                    key={message.id}
                    className={`${styles.messageBubble} ${message.role === "user" ? styles.messageUser : styles.messageAssistant}`.trim()}
                  >
                    <span className={styles.messageRole}>{message.role === "user" ? "Você" : "Agente IA"}</span>
                    <p>{message.text}</p>
                  </article>
                ))}
              </div>

              <form className={styles.chatComposer} onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder="Pergunte sobre riscos, desempenho, falhas ou oportunidades..."
                />
                <button type="submit">Enviar</button>
              </form>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
