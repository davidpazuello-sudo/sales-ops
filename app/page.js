"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const navItems = [
  { id: "reports", label: "Relatórios" },
  { id: "sellers", label: "Vendedores" },
  { id: "deals", label: "Negócios" },
  { id: "settings", label: "Configurações" },
];

const topMenuItems = ["Arquivo", "Editar", "Visualizar", "Ajuda"];

const configSections = [
  { id: "account", label: "Conta & Acesso", description: "Perfil, senha, 2FA, sessões ativas e permissões por cargo." },
  { id: "hubspot", label: "Integração HubSpot", description: "Status da conexão, chave, sync, mapeamento e log de erros." },
  { id: "notifications", label: "Notificações & Alertas", description: "Canais, thresholds, metas e resumos automáticos." },
  { id: "ai", label: "IA & Diagnósticos", description: "Modelo ativo, voz, dados de contexto e sensibilidade diagnóstica." },
  { id: "exports", label: "Relatórios & Exportação", description: "Agendamento, formato, marca d'água e templates por cargo." },
  { id: "storage", label: "Gestão de Mídia & Storage", description: "Uso, retenção, STT, indexação e provedor com LGPD." },
  { id: "compliance", label: "Auditoria & Compliance", description: "Trilha imutável, masking visual e governança LGPD." },
];

const permissionRows = [
  ["Admin", "Total"],
  ["Gestor", "Dashboards, sync e relatórios"],
  ["Supervisor", "Coaching e auditoria"],
  ["Vendedor", "Carteira própria"],
];

const mappingRows = [
  ["deal_stage", "hs_pipeline_stage", "OK"],
  ["last_touch_at", "last_activity_date", "OK"],
  ["emotional_score", "custom_emotion_score", "Custom"],
];

const errorRows = [
  ["09:42", "Rate limit no lote 18", "Médio"],
  ["08:15", "owner_id sem correspondência", "Alto"],
];

const metricRows = [
  ["Estagnação", "36h", "alerta por negócio parado"],
  ["Meta", "92%", "gatilho para resumo semanal"],
  ["Resumo", "18:30", "envio automático diário"],
];

const reportRows = [
  ["Diretoria", "Resumo executivo", "PDF"],
  ["Gestor", "Pipeline por squad", "XLSX"],
  ["Supervisor", "Coaching", "PDF"],
];

const queueRows = [
  ["reuniao-seg.mp3", "Em transcrição", "74%"],
  ["coaching-lucas.wav", "Indexado", "100%"],
  ["weekly-review.mp4", "Na fila", "12%"],
];

const auditRows = [
  ["Ana Souza", "Alterou permissão do cargo Gestor", "Hoje, 10:14"],
  ["Sistema", "Executou sync completo com HubSpot", "Hoje, 09:00"],
  ["Carlos Lima", "Exportou relatório consolidado", "Ontem, 18:42"],
];

