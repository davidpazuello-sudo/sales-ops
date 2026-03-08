import { useState } from "react";
import { BarChart2, Users, Briefcase, Menu, ArrowLeft, ArrowRight, User, Link, Bell, Brain, FileText, ChevronRight, Check, HardDrive, ShieldCheck } from "lucide-react";

const ORANGE = "#d97706";
const ORANGE_LIGHT = "#fff7ed";

const navItems = [
  { key: "relatorios", label: "Relatórios", icon: BarChart2, emoji: "📊" },
  { key: "vendedores", label: "Vendedores", icon: Users, emoji: "👥" },
  { key: "negocios", label: "Negócios", icon: Briefcase, emoji: "💼" },
];

const menuItems = ["Arquivo", "Editar", "Visualizar", "Ajuda"];

const settingsSections = [
  { key: "conta", label: "Conta & Acesso", icon: User },
  { key: "hubspot", label: "Integração HubSpot", icon: Link },
  { key: "notificacoes", label: "Notificações & Alertas", icon: Bell },
  { key: "ia", label: "IA & Diagnósticos", icon: Brain },
  { key: "relatorios", label: "Relatórios & Exportação", icon: FileText },
  { key: "media", label: "Gestão de Mídia & Storage", icon: HardDrive },
  { key: "auditoria", label: "Auditoria & Compliance", icon: ShieldCheck },
];

const Toggle = ({ value, onChange }) => (
  <div onClick={() => onChange(!value)} style={{
    width: 40, height: 22, borderRadius: 11, cursor: "pointer",
    background: value ? ORANGE : "#e2e8f0",
    position: "relative", transition: "background 0.2s", flexShrink: 0,
  }}>
    <div style={{
      position: "absolute", top: 3, left: value ? 21 : 3,
      width: 16, height: 16, borderRadius: "50%", background: "#fff",
      boxShadow: "0 1px 3px #0002", transition: "left 0.2s",
    }} />
  </div>
);

const Field = ({ label, sub, children }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid #f1f5f9" }}>
    <div>
      <div style={{ fontSize: 13, fontWeight: 500, color: "#1e293b" }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{sub}</div>}
    </div>
    {children}
  </div>
);

const Input = ({ value, placeholder, type = "text" }) => {
  const [v, setV] = useState(value || "");
  return (
    <input value={v} onChange={e => setV(e.target.value)} type={type} placeholder={placeholder} style={{
      border: "1px solid #e2e8f0", borderRadius: 8, padding: "7px 12px",
      fontSize: 12, color: "#374151", background: "#f8fafc",
      outline: "none", width: 200,
    }} />
  );
};

const Select = ({ options, value }) => {
  const [v, setV] = useState(value);
  return (
    <select value={v} onChange={e => setV(e.target.value)} style={{
      border: "1px solid #e2e8f0", borderRadius: 8, padding: "7px 12px",
      fontSize: 12, color: "#374151", background: "#f8fafc", outline: "none",
    }}>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  );
};

const Badge = ({ text, color }) => (
  <span style={{
    fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20,
    background: color === "green" ? "#dcfce7" : "#fef3c7",
    color: color === "green" ? "#16a34a" : "#d97706",
  }}>{text}</span>
);

function SettingsContent({ section }) {
  const [toggles, setToggles] = useState({
    twofa: false, hubspotSync: true, emailAlerts: true, pushAlerts: false,
    stagnacao: true, iaVoz: true, iaSugestoes: true, autoReport: true, pdfExport: true,
  });
  const toggle = (k) => setToggles(p => ({ ...p, [k]: !p[k] }));

  const sectionLabel = settingsSections.find(s => s.key === section)?.label;

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "32px 40px" }}>
      <div style={{ maxWidth: 640 }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 700, color: "#0f172a" }}>{sectionLabel}</h2>
        <p style={{ margin: "0 0 32px", fontSize: 13, color: "#94a3b8" }}>Gerencie as preferências desta seção</p>

        {/* CONTA & ACESSO */}
        {section === "conta" && (
          <>
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "4px 20px 8px", marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", padding: "14px 0 4px" }}>Perfil</div>
              <Field label="Nome completo"><Input placeholder="Nome do usuário" /></Field>
              <Field label="E-mail"><Input placeholder="email@empresa.com" type="email" /></Field>
              <Field label="Cargo"><Select options={["Admin", "Gerente", "Supervisor", "Vendedor"]} value="Admin" /></Field>
              <Field label="Foto do perfil" sub="JPG ou PNG, máx 2MB">
                <button style={{ fontSize: 12, color: ORANGE, background: ORANGE_LIGHT, border: `1px solid ${ORANGE}30`, borderRadius: 8, padding: "7px 14px", cursor: "pointer" }}>Alterar foto</button>
              </Field>
            </div>
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "4px 20px 8px", marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", padding: "14px 0 4px" }}>Segurança</div>
              <Field label="Senha" sub="—">
                <button style={{ fontSize: 12, color: "#64748b", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "7px 14px", cursor: "pointer" }}>Alterar senha</button>
              </Field>
              <Field label="Autenticação 2FA" sub="Camada extra de segurança no login">
                <Toggle value={toggles.twofa} onChange={() => toggle("twofa")} />
              </Field>
              <Field label="Sessões ativas" sub="— dispositivos conectados">
                <button style={{ fontSize: 12, color: "#ef4444", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "7px 14px", cursor: "pointer" }}>Encerrar outras</button>
              </Field>
            </div>
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "4px 20px 8px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", padding: "14px 0 4px" }}>Permissões por cargo</div>
              {["Admin", "Gerente", "Supervisor", "Vendedor"].map((cargo, i) => (
                <Field key={cargo} label={cargo} sub={["Acesso total", "Acesso a relatórios e equipe", "Acesso à própria equipe", "Acesso ao próprio pipeline"][i]}>
                  <button style={{ fontSize: 11, color: "#64748b", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "6px 12px", cursor: "pointer" }}>Editar</button>
                </Field>
              ))}
            </div>
          </>
        )}

        {/* HUBSPOT */}
        {section === "hubspot" && (
          <>
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "4px 20px 8px", marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", padding: "14px 0 4px" }}>Conexão</div>
              <Field label="Status da integração" sub="Última sincronização: —">
                <Badge text="Conectado" color="green" />
              </Field>
              <Field label="API Key" sub="Chave de acesso à conta HubSpot">
                <Input placeholder="••••••••••••••••••" type="password" />
              </Field>
              <Field label="Sincronização automática" sub="Atualizar dados em tempo real">
                <Toggle value={toggles.hubspotSync} onChange={() => toggle("hubspotSync")} />
              </Field>
              <Field label="Frequência de sync" sub="Intervalo entre sincronizações">
                <Select options={["Tempo real", "A cada 5 min", "A cada 15 min", "A cada hora"]} value="Tempo real" />
              </Field>
            </div>
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "4px 20px 8px", marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", padding: "14px 0 4px" }}>Mapeamento de campos</div>
              {[["Deal Name", "Nome do Negócio"], ["Deal Stage", "Estágio do Pipeline"], ["Last Activity", "Última Interação"], ["Close Date", "Data de Fechamento"], ["Amount", "Valor do Negócio"]].map(([hs, sys]) => (
                <Field key={hs} label={hs} sub="Campo HubSpot">
                  <div style={{ fontSize: 12, color: "#64748b", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "7px 12px" }}>→ {sys}</div>
                </Field>
              ))}
            </div>
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "4px 20px 8px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", padding: "14px 0 4px" }}>Log de Erros</div>
              {[
                { msg: "[Teste] Entrada de log de sincronização", time: "—", tipo: "warn" },
                { msg: "[Teste] Evento de renovação de token", time: "—", tipo: "ok" },
                { msg: "[Teste] Campo não mapeado identificado", time: "—", tipo: "warn" },
              ].map((log, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "11px 0", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: log.tipo === "ok" ? "#10b981" : "#f59e0b", flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 12, color: "#374151" }}>{log.msg}</span>
                  </div>
                  <span style={{ fontSize: 11, color: "#94a3b8", whiteSpace: "nowrap", marginLeft: 16 }}>{log.time}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* NOTIFICAÇÕES */}
        {section === "notificacoes" && (
          <>
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "4px 20px 8px", marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", padding: "14px 0 4px" }}>Canais</div>
              <Field label="Alertas por e-mail" sub="Receber notificações no e-mail"><Toggle value={toggles.emailAlerts} onChange={() => toggle("emailAlerts")} /></Field>
              <Field label="Alertas push" sub="Notificações no navegador"><Toggle value={toggles.pushAlerts} onChange={() => toggle("pushAlerts")} /></Field>
              <Field label="Horário de silêncio" sub="Não notificar fora do horário comercial">
                <Select options={["Desativado", "18h – 8h", "20h – 7h", "Fins de semana"]} value="18h – 8h" />
              </Field>
            </div>
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "4px 20px 8px", marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", padding: "14px 0 4px" }}>Thresholds de Alerta</div>
              <Field label="Estagnação de deal" sub="Alertar após X dias sem interação">
                <Toggle value={toggles.stagnacao} onChange={() => toggle("stagnacao")} />
              </Field>
              <Field label="Dias até alerta de estagnação"><Select options={["7 dias", "10 dias", "14 dias", "21 dias"]} value="14 dias" /></Field>
              <Field label="Meta abaixo de" sub="Alertar quando atingimento estiver abaixo de X%"><Select options={["50%", "60%", "70%", "80%"]} value="70%" /></Field>
              <Field label="Tarefas vencidas" sub="Alertar quando uma tarefa passar do prazo"><Toggle value={true} onChange={() => {}} /></Field>
            </div>
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "4px 20px 8px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", padding: "14px 0 4px" }}>Resumos Automáticos</div>
              <Field label="Resumo diário" sub="Enviado às 8h com os destaques do dia"><Toggle value={true} onChange={() => {}} /></Field>
              <Field label="Resumo semanal" sub="Toda segunda-feira com visão da semana anterior"><Toggle value={true} onChange={() => {}} /></Field>
              <Field label="Destinatários dos resumos"><Input placeholder="email@empresa.com" /></Field>
            </div>
          </>
        )}

        {/* IA */}
        {section === "ia" && (
          <>
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "4px 20px 8px", marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", padding: "14px 0 4px" }}>Modelo & Assistente</div>
              <Field label="Modelo de IA ativo" sub="Motor utilizado para diagnósticos e sugestões">
                <Select options={["Claude Sonnet 4.6", "Claude Opus 4.6", "Claude Haiku 4.5"]} value="Claude Sonnet 4.6" />
              </Field>
              <Field label="Assistente de voz" sub="Comandos de voz para consultar a operação"><Toggle value={toggles.iaVoz} onChange={() => toggle("iaVoz")} /></Field>
              <Field label="Sugestões por oportunidade" sub="IA diagnóstica em cada deal do pipeline"><Toggle value={toggles.iaSugestoes} onChange={() => toggle("iaSugestoes")} /></Field>
              <Field label="Idioma da IA">
                <Select options={["Português (BR)", "Inglês", "Espanhol"]} value="Português (BR)" />
              </Field>
            </div>
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "4px 20px 8px", marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", padding: "14px 0 4px" }}>Dados que alimentam a IA</div>
              {[
                ["Histórico de deals", "Dados de negócios fechados e perdidos", true],
                ["Interações no HubSpot", "E-mails, ligações e reuniões registradas", true],
                ["Gravações de reuniões", "Transcrições das reuniões semanais", true],
                ["Indicadores de IE", "Dados de inteligência emocional dos vendedores", false],
                ["Metas e atingimento", "Histórico de performance por vendedor", true],
              ].map(([label, sub, val], i) => (
                <Field key={i} label={label} sub={sub}><Toggle value={val} onChange={() => {}} /></Field>
              ))}
            </div>
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "4px 20px 8px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", padding: "14px 0 4px" }}>Sensibilidade dos Diagnósticos</div>
              <Field label="Nível de alerta" sub="Quão agressiva é a IA ao sugerir ações">
                <Select options={["Conservador", "Moderado", "Agressivo"]} value="Moderado" />
              </Field>
              <Field label="Histórico de conversas com IA" sub="— interações armazenadas">
                <button style={{ fontSize: 12, color: "#ef4444", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "7px 14px", cursor: "pointer" }}>Limpar histórico</button>
              </Field>
            </div>
          </>
        )}

        {/* RELATÓRIOS */}
        {section === "relatorios" && (
          <>
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "4px 20px 8px", marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", padding: "14px 0 4px" }}>Agendamento</div>
              <Field label="Relatórios automáticos" sub="Geração e envio periódico de relatórios"><Toggle value={toggles.autoReport} onChange={() => toggle("autoReport")} /></Field>
              <Field label="Frequência">
                <Select options={["Semanal", "Quinzenal", "Mensal"]} value="Semanal" />
              </Field>
              <Field label="Dia de envio">
                <Select options={["Segunda-feira", "Sexta-feira", "Primeiro dia do mês"]} value="Segunda-feira" />
              </Field>
              <Field label="Destinatários"><Input placeholder="email@empresa.com" /></Field>
            </div>
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "4px 20px 8px", marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", padding: "14px 0 4px" }}>Exportação</div>
              <Field label="Formato padrão de exportação">
                <Select options={["PDF", "Excel (.xlsx)", "CSV", "Google Sheets"]} value="PDF" />
              </Field>
              <Field label="Exportar com gráficos" sub="Incluir visualizações nos arquivos PDF"><Toggle value={toggles.pdfExport} onChange={() => toggle("pdfExport")} /></Field>
              <Field label="Marca d'água" sub="Adicionar logo da empresa nos relatórios"><Toggle value={true} onChange={() => {}} /></Field>
            </div>
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "4px 20px 8px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", padding: "14px 0 4px" }}>Templates por Cargo</div>
              {[["Vendedor", "Pipeline individual + tarefas"], ["Supervisor", "Equipe + coaching + IE"], ["Diretor", "Consolidado + metas + ranking"]].map(([cargo, desc]) => (
                <Field key={cargo} label={cargo} sub={desc}>
                  <button style={{ fontSize: 11, color: ORANGE, background: ORANGE_LIGHT, border: `1px solid ${ORANGE}30`, borderRadius: 8, padding: "6px 12px", cursor: "pointer" }}>Personalizar</button>
                </Field>
              ))}
            </div>
          </>
        )}

        {/* MÍDIA & STORAGE */}
        {section === "media" && (
          <>
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "4px 20px 8px", marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", padding: "14px 0 4px" }}>Visão Geral do Storage</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, padding: "12px 0 16px" }}>
                {[
                  { label: "Total utilizado", value: "— GB", sub: "de — GB", color: ORANGE },
                  { label: "Arquivos de áudio", value: "—", sub: "reuniões gravadas", color: "#6366f1" },
                  { label: "Cold Storage", value: "— GB", sub: "arquivos antigos", color: "#64748b" },
                ].map((stat, i) => (
                  <div key={i} style={{ background: "#f8fafc", borderRadius: 10, padding: "14px 16px", border: "1px solid #f1f5f9" }}>
                    <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 4 }}>{stat.label}</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: stat.color }}>{stat.value}</div>
                    <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>{stat.sub}</div>
                  </div>
                ))}
              </div>
              {/* Usage Bar */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 11, color: "#64748b" }}>Uso do armazenamento</span>
                  <span style={{ fontSize: 11, color: "#64748b" }}>— / — GB</span>
                </div>
                <div style={{ background: "#f1f5f9", borderRadius: 6, height: 8 }}>
                  <div style={{ width: "0%", height: "100%", borderRadius: 6, background: `linear-gradient(90deg, ${ORANGE}, #f59e0b)` }} />
                </div>
              </div>
            </div>

            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "4px 20px 8px", marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", padding: "14px 0 4px" }}>Políticas de Retenção</div>
              <Field label="Retenção de gravações ativas" sub="Prazo antes de mover para cold storage">
                <Select options={["30 dias", "60 dias", "90 dias", "180 dias", "1 ano"]} value="90 dias" />
              </Field>
              <Field label="Retenção em cold storage" sub="Prazo antes da exclusão definitiva">
                <Select options={["6 meses", "1 ano", "2 anos", "Indefinido"]} value="1 ano" />
              </Field>
              <Field label="Exclusão automática" sub="Deletar arquivos ao atingir o prazo de retenção">
                <Toggle value={true} onChange={() => {}} />
              </Field>
              <Field label="Notificar antes de excluir" sub="Aviso com antecedência de 7 dias">
                <Toggle value={true} onChange={() => {}} />
              </Field>
              <Field label="Política para documentos de voz" sub="Mensagens de voz avulsas">
                <Select options={["30 dias", "60 dias", "90 dias"]} value="30 dias" />
              </Field>
            </div>

            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "4px 20px 8px", marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", padding: "14px 0 4px" }}>Transcrição & Indexação (STT)</div>
              <Field label="Transcrição automática" sub="Converter áudio para texto ao fazer upload">
                <Toggle value={true} onChange={() => {}} />
              </Field>
              <Field label="Motor de transcrição" sub="Serviço de Speech-to-Text utilizado">
                <Select options={["OpenAI Whisper", "Google STT", "AWS Transcribe"]} value="OpenAI Whisper" />
              </Field>
              <Field label="Idioma de transcrição">
                <Select options={["Português (BR)", "Inglês", "Espanhol"]} value="Português (BR)" />
              </Field>
              <Field label="Indexação para IA" sub="Tornar transcrições pesquisáveis pela IA centralizada">
                <Toggle value={true} onChange={() => {}} />
              </Field>
              <Field label="Sumário automático por reunião" sub="IA gera resumo após cada transcrição">
                <Toggle value={true} onChange={() => {}} />
              </Field>
              {/* Queue status */}
              <div style={{ background: "#f8fafc", borderRadius: 10, padding: "12px 16px", margin: "12px 0", border: "1px solid #f1f5f9" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#374151", marginBottom: 8 }}>Fila de processamento</div>
                {[
                  { nome: "[Teste] Reunião exemplo 1", status: "Concluído", color: "#10b981" },
                  { nome: "[Teste] Reunião exemplo 2", status: "Concluído", color: "#10b981" },
                  { nome: "[Teste] Reunião exemplo 3", status: "Processando...", color: ORANGE },
                  { nome: "[Teste] Reunião exemplo 4", status: "Na fila", color: "#94a3b8" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: i < 3 ? "1px solid #f1f5f9" : "none" }}>
                    <span style={{ fontSize: 12, color: "#374151" }}>{item.nome}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: item.color }}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "4px 20px 8px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", padding: "14px 0 4px" }}>Provedor de Storage</div>
              <Field label="Provedor ativo">
                <Select options={["Azure Blob Storage", "AWS S3", "Google Cloud Storage"]} value="Azure Blob Storage" />
              </Field>
              <Field label="Região do servidor" sub="Localização física dos dados (LGPD)">
                <Select options={["Brazil South", "East US", "West Europe"]} value="Brazil South" />
              </Field>
              <Field label="Criptografia em repouso" sub="AES-256 em todos os arquivos">
                <Badge text="Ativa" color="green" />
              </Field>
            </div>
          </>
        )}

        {/* AUDITORIA & COMPLIANCE */}
        {section === "auditoria" && (
          <>
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "4px 20px 8px", marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", padding: "14px 0 4px" }}>Trilha de Auditoria</div>
              <Field label="Audit Log ativo" sub="Registrar todas as ações dos usuários no sistema">
                <Toggle value={true} onChange={() => {}} />
              </Field>
              <Field label="Retenção dos logs" sub="Por quanto tempo manter os registros de auditoria">
                <Select options={["6 meses", "1 ano", "2 anos", "5 anos"]} value="2 anos" />
              </Field>
              <Field label="Log imutável" sub="Registros não podem ser editados ou deletados por ninguém">
                <Badge text="Habilitado" color="green" />
              </Field>
              <Field label="Exportar audit log" sub="Download do histórico completo em CSV">
                <button style={{ fontSize: 12, color: ORANGE, background: ORANGE_LIGHT, border: `1px solid ${ORANGE}30`, borderRadius: 8, padding: "7px 14px", cursor: "pointer" }}>Exportar</button>
              </Field>

              {/* Audit log table */}
              <div style={{ margin: "12px 0 4px" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#374151", marginBottom: 8 }}>Eventos recentes</div>
                <div style={{ border: "1px solid #f1f5f9", borderRadius: 10, overflow: "hidden" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 0.8fr", background: "#f8fafc", padding: "8px 14px", gap: 8 }}>
                    {["Usuário", "Ação", "Recurso", "Data/Hora"].map(h => (
                      <span key={h} style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" }}>{h}</span>
                    ))}
                  </div>
                  {[
                    ["[Teste] Usuário A", "Visualizou deal", "—", "—"],
                    ["[Teste] Usuário B", "Exportou relatório", "—", "—"],
                    ["[Teste] Usuário A", "Editou tarefa", "—", "—"],
                    ["[Teste] Usuário C", "Acessou perfil", "—", "—"],
                    ["[Teste] Usuário B", "Alterou permissão", "—", "—"],
                  ].map(([user, acao, recurso, data], i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 0.8fr", padding: "10px 14px", gap: 8, borderTop: "1px solid #f1f5f9", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                      <span style={{ fontSize: 11, color: "#374151", fontWeight: 500 }}>{user}</span>
                      <span style={{ fontSize: 11, color: "#64748b" }}>{acao}</span>
                      <span style={{ fontSize: 11, color: "#64748b" }}>{recurso}</span>
                      <span style={{ fontSize: 10, color: "#94a3b8" }}>{data}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "4px 20px 8px", marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", padding: "14px 0 4px" }}>Data Masking</div>
              <div style={{ padding: "10px 0 14px" }}>
                <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 14px" }}>Defina quais dados sensíveis ficam ocultos para cada nível de acesso.</p>
                {[
                  { campo: "Telefone do cliente", vendedor: false, supervisor: true, gerente: true },
                  { campo: "Valor do negócio", vendedor: true, supervisor: true, gerente: true },
                  { campo: "Faturamento crítico (>R$500k)", vendedor: false, supervisor: false, gerente: true },
                  { campo: "Dados de IE do vendedor", vendedor: false, supervisor: true, gerente: true },
                  { campo: "E-mail do decisor", vendedor: true, supervisor: true, gerente: true },
                  { campo: "Margem de desconto máxima", vendedor: false, supervisor: true, gerente: true },
                ].map((row, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f1f5f9", gap: 8 }}>
                    <span style={{ fontSize: 12, color: "#374151" }}>{row.campo}</span>
                    {[["Vendedor", row.vendedor], ["Supervisor", row.supervisor], ["Gerente", row.gerente]].map(([role, val]) => (
                      <div key={role} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                        {i === 0 && <span style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" }}>{role}</span>}
                        <div style={{
                          width: 20, height: 20, borderRadius: 6,
                          background: val ? "#dcfce7" : "#fee2e2",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 10,
                        }}>{val ? "✓" : "✕"}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <Field label="Mascarar dados automaticamente" sub="Aplicar regras de masking em tempo real">
                <Toggle value={true} onChange={() => {}} />
              </Field>
            </div>

            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: "4px 20px 8px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", padding: "14px 0 4px" }}>LGPD & Compliance</div>
              <Field label="Consentimento de dados" sub="Registro de consentimento de todos os usuários">
                <Badge text="Em conformidade" color="green" />
              </Field>
              <Field label="Direito ao esquecimento" sub="Solicitações de exclusão de dados pessoais">
                <button style={{ fontSize: 12, color: "#64748b", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "7px 14px", cursor: "pointer" }}>Ver solicitações</button>
              </Field>
              <Field label="DPO responsável" sub="Data Protection Officer do sistema">
                <Input placeholder="dpo@empresa.com" />
              </Field>
              <Field label="Relatório de conformidade LGPD">
                <button style={{ fontSize: 12, color: ORANGE, background: ORANGE_LIGHT, border: `1px solid ${ORANGE}30`, borderRadius: 8, padding: "7px 14px", cursor: "pointer" }}>Gerar relatório</button>
              </Field>
            </div>
          </>
        )}

        {/* Save Button */}
        <div style={{ marginTop: 28, display: "flex", justifyContent: "flex-end" }}>
          <button style={{
            background: ORANGE, color: "#fff", border: "none",
            borderRadius: 10, padding: "11px 28px", fontSize: 13, fontWeight: 600,
            cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
          }}>
            <Check size={14} /> Salvar alterações
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MainInterface() {
  const [active, setActive] = useState("vendedores");
  const [collapsed, setCollapsed] = useState(false);
  const [history, setHistory] = useState([{ page: "vendedores", settings: false, settingsSection: "conta" }]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const currentState = history[historyIndex];
  const showSettings = currentState.settings;
  const settingsSection = currentState.settingsSection;

  const pushHistory = (newState) => {
    const newHistory = [...history.slice(0, historyIndex + 1), newState];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setActive(newState.page);
  };

  const navigate = (key) => {
    pushHistory({ page: key, settings: false, settingsSection: "conta" });
  };

  const openSettings = (section = "conta") => {
    pushHistory({ page: active, settings: true, settingsSection: section });
  };

  const setSettingsSection = (section) => {
    pushHistory({ page: active, settings: true, settingsSection: section });
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setActive(history[newIndex].page);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setActive(history[newIndex].page);
    }
  };

  const canBack = historyIndex > 0;
  const canForward = historyIndex < history.length - 1;

  const GearIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );

  const PanelIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="1" width="14" height="14" rx="2" />
      <line x1="5" y1="1" x2="5" y2="15" />
    </svg>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "'DM Sans', sans-serif", background: "#f4f6f9" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet" />

      {/* Top Bar */}
      <div style={{ height: 44, background: "#fff", borderBottom: "1px solid #e8ecf0", display: "flex", alignItems: "center", padding: "0 12px", gap: 2, flexShrink: 0 }}>
        {/* Menu Dropdown */}
        <div style={{ position: "relative" }}>
          <button title="Menu" onClick={() => setMenuOpen(!menuOpen)} style={{
            width: 34, height: 34, borderRadius: 8,
            background: menuOpen ? "#f4f6f9" : "transparent", border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#9ca3af", cursor: "pointer", transition: "all 0.15s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#f4f6f9"; }}
            onMouseLeave={e => { if (!menuOpen) e.currentTarget.style.background = "transparent"; }}
          >
            <Menu size={16} strokeWidth={1.7} />
          </button>
          {menuOpen && (
            <>
              <div onClick={() => setMenuOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 99 }} />
              <div style={{ position: "absolute", top: 40, left: 0, zIndex: 100, background: "#fff", borderRadius: 10, boxShadow: "0 4px 24px #0000001a", border: "1px solid #f0f2f5", minWidth: 180, padding: "6px 0" }}>
                {menuItems.map(item => (
                  <button key={item} onClick={() => setMenuOpen(false)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 16px", background: "transparent", border: "none", cursor: "pointer", fontSize: 13, color: "#374151" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#f9fafb"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                  >
                    <span>{item}</span>
                    <ChevronRight size={13} color="#9ca3af" />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Panel Toggle */}
        <button title={collapsed ? "Expandir sidebar" : "Recolher sidebar"} onClick={() => setCollapsed(!collapsed)} style={{ width: 34, height: 34, borderRadius: 8, background: "transparent", border: "none", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af", cursor: "pointer" }}
          onMouseEnter={e => { e.currentTarget.style.background = "#f4f6f9"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
        ><PanelIcon /></button>

        {[
          { Icon: ArrowLeft, title: "Voltar", action: goBack, disabled: !canBack },
          { Icon: ArrowRight, title: "Avançar", action: goForward, disabled: !canForward },
        ].map(({ Icon, title, action, disabled }, i) => (
          <button key={i} title={title} onClick={action} style={{ width: 34, height: 34, borderRadius: 8, background: "transparent", border: "none", display: "flex", alignItems: "center", justifyContent: "center", color: disabled ? "#d1d5db" : "#9ca3af", cursor: disabled ? "default" : "pointer" }}
            onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = "#f4f6f9"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          ><Icon size={16} strokeWidth={1.7} /></button>
        ))}
      </div>

      {/* Body */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* Sidebar */}
        <div style={{ width: collapsed ? 64 : 220, background: "#fff", borderRight: "1px solid #e8ecf0", display: "flex", flexDirection: "column", transition: "width 0.25s ease", overflow: "hidden", flexShrink: 0 }}>
          {/* Logo */}
          <div style={{ paddingTop: 22, paddingBottom: 24, paddingLeft: collapsed ? 0 : 20, paddingRight: collapsed ? 0 : 20, borderBottom: "1px solid #f0f2f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {collapsed
              ? <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 15, color: ORANGE }}>S</span>
              : <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17, color: "#1a1f36", whiteSpace: "nowrap" }}>SALES<span style={{ color: ORANGE }}>OPS</span></span>
            }
          </div>

          {/* Nav */}
          <nav style={{ padding: "16px 8px", flex: 1 }}>
            {navItems.map(({ key, label, icon: Icon }) => {
              const isActive = active === key && !showSettings;
              return (
                <button key={key} onClick={() => navigate(key)} title={collapsed ? label : ""} style={{ width: "100%", display: "flex", alignItems: "center", gap: collapsed ? 0 : 10, justifyContent: collapsed ? "center" : "flex-start", padding: "10px 12px", borderRadius: 10, marginBottom: 4, background: isActive ? ORANGE_LIGHT : "transparent", border: "none", cursor: "pointer", color: isActive ? ORANGE : "#64748b", fontWeight: isActive ? 600 : 400, fontSize: 13, transition: "all 0.15s", whiteSpace: "nowrap" }}>
                  <Icon size={17} strokeWidth={isActive ? 2.5 : 1.8} />
                  {!collapsed && <span>{label}</span>}
                </button>
              );
            })}
          </nav>

          {/* Settings */}
          <div style={{ padding: collapsed ? "12px 0" : "12px 8px" }}>
            <button onClick={() => openSettings()} title={collapsed ? "Configurações" : ""} style={{ width: "100%", display: "flex", alignItems: "center", gap: collapsed ? 0 : 10, justifyContent: collapsed ? "center" : "flex-start", padding: "10px 12px", borderRadius: 10, background: showSettings ? ORANGE_LIGHT : "transparent", border: "none", cursor: "pointer", color: showSettings ? ORANGE : "#64748b", fontWeight: showSettings ? 600 : 400, fontSize: 13, transition: "all 0.15s", whiteSpace: "nowrap" }}>
              <GearIcon />
              {!collapsed && <span>Configurações</span>}
            </button>
          </div>

          {/* User */}
          <div style={{ padding: collapsed ? "16px 0" : "16px 20px", borderTop: "1px solid #f0f2f5", display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "flex-start", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, background: `linear-gradient(135deg, ${ORANGE}, #f59e0b)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>?</div>
            {!collapsed && <div><div style={{ fontSize: 12, fontWeight: 600, color: "#1a1f36" }}>Usuário</div><div style={{ fontSize: 10, color: "#94a3b8" }}>Cargo</div></div>}
          </div>
        </div>

        {/* Main Content */}
        {showSettings ? (
          <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
            {/* Settings Sidebar */}
            <div style={{ width: 200, background: "#fff", borderRight: "1px solid #f1f5f9", padding: "24px 12px", flexShrink: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", padding: "0 8px 12px" }}>Configurações</div>
              {settingsSections.map(({ key, label, icon: Icon }) => {
                const isActive = settingsSection === key;
                return (
                  <button key={key} onClick={() => setSettingsSection(key)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "9px 10px", borderRadius: 9, marginBottom: 2, background: isActive ? ORANGE_LIGHT : "transparent", border: "none", cursor: "pointer", color: isActive ? ORANGE : "#64748b", fontWeight: isActive ? 600 : 400, fontSize: 12, textAlign: "left", transition: "all 0.15s" }}>
                    <Icon size={15} strokeWidth={isActive ? 2.3 : 1.8} />
                    {label}
                  </button>
                );
              })}
            </div>
            {/* Settings Content */}
            <SettingsContent section={settingsSection} />
          </div>
        ) : (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 44, marginBottom: 10 }}>{navItems.find(n => n.key === active)?.emoji}</div>
              <div style={{ fontSize: 14, color: "#94a3b8" }}>{navItems.find(n => n.key === active)?.label}</div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