const maskingRows = [
  ["Telefone", "✓", "✓", "✕"],
  ["Email pessoal", "✓", "✕", "✕"],
  ["Receita prevista", "✓", "✓", "✓"],
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

function BaseIcon({ children }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true">{children}</svg>;
}

function getNavIcon(id) {
  if (id === "reports") return <BaseIcon><path d="M6 18V11" /><path d="M11 18V7" /><path d="M16 18V13" /></BaseIcon>;
  if (id === "sellers") return <BaseIcon><circle cx="9" cy="8" r="3" /><path d="M4 17c0-2.4 2.2-4.3 5-4.3s5 1.9 5 4.3" /><circle cx="17" cy="9" r="2.3" /><path d="M14.6 16.2c.6-1.5 2-2.5 3.7-2.5.8 0 1.5.2 2.1.5" /></BaseIcon>;
  if (id === "deals") return <BaseIcon><rect x="4" y="6" width="16" height="12" rx="1.5" /><path d="M12 6v12" /><path d="M4 10h16" /></BaseIcon>;
  return <BaseIcon><path d="M12 8.6A3.4 3.4 0 1 0 12 15.4A3.4 3.4 0 1 0 12 8.6z" /><path d="M19 12a7.2 7.2 0 0 0-.1-1l1.9-1.4-1.8-3.2-2.3 1a7.7 7.7 0 0 0-1.7-1l-.3-2.4H10l-.4 2.4a7.7 7.7 0 0 0-1.7 1l-2.3-1-1.8 3.2L5.7 11a7.2 7.2 0 0 0 0 2l-1.9 1.4 1.8 3.2 2.3-1c.5.4 1.1.7 1.7 1l.4 2.4h4.6l.3-2.4c.6-.2 1.2-.6 1.7-1l2.3 1 1.8-3.2L18.9 13c.1-.3.1-.7.1-1z" /></BaseIcon>;
}

function getConfigIcon(id) {
  if (id === "account") return getNavIcon("sellers");
  if (id === "hubspot") return <BaseIcon><path d="M10 14l4-4" /><path d="M7.5 16.5l-1.2 1.2a3.5 3.5 0 1 1-5-5l3.2-3.2a3.5 3.5 0 0 1 5 0" /><path d="M16.5 7.5l1.2-1.2a3.5 3.5 0 1 1 5 5l-3.2 3.2a3.5 3.5 0 0 1-5 0" /></BaseIcon>;
  if (id === "notifications") return <BaseIcon><path d="M7 10a5 5 0 1 1 10 0c0 5 2 6 2 6H5s2-1 2-6" /><path d="M10 18a2 2 0 0 0 4 0" /></BaseIcon>;
  if (id === "ai") return <BaseIcon><path d="M9 4a3 3 0 0 0-3 3v1a2.5 2.5 0 0 0-2 2.5A2.5 2.5 0 0 0 6 13v1a3 3 0 0 0 3 3" /><path d="M15 4a3 3 0 0 1 3 3v1a2.5 2.5 0 0 1 2 2.5A2.5 2.5 0 0 1 18 13v1a3 3 0 0 1-3 3" /><path d="M9 4a3 3 0 0 1 3 3v10" /><path d="M15 4a3 3 0 0 0-3 3v10" /></BaseIcon>;
  if (id === "exports") return <BaseIcon><path d="M8 3h6l4 4v14H8z" /><path d="M14 3v4h4" /><path d="M10 12h6" /><path d="M10 16h6" /></BaseIcon>;
  if (id === "storage") return <BaseIcon><path d="M5 8.5h14v7H5z" /><path d="M7 5h10" /><path d="M7 19h10" /></BaseIcon>;
  return <BaseIcon><path d="M12 3l7 3v5c0 4.5-2.9 8.5-7 10-4.1-1.5-7-5.5-7-10V6z" /><path d="M9.5 12l1.8 1.8 3.7-4" /></BaseIcon>;
}

function Row({ label, value, helper }) {
  return (
    <div className={styles.detailRow}>
      <span className={styles.detailLabel}>{label}</span>
      <div className={styles.detailValueBox}>
        <strong className={styles.detailValue}>{value}</strong>
        {helper ? <span className={styles.detailHelper}>{helper}</span> : null}
      </div>
    </div>
  );
}

function Card({ eyebrow, title, children, wide = false }) {
  return <section className={`${styles.card} ${wide ? styles.cardWide : ""}`.trim()}><span className={styles.cardEyebrow}>{eyebrow}</span><h2 className={styles.cardTitle}>{title}</h2>{children}</section>;
}

function Table({ head, rows, matrix = false }) {
  return (
    <div className={styles.table}>
      <div className={`${styles.tableHead} ${matrix ? styles.matrixCols : ""}`.trim()}>{head.map((item) => <span key={item}>{item}</span>)}</div>
      {rows.map((row, idx) => (
        <div key={`${row[0]}-${idx}`} className={`${styles.tableRow} ${matrix ? styles.matrixCols : ""}`.trim()}>
          {row.map((cell, cellIndex) => <span key={`${cell}-${cellIndex}`}>{cell}</span>)}
        </div>
      ))}
    </div>
  );
}

function Metric({ title, value, note }) {
  return <div className={styles.metric}><span>{title}</span><strong>{value}</strong><small>{note}</small></div>;
}

function SettingsContent({ section }) {
  if (section === "account") return <div className={styles.grid}><Card eyebrow="PERFIL" title="Conta & Acesso"><Row label="Nome" value="Usuário SalesOps" /><Row label="Senha" value="Última troca há 14 dias" /><Row label="2FA" value="Obrigatório para gestão" helper="SMS + autenticador" /><Row label="Sessões ativas" value="5 dispositivos" helper="2 navegadores e 3 mobile" /></Card><Card eyebrow="PERMISSÕES" title="Permissões por cargo"><Table head={["Cargo", "Acesso"]} rows={permissionRows} /></Card></div>;
  if (section === "hubspot") return <div className={styles.grid}><Card eyebrow="STATUS" title="Integração HubSpot"><Row label="Conexão" value="Ativa" helper="Último handshake hoje às 09:01" /><Row label="API key" value="•••• •••• •••• 98K2" /><Row label="Sync" value="A cada 5 minutos" /></Card><Card eyebrow="MAPEAMENTO" title="Campos sincronizados" wide><Table head={["SalesOps", "HubSpot", "Status"]} rows={mappingRows} /></Card><Card eyebrow="LOG" title="Erros recentes"><Table head={["Hora", "Erro", "Gravidade"]} rows={errorRows} /></Card></div>;
  if (section === "notifications") return <div className={styles.grid}><Card eyebrow="CANAIS" title="Notificações & Alertas"><Row label="Email" value="Ativo" helper="comercial@salesops.ai" /><Row label="Push" value="Ativo" helper="Chrome + mobile" /><Row label="Resumo automático" value="Diário" /></Card><Card eyebrow="THRESHOLDS" title="Metas e thresholds" wide><div className={styles.metrics}>{metricRows.map((item) => <Metric key={item[0]} title={item[0]} value={item[1]} note={item[2]} />)}</div></Card></div>;
  if (section === "ai") return <div className={styles.grid}><Card eyebrow="MODELO" title="IA & Diagnósticos"><Row label="Modelo ativo" value="GPT SalesOps Analyst" /><Row label="Assistente de voz" value="Habilitado" /><Row label="Sensibilidade" value="Moderada" helper="menos ruído, mais sinais de risco" /></Card><Card eyebrow="DADOS" title="Dados que alimentam a IA" wide><div className={styles.tags}><span>Negócios</span><span>Atividades</span><span>Calls gravadas</span><span>Sentimento do vendedor</span><span>Próximas tarefas</span></div></Card></div>;
  if (section === "exports") return <div className={styles.grid}><Card eyebrow="AGENDAMENTO" title="Relatórios & Exportação"><Row label="Envio semanal" value="Segunda, 07:30" /><Row label="Formato" value="PDF + XLSX" /><Row label="Marca d'água" value="Confidencial" /></Card><Card eyebrow="TEMPLATES" title="Templates por cargo" wide><Table head={["Cargo", "Template", "Formato"]} rows={reportRows} /></Card></div>;
  if (section === "storage") return <div className={styles.grid}><Card eyebrow="USO" title="Gestão de Mídia & Storage"><div className={styles.usage}><div className={styles.usageTop}><strong>38.4 / 100 GB</strong><span>38%</span></div><div className={styles.usageBar}><span style={{ width: "38.4%" }} /></div><p>Gravações semanais, áudios e anexos operacionais.</p></div><Row label="Hot storage" value="45 dias" /><Row label="Cold storage" value="365 dias" helper="arquivamento automático" /></Card><Card eyebrow="STT" title="Fila de transcrição em tempo real" wide><Table head={["Arquivo", "Status", "Progresso"]} rows={queueRows} /></Card><Card eyebrow="PROVEDOR" title="Indexação e provedor"><Row label="Provedor" value="Azure Blob Storage" /><Row label="Região" value="Brazil South" helper="aderência LGPD" /><Row label="Indexação IA" value="Ativa" /></Card></div>;
  return <div className={styles.grid}><Card eyebrow="AUDITORIA" title="Eventos recentes" wide><Table head={["Quem", "O quê", "Quando"]} rows={auditRows} /></Card><Card eyebrow="MASKING" title="Matriz visual por campo e cargo"><Table head={["Campo", "Admin", "Gestor", "Vendedor"]} rows={maskingRows} matrix /></Card><Card eyebrow="LGPD" title="Consentimento e conformidade"><Row label="Consentimento" value="Registrado por contato" /><Row label="Esquecimento" value="Fluxo habilitado" helper="remoção em até 7 dias" /><Row label="Relatório" value="Atualizado hoje" /></Card></div>;
}

export default function HomePage() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("settings");
  const [activeConfig, setActiveConfig] = useState("account");
  const [collapsed, setCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutPromptOpen, setLogoutPromptOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function closeOnOutside(event) {
      if (!menuRef.current?.contains(event.target)) setMenuOpen(false);
    }
    function closeOnEscape(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setLogoutPromptOpen(false);
      }
    }
    document.addEventListener("mousedown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const currentSection = configSections.find((item) => item.id === activeConfig);

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
        <button type="button" className={styles.logoutButton} onClick={() => setLogoutPromptOpen(true)}>
          <LogoutIcon />
          <span>Sair</span>
        </button>
      </header>

      <aside className={styles.sidebar}>
        <div>
          <div className={styles.logoRow}><span className={styles.logoDark}>SALES</span><span className={styles.logoAccent}>OPS</span></div>
          <nav className={styles.navigation} aria-label="Principal">
            {navItems.slice(0, 3).map((item) => (
              <button key={item.id} type="button" onClick={() => setActiveNav(item.id)} className={`${styles.navItem} ${activeNav === item.id ? styles.navItemActive : ""}`.trim()} title={collapsed ? item.label : undefined}>
                <span className={styles.navIcon}>{getNavIcon(item.id)}</span>
                <span className={styles.navLabel}>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div>
          <button type="button" onClick={() => setActiveNav("settings")} className={`${styles.navItem} ${styles.settingsItem} ${activeNav === "settings" ? styles.navItemActive : ""}`.trim()} title={collapsed ? "Configurações" : undefined}>
            <span className={styles.navIcon}>{getNavIcon("settings")}</span>
            <span className={styles.navLabel}>Configurações</span>
          </button>
          <div className={styles.profileBox}>
            <div className={styles.profileAvatar}>?</div>
            <div className={styles.profileText}><div className={styles.profileName}>Usuário</div><div className={styles.profileRole}>Cargo</div></div>
          </div>
        </div>
      </aside>

      <section className={styles.content}>
        {activeNav === "settings" ? (
          <section className={styles.settingsLayout}>
            <aside className={styles.settingsSidebar}>
              <div className={styles.settingsSidebarTitle}>CONFIGURAÇÕES</div>
              <div className={styles.settingsSidebarList}>
                {configSections.map((item) => (
                  <button key={item.id} type="button" onClick={() => setActiveConfig(item.id)} className={`${styles.settingsSidebarItem} ${activeConfig === item.id ? styles.settingsSidebarItemActive : ""}`.trim()}>
                    <span className={styles.settingsSidebarIcon}>{getConfigIcon(item.id)}</span>
                    <span className={styles.settingsSidebarLabel}>{item.label}</span>
                  </button>
                ))}
              </div>
            </aside>
            <div className={styles.settingsContent}>
              <header className={styles.settingsHeader}>
                <h1>{currentSection?.label}</h1>
                <p>{currentSection?.description}</p>
              </header>
              <SettingsContent section={activeConfig} />
            </div>
          </section>
        ) : (
          <div className={styles.emptyState}><div className={styles.placeholderBadge}>Em breve</div><span>{navItems.find((item) => item.id === activeNav)?.label}</span></div>
        )}
      </section>

      {logoutPromptOpen ? (
        <div className={styles.logoutModalBackdrop} role="presentation" onClick={() => setLogoutPromptOpen(false)}>
          <div className={styles.logoutModal} role="dialog" aria-modal="true" aria-labelledby="logout-title" onClick={(event) => event.stopPropagation()}>
            <span className={styles.logoutEyebrow}>ENCERRAR SESSAO</span>
            <h2 id="logout-title">Deseja sair mesmo?</h2>
            <p>Ao continuar, você será redirecionado para a tela de login do SalesOps.</p>
            <div className={styles.logoutActions}>
              <button type="button" className={styles.logoutSecondaryButton} onClick={() => setLogoutPromptOpen(false)}>Cancelar</button>
              <button type="button" className={styles.logoutPrimaryButton} onClick={() => router.push("/login")}>Sair agora</button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
